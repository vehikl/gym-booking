const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
const e = require("cors");
admin.initializeApp();

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original

exports.submitPassword = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const TOP_SECRET = "200bathurst";
    const password = req.body.data.password;

    if (TOP_SECRET === password) {
      res.json({ data: TOP_SECRET });
    } else {
      res.status(401).json({ data: "incorrect" });
    }
  });
});
