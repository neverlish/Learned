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

    @classmethod
    def is_unique(cls, id, message):
        existing_message = cls.query.filter_by(message=message).first()
        if existing_message is None:
            return True
        else:
            if existing_message.id == id:
                return True
            else:
                return False

class Category(db.Model, AddUpdateDelete):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), unique=True, nullable=False)

    def __init__(self, name):
        self.name = name

    @classmethod
    def is_unique(cls, id, name):
        existing_category = cls.query.filter_by(name=name).first()
        if existing_category is None:
            return True
        else:
            if existing_category.id == id:
                return True
            else:
                return False


class CategorySchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String(required=True, validate=validate.Length(3))
    url = ma.URLFor('api.categoryresource', id='<id>', _external=True)
    messages = fields.Nested('MessageSchema', many=True, exclude=('category',))

class MessageSchema(ma.Schema):
    id = fields.Integer(dump_only=True)
    message = fields.String(required=True, validate=validate.Length(1))
    duration = fields.Integer()
    creation_date = fields.DateTime()
    category = fields.Nested(CategorySchema, only=['id', 'url', 'name'], required=True)
    printed_times = fields.Integer()
    printed_once = fields.Boolean()
    url = ma.URLFor('api.messageresource', id='<id>', _external=True)

    @pre_load
    def process_category(self, data):
        category = data.get('category')
        if category:
            if isinstance(category, dict):
                category_name = category.get('name')
            else:
                category_name = category
            category_dict = dict(name=category_name)
        else:
            category_dict = {}
        data['category'] = category_dict
        return data
