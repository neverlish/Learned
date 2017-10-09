from flask import url_for, current_app

class PaginationHelper():
    def __init__(self, request, query, resource_for_url, key_name, schema):
        self.request = request
        self.query = query
        self.resource_for_url = resource_for_url
        self.key_name = key_name
        self.schema = schema
        self.results_per_page = current_app.config['PAGINATION_PAGE_SIZE']
        self.page_argument_name = current_app.config['PAGINATION_PAGE_ARGUMENT_NAME']

    def paginate_query(self):
        # 페이지 번호를 지정하지 않으면, 페이지 #1부터 시작할 것이다.
        page_number = self.request.args.get(self.page_argument_name, 1, type=int)
        paginated_objects = self.query.paginate(
            page_number,
            per_page = self.results_per_page,
            error_out = False)
        objects = paginated_objects.items
        if paginated_objects.has_prev:
            previous_page_url = url_for(
                self.resource_for_url,
                page = page_number - 1,
                _external = True)
        else:
            previous_page_url = None
        if paginated_objects.has_next:
            next_page_url = url_for(
                self.resource_for_url,
                page = page_number + 1,
                _external = True)
        else:
            next_page_url = None
        dumped_objects = self.schema.dump(objects, many=True).data
        return ({
            self.key_name: dumped_objects,
            'previous': previous_page_url,
            'next': next_page_url,
            'count': paginated_objects.total
        })
