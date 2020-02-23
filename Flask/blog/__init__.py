import os, functools, time, json,codecs
from typing import List, Any

from flask import (
    Flask, flash, g, redirect, render_template, request, url_for, session, current_app, Blueprint
)
from datetime import timedelta
from blog import log, auth
from functools import reduce

def create_app():
    app = Flask(__name__)
    app.config.from_mapping(SECRET_KEY='blog')

    # 设置静态文件缓存过期时间
    app.send_file_max_age_default = timedelta(seconds=1)

    #用过滤器转换md
    @app.template_filter('md')
    def markdown_to_html(txt):
        from markdown import markdown
        return markdown(txt)

    def read_md_file(filename):
        with open(filename,encoding='utf-8') as md_file:
            content = reduce(lambda x, y: x + y, md_file.readlines())
        return content.encode('utf-8').decode('utf-8')

    # 注意：这里很重要，作用是把read_md_file()这个函数注册到所有的Jinjia模板中
    # 不然html中会找不到这个函数而出错
    @app.context_processor
    def inject_methods():
        return dict(read_md=read_md_file)

    @app.route('/')
    @app.route("/index")
    def index():
        data = []
        path = current_app.root_path + '/data'
        files = os.listdir(path)
        files.sort()

        for f in files:
            if not f.endswith(".json"): continue
            fpath = path + '/' + f
            with open(fpath, 'r') as load_f:
                cnt = json.load(load_f)
                data.append(cnt)

        data.reverse()

        return render_template("pages/index.html", data=data)

    app.register_blueprint(log.bp)
    app.register_blueprint(auth.bp)
    # app.add_url_rule('/', endpoint='index')

    return app
