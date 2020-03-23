let http = require('http');
let url = require('url');

function createApplication() {
	let app = (req, res) => {
		//获取请求方法
		let m = req.method.toLowerCase();
		//获取请求路径
		//第二个参数为true，query属性会生成一个对象
		let { pathname } = url.parse(req.url, true);

        //迭代匹配
        let index = 0; 
        function next(err) {
        	//未匹配，路径不存在
        	if (index === app.routes.length) {
        		return res.end(`Cannot ${m} ${pathname}`);
        	}
        	let { method, path, handler } = app.routes[index ++];
        	if (method === 'middle') {
        		//?未完全渗透
        		if(path === '/' || path === pathname || pathname.startsWith(path + '/')){
                	handler(req, res, next);
        		} else {
        			next(err);
        		}
        	} else {
        		//处理路由
        		if((method === m || method === 'all') && (path === pathname || path === '*')){
					handler(req, res);
			    } else {
			    	next();
			    }
        	}
        }

		next();
	}

	//存放所有路由对象
	app.routes = []

    //http.METHODS返回http所有方法（大写）
    http.METHODS.forEach(method => {
        method = method.toLowerCase(); //转换为小写
        /**
         *path:路径
         *handler:监听函数
        */
        app[method] = function(path, handler) {
        	let layer = {
        		method,
        		path,
        		handler
        	}
        	app.routes.push(layer);
        }
    })

    app.use = function(path, handler) {
    	//处理中间件参数
    	if(typeof handler !== 'function') {
    		handler = path;
    		path = '/';
    	}

    	let layer = {
    		method: 'midddle',
    		path,
    		handler
    	}

    	app.routes.push(layer);
    }

    //?区别
    // express 内置中间件
    app.use(function(req, res, next) {
        let {pathname, query} = url.parse(req.url, true);
        let hostname = req.headers['host'].split(':')[0];
        req.path = pathname;
        req.query = query;
        req.hostname = hostname;
        next()
    })

    app.all = function(path, handler) {
    	let layer = {
    		method: 'all',
    		path,
    		handler
    	}
    	app.routes.push(layer);
    }

    app.listen = function(){
    	//创建一个HTTP服务器，并将 app 作为 request 事件的监听函数
        let server = http.createServer(app);
        //扩展运算符来获取所有参数
        server.listen(...arguments);
    }

	return app;
}

//导出模块
module.exports = createApplication;