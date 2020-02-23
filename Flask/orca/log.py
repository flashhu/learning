import os, functools, time, json, weakref, cv2,codecs,markdown, pygments
from flask import (
    Flask, flash, g, redirect, render_template, request, url_for, session, current_app, Blueprint
)
from orca import auth
from werkzeug.utils import secure_filename
from markdown import Markdown
from functools import reduce

bp = Blueprint("log", __name__)

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

@bp.route('/')
@bp.route("/index")
def index():
    return render_template("pages/index.html")

@bp.route("/blog")
def blog():
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
        return render_template("pages/blog.html", data=data)

@bp.route("/new",  methods=('GET','POST'))
@login_required
def new():
   if request.method == 'POST':
        de = request.form['m-date']
        tl = request.form['m-title']
        co = request.form['m-content']
        us = session['usr']
        pre = time.strftime('%Y%m%d%H%M%S', time.localtime(time.time()))

        if len(tl) == 0 or len(co) == 0:
            flash('Input error')
        else:
            data = {"date": de, "title": tl, "content": co, "user": us}
            file = current_app.root_path + '/data/' + pre + '.json'
            with open(file, "w") as f:
                json.dump(data, f)
                flash('Add blog success!')
                return redirect(url_for('log.blog'))
   da = time.strftime('%Y-%m-%d', time.localtime(time.time()))
   return render_template("pages/new.html", da=da)

@bp.route('/uploadImg/', methods=['GET', 'POST'])
@login_required
def uploadImg():
    if request.method == 'POST':
        f = request.files['file']
        file = '/static/image/' + time.strftime("%Y%m%d%H%M%S", time.localtime()) + '.jpg'
        filename = current_app.root_path + file
        f.save(filename)

    return json.dumps({'filename': file })