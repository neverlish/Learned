const functions = require("firebase-functions");
const admin = require('firebase-admin');
const { getAuth } = require("firebase-admin/auth");

var serviceAccount = require("./account.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const auth = getAuth();


exports.createCustomToken = functions.https.onRequest(async (request, response) => {
    const user = request.body;

    let uid = `kakao:::${user.userId}`;
    try {

        await auth.updateUser(uid, user);
    } catch (error) {
        user['uid'] = uid;
        await auth.createUser(user);
    }

    try {
        const token = await auth.createCustomToken(uid);

        const result = {
            'status': 'SUCCESS',
            'code': '0000',
            'message': '성공',
            'data': token
        };
        response.send(result);
    } catch (error) {
        console.log('Error creating custom token:', error);
        response.sendStatus(400);
    }

});