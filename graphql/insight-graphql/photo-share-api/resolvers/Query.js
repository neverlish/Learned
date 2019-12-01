module.exports = {
  me: (parent, args, { currentUser }) => currentUser,
  totalPhotos: (parent, args, { db }) =>
    db.collection('photos').estimatedDocumentCount(),
  allPhotos: async (parent, args, { db }) => {
    if (args.first > 100) {
      throw new Error('Only 100 photos can be requested at a time')
    }
    return await db.collection('photos')
      .find()
      .toArray()
  },
  totalUsers: (parent, args, { db }) =>
    db.collection('users').estimatedDocumentCount(),
  allUsers: (parent, args, { db }) =>
    db.collection('users')
      .find()
      .toArray()
}