var SocketListener = function SocketListener(noun, collection, socket) {
  var addModels = function addModels(models) {
    collection.add(collection.parse(models));
  };
  var removeModels = function removeModels(models) {
    collection.remove(collection.parse(models));
  };
  socket.on('Add' + noun, addModels);
  socket.on('Get' + noun, addModels);
  socket.on('Remove' + noun, removeEventListener);
  var destroy = function destroy() {
    socket.removeListener('Add' + noun, addModels);
    socket.removeListener('Get' + noun, addModels);
    socket.removeListener('Remove' + noun, removeModels);
  };
  return {destroy: destroy};
};

var SocketSync = function SocketListener(method, model, options) {
  var socket = Backbone.socket;
  var create = function create(model, options, noun) {
    socket.emit('Add' + noun, model);
  };
  var read = function read(model, options, noun) {
    socket.emit('Get' + noun, options);
  };
  switch (method) {
    case 'create':
      create(model, options, this.noun);
      break;
    case 'read':
      read(model, options, this.noun);
      break;
  }
}

var User = Backbone.Model.extend({
  image: function(size) {
    switch (this.get('type')) {
      case 'local':
        return this.gravatar(size)
        break;
      case 'facebook':
        return this.facebook(size);
        break;
      case 'google':
        return this.gravatar(size);
        break;
    }
  },
  gravatar: function gravatar(size){
    return 'http://gravatar.com/avatar/' + md5(this.get('id')) + '?d=retro&s=' + size; 
  },
  facebook: function facebook(size) {
    return 'http://graph.facebook.com/' + this.get('id') + '/picture/?height=' + size;
  }
});
