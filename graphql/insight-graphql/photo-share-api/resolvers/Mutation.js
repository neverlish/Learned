module.exports = {
  async postPhoto(parent, args, { db }) {
    var newPhoto = {
      ...args.input,
      created: new Date()
    }
    const { insertedIds } = await db.collection('photos').insert(newPhoto)
    newPhoto.id = insertedIds[0]

    return newPhoto
  }
}