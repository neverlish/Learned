from marshmallow import Schema, fields, pre_load, validate
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

db = SQLAlchemy()
ma = Marshmallow()

class AddUpdateDelete():
    def add(self, resource):
        db.session.add(resource)
        return db.session.commit()

    def update(self):
        return db.session.commit()

    def delete(self, resource):
        db.session.delete(source)
        return db.session.commit()

class Message(db.Model, AddUpdateDelete):
    id = db.Column(db.Integer, primary_key=True)
    message = db.Column(db.String(250), unique=True, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    creation_date = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp(), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id', ondelete='CASCADE'), nullable=False)
    category = db.relationship('Category', backref=db.backref('messages', lazy='dynamic', order_by='Message.message'))
    printed_times = db.Column(db.Integer, nullable=False, server_default='0')
    printed_once = db.Column(db.Boolean, nullable=False, server_default='false')

    def __init__(self, message, duration, category):
        self.message = message
        self.duration = duration
        self.category = category

class Category(db.Model, AddUpdateDelete):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), unique=True, nullable=False)

    def __init__(self, name):
        self.name = name
