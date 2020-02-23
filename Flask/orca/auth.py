import os, functools, time, json
from flask import (
    Flask, flash, g, redirect, render_template, request, url_for, session, current_app, Blueprint
)

bp = Blueprint("auth", __name__)

@bp.route("/login", methods=('GET','POST'))
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        session.clear()
        session['usr'] = username
        session['pwd'] = password

        if (username == 'admin' and password == 'admin'):
           flash('Welcome!')
           session["isLogin"] = True
           return redirect(url_for('log.index'))
        else:
           session.clear()
           flash('Password is invaild.')
    return render_template("pages/login.html")

@bp.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('log.index'))