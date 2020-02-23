import os, functools, time, json
from flask import (
    Flask, flash, g, redirect, render_template, request, url_for, session, current_app, Blueprint
)

bp = Blueprint("auth", __name__)
#bp.config.from_mapping(SECRET_KEY='blog.auth')

@bp.route("/register", methods=('GET','POST'))
def register():
    if request.method == 'POST':
       usrn = request.form.get('username')
       pasw = request.form.get('password')
       data = {"username":usrn,"password":pasw}
       pre = time.strftime('%Y%m%d%H%M%S', time.localtime(time.time()))
       file = current_app.root_path + '/usr/' + pre + '.json'
       r = 0

       path = current_app.root_path + '/usr'
       files = os.listdir(path)
       files.sort()

       for f in files:
           if not f.endswith(".json"): continue
           fpath = path + '/' + f
           with open(fpath, 'r') as load_f:
               inf = json.load(load_f)
               if (inf["username"] == usrn):
                   r = 1
                   session.clear()
                   flash("Username has been registered.")
                   break

       if (r == 0):
          with open(file, "w") as f:
             json.dump(data, f)
             flash('Register success!')
             return redirect(url_for('auth.login'))
       # else:
       #     session.clear()
       #     flash("Username has been registered.")
    return render_template("pages/register.html")

@bp.route("/login", methods=('GET','POST'))
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        session.clear()
        session['usr'] = username
        session['pwd'] = password
        ret = 0
        path = current_app.root_path + '/usr'
        files = os.listdir(path)
        files.sort()

        for f in files:
            if not f.endswith(".json"): continue
            fpath = path + '/' + f
            with open(fpath, 'r') as load_f:
                inf = json.load(load_f)
                if (inf["username"] == username and inf["password"] == password):
                    flash('Login success')
                    session["isLogin"] = True
                    ret = 1
                    return redirect(url_for('index'))
                if (inf["username"] == username and inf["password"] != password):
                    ret = 1
                    session.clear()
                    flash('Password is invaild.')
        if (ret == 0):
            session.clear()
            flash('Username or password is invaild.')
            return redirect(url_for('auth.register'))

    return render_template("pages/login.html")

@bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))