'use strict';

module.exports = function(Review) {
  Review.disableRemoteMethod('count', true);
  Review.disableRemoteMethod('exists', true);
  Review.disableRemoteMethod('findOne', true);
  Review.disableRemoteMethod('createChangeStream', true);
  Review.disableRemoteMethod('updateAll', true);
};
