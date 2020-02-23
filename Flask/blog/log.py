import os, functools, time, json, weakref, cv2,codecs,markdown, pygments
from flask import (
    Flask, flash, g, redirect, render_template, request, url_for, session, current_app, Blueprint
)
from blog import auth
from werkzeug.utils import secure_filename
from markdown import Markdown
from functools import reduce

bp = Blueprint("log", __name__)
#bp.config.from_mapping(SECRET_KEY='blog.log')

def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        username = session.get('usr')
        if username is None:
            return redirect(url_for('auth.login'))
        return view(**kwargs)
    return wrapped_view

#设置允许的文件格式
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'JPG', 'PNG', 'bmp'])
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@bp.route("/about")
def about():
   return render_template("pages/about.html")


@bp.route("/new",  methods=('GET','POST'))
@login_required
def new():
    if request.method == 'POST':
        de = request.form['m-date']
        tl = request.form['m-title']
        co = request.form['m-content']
        us = session['usr']
        pre = time.strftime('%Y%m%d%H%M%S', time.localtime(time.time()))

        if len(tl)==0 or len(co)==0:
            flash('Input error')
        else:
            data = {"date": de, "title": tl, "content": co, "user": us}
            file = current_app.root_path + '/data/' + pre + '.json'
            with open(file, "w") as f:
                json.dump(data, f)
                flash('Add blog success!')
                return redirect(url_for('index'))
        # else:
        #     filename = pre + '.jpg'
        #     basepath = os.path.dirname(__file__)
        #     data = {"date": de, "title": tl, "content": co, "user": us, "img": filename}
        #     upload_path = os.path.join(basepath, 'static/images', filename)
        #     f.save(upload_path)
        #
        #     # 使用Opencv转换一下图片格式和名称
        #     img = cv2.imread(upload_path)
        #     # cv2.imwrite(os.path.join(basepath, 'static/images', filename), img)
        #     cv2.imwrite(os.path.join(basepath, 'static/images', 'test.jpg'), img)
        #
        #     filepath = current_app.root_path + '/data/' + pre + '.json'
        #     with open(filepath, "w") as d:
        #         json.dump(data, d)
        #         flash('Add blog success!')
        #         return redirect(url_for('index'))

    da = time.strftime('%Y-%m-%d', time.localtime(time.time()))
    return render_template("pages/new.html", da=da)

@bp.route('/uploadImg/', methods=['GET', 'POST'])
@login_required
def uploadImg():
    if request.method == 'POST':
        # print 'imgimg'
        f = request.files['file']
        file = '/static/images/' + time.strftime("%Y%m%d%H%M%S", time.localtime()) + '.jpg'
        filename = current_app.root_path + file
        f.save(filename)
        # pre = time.strftime('%Y%m%d%H%M%S', time.localtime(time.time()))
        # basepath = os.path.dirname(__file__)  # 当前文件所在路径
        # filename = pre + '.jpg'
        # upload_path = os.path.join(basepath, 'static\images', filename)
        # f.save(upload_path)

    return json.dumps({'filename': file })

@bp.route("/upload",  methods=('GET','POST'))
@login_required
def upload():
    if request.method == 'POST':
        f = request.files['file']

        if (f and allowed_file(f.filename)):
          #上传图片
          user_input = request.form.get("m-content")
          pre = time.strftime('%Y%m%d%H%M%S', time.localtime(time.time()))
          basepath = os.path.dirname(__file__)  # 当前文件所在路径
          filename = pre + '.jpg'
          file = pre + '.json'
          us = session['usr']
          da = time.strftime('%Y-%m-%d', time.localtime(time.time()))
          data = {"img": filename, "content": user_input, "user": us,"date":da}

          upload_path = os.path.join(basepath, 'static/images', filename)
          f.save(upload_path)

          # 使用Opencv转换一下图片格式和名称
          img = cv2.imread(upload_path)
          # cv2.imwrite(os.path.join(basepath, 'static/images', filename), img)
          cv2.imwrite(os.path.join(basepath, 'static/images', 'test.jpg'), img)

          filepath = current_app.root_path + '/data/' + pre + '.json'
          with open(filepath, "w") as d:
            json.dump(data, d)
            flash('Upload success!')
            return redirect(url_for('index'))
        elif (f and (f.filename[-3:] == '.md')):
          #上传markdown
          user_input = request.form.get("m-content")
          pre = time.strftime('%Y%m%d%H%M%S', time.localtime(time.time()))
          basepath = os.path.dirname(__file__)  # 当前文件所在路径
          filename =  pre + '.md'
          file = pre + '.json'
          us = session['usr']
          da = time.strftime('%Y-%m-%d', time.localtime(time.time()))
          data = {"mdf": filename, "content": user_input, "user": us, "date": da}

          upload_path = os.path.join(basepath, 'static/documents', pre + '.md')
          f.save(upload_path)
          # with open(upload_path, 'r') as p:
          #     mdc = p.read()
          # data = {"md": mdc, "content": user_input, "user": us, "date": da}


          # with open(upload_path) as md_file:
          #     content = reduce(lambda x, y: x + y, md_file.readlines())
          #     content.decode('utf-8')

          # md = Markdown(extensions=['markdown.extensions.toc', 'markdown.extensions.admonition',
          #                        'markdown.extensions.fenced_code', 'markdown.extensions.codehilite',
          #                        'markdown.extensions.extra'])
          # md = Markdown(extensions=['fenced_code',
          #                           'meta', 'admonition', 'tables'])
          #
          # in_file = os.path.join(basepath, 'static/documents', filename)
          # out_file = os.path.join(basepath, 'static/documents/html', pre + '.html')
          # input_file = codecs.open(in_file, mode="r", encoding="utf-8")
          # text = input_file.read()
          # html = md.convert(text)
          #
          # output_file = codecs.open(out_file, "w", encoding="utf-8", errors="xmlcharrefreplace")
          # output_file.write(css + html)

          filepath = current_app.root_path + '/data/' + pre + '.json'
          with open(filepath, "w") as d:
            json.dump(data, d)
            flash('Upload success!')
            return redirect(url_for('index'))
        else:
          flash('File format error')

    return render_template("pages/upload.html")

@bp.route("/search",  methods=('GET','POST'))
def search():
    if request.method == 'POST':
        keyWord = request.form['keyWord']
        data = []
        path = current_app.root_path + '/data'
        files = os.listdir(path)
        files.sort()

        for f in files:
            if not f.endswith(".json"): continue
            fpath = path + '/' + f
            with open(fpath, 'r') as load_f:
                cnt = json.load(load_f)
                if not cnt['date'] == keyWord:continue
                data.append(cnt)
        return render_template("pages/index.html", data=data)
    return redirect(url_for('index'))
