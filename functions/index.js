const functions = require("firebase-functions");
const request = require("request");

// restrict to be called only from localhost
// const cors = require("cors")([/\.localhost$/, /\.127\.0\.0\.1$/]);

// allow any origin
const cors = require("cors")({origin: true});

exports.getRandomImage = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    functions.logger.info("Hello logs!", {structuredData: true});
    request.get("http://lorempixel.com/400/400/").pipe(res);
  });
});
