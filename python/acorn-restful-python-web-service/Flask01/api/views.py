from flask import Blueprint, request, jsonify, make_response, g
from flask_restful import Api, Resource
from flask_httpauth import HTTPBasicAuth
from models import db, Category, CategorySchema, Message, MessageSchema, User, UserSchema
from sqlalchemy.exc import SQLAlchemyError
import status
from helpers import PaginationHelper

api_bp = Blueprint('api', __name__)
category_schema = CategorySchema()
message_schema = MessageSchema()
api = Api(api_bp)
auth = HTTPBasicAuth()

@auth.verify_password
def verify_user_password(name, password):
    user = User.query.filter_by(name=name).first()
    if not user or not user.verify_password(password):
        return False
    g.user = user
    return True

class AuthRequiredResource(Resource):
    method_decorators = [auth.login_required]

class MessageResource(AuthRequiredResource):
    def get(self, id):
        message = Message.query.get_or_404(id)
        result = message_schema.dump(message).data
        return result

    def patch(self, id):
        message = Message.query.get_or_404(id)
        message_dict = request.get_json(force=True)
        if 'message' in message_dict:
            message_message = message_dict['message']
            if Message.is_unique(id=id, message=message_message):
                message.message = message_message
            else:
                response = {'error': 'A message with the same message already exists'}
                return response, status.HTTP_400_BAD_REQUEST
        if 'duration' in message_dict:
            message.duration = message_dict['duration']
        if 'printed_times' in message_dict:
            message.printed_times = message_dict['printed_times']
        if 'printed_once' in message_dict:
            message.printed_once = message_dict['printed_once']
        dumped_message, dump_errors = message_schema.dump(message)
        if dump_errors:
            return dump_errors, status.HTTP_400_BAD_REQUEST
        validate_errors = message_schema.validate(dumped_message)
        # errors = message_schema.validate(data)
        if validate_errors:
            return validate_errors, status.HTTP_400_BAD_REQUEST
        try:
            message.update()
            return self.get(id)
        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({'error': str(e)})
            return resp, status.HTTP_400_BAD_REQUEST

    def delete(self, id):
        message = Message.query.get_or_404(id)
        try:
            delete = message.delete(message)
            response = make_response()
            return response, status.HTTP_204_NO_CONTENT
        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({'error': str(e)})
            return resp, status.HTTP_401_UNAUTHORIZED

class MessageListResource(AuthRequiredResource):
    def get(self):
        pagination_helper = PaginationHelper(
            request,
            query = Message.query,
            resource_for_url = 'api.messagelistresource',
            key_name = 'results',
            schema = message_schema)
        result = pagination_helper.paginate_query()
        return result

    def post(self):
        request_dict = request.get_json()
        if not request_dict:
            response = {'message': 'No input data provided'}
            return response, status.HTTP_400_BAD_REQUEST
        errors = message_schema.validate(request_dict)
        if errors:
            return errors, status.HTTP_400_BAD_REQUEST
        message_message = request_dict['message']
        if not Message.is_unique(id=0, message=message_message):
            response = {'error': 'A message with the same message already exists'}
            return response, status.HTTP_400_BAD_REQUEST
        try:
            category_name = request_dict['category']['name']
            category = Category.query.filter_by(name=category_name).first()
            if category is None:
                # 새 카테고리 생성
                category = Category(name=category_name)
                db.session.add(category)
            # 카테고리가 존재하므로 새 메시지를 생성한다.
            message = Message(
                message = message_message,
                duration = request_dict['duration'],
                category = category)
            message.add(message)
            query = Message.query.get(message.id)
            result = message_schema.dump(query).data
            return result, status.HTTP_201_CREATED
        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({'error': str(e)})
            return resp, status.HTTP_400_BAD_REQUEST

class CategoryResource(AuthRequiredResource):
    def get(self, id):
        category = Category.query.get_or_404(id)
        result = category_schema.dump(category).data
        return result

    def patch(self, id):
        category = Category.query.get_or_404(id)
        category_dict = request.get_json()
        if not category_dict:
            resp = {'message': 'No input data provided'}
            return resp, status.HTTP_400_BAD_REQUEST
        errors = category_schema.validate(category_dict)
        if errors:
            return errors, status.HTTP_400_BAD_REQUEST
        try:
            if 'name' in category_dict:
                category_name = category_dict['name']
                if Category.is_unique(id=id, name=category_name):
                    category.name = category_name
                else:
                    response = {'error': 'A category with the same name already sxists'}
                    return response, status.HTTP_400_BAD_REQUEST
            category.update()
            return self.get(id)
        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({'error': str(e)})
            return resp, status.HTTP_400_BAD_REQUEST

    def delete(self, id):
        category = Category.query.get_or_404(id)
        try:
            category.delete(category)
            response = make_response()
            return response, status.HTTP_204_NO_CONTENT
        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({'error': str(e)})
            return resp, status.HTTP_400_BAD_REQUEST

class CategoryListResource(AuthRequiredResource):
    def get(self):
        categories = Category.query.all()
        result = category_schema.dump(categories, many=True).data
        return result

    def post(self):
        request_dict = request.get_json()
        if not request_dict:
            response = {'message': 'No input data provided'}
            return response, status.HTTP_400_BAD_REQUEST
        errors = category_schema.validate(request_dict)
        if errors:
            return errors, status.HTTP_400_BAD_REQUEST
        category_name = request_dict['name']
        if not Category.is_unique(id=0, name=category_name):
            response = {'error': 'A category with the same name already exists'}
            return response, status.HTTP_400_BAD_REQUEST
        try:
            category = Category(category_name)
            category.add(category)
            query = Category.query.get(category.id)
            result = category_schema.dump(query).data
            return result, status.HTTP_201_CREATED
        except SQLAlchemyError as e:
            db.session.rollback()
            resp = jsonify({'error': str(e)})
            return resp, status.HTTP_400_BAD_REQUEST


api.add_resource(CategoryListResource, '/categories/')
api.add_resource(CategoryResource, '/categories/<int:id>')
api.add_resource(MessageListResource, '/messages/')
api.add_resource(MessageResource, '/messages/<int:id>')
