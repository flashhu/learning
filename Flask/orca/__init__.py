import os, functools, time, json,codecs
from typing import List, Any

from flask import (
    Flask, flash, g, redirect, render_template, request, url_for, session, current_app, Blueprint
)
from datetime import timedelta
from orca import log, auth
from functools import reduce

def create_app():
    app = Flask(__name__)
    app.config.from_mapping(SECRET_KEY='blog')


    app.register_blueprint(log.bp)
    app.register_blueprint(auth.bp)
    # app.add_url_rule('/', endpoint='index')

    return app