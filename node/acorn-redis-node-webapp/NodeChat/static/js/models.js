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
