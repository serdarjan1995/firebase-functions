const functions = require("firebase-functions");
const admin = require("firebase-admin");
const request = require("request");
const express = require("express");
const formidable = require("formidable-serverless");

const runtimeOpts = {
  timeoutSeconds: 20,
};
admin.initializeApp();

// allow any origin
const cors = require("cors")({origin: true});

exports.getRandomImage = functions.https.onRequest((req, res) => {
  return cors(req, res, () => {
    functions.logger.info("Hello logs!", {structuredData: true});
    request.get("http://lorempixel.com/400/400/").pipe(res);
  });
});


const app = express();
app.use(cors);

app.post("/", (req, res) => {
  const form = new formidable.IncomingForm();
  return new Promise((resolve, reject) => {
    form.parse(req, function(err, fields, files) {
      const file = files.file;
      if (!file) {
        reject(new Error("no file to upload, please choose a file with param name=file"));
        return;
      }

      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        reject(new Error("Only PNG and JPEG allowed"));
        return;
      }

      const filePath = file.path;
      const bucket = admin.storage().bucket();
      return bucket.upload(filePath, {
        destination: "images/" + file.name,
      }).then(() => {
        resolve();
      }).catch((err) => {
        reject(new Error("Failed to upload: " + JSON.stringify(err)));
      });
    });
  }).then((filePath) => {
    res.status(200).send({success: true, message: "Successfully uploaded!"});
    return null;
  }).catch((err) => {
    console.error("Error while parsing form: " + err);
    res.status(500).send("Error while parsing form: " + err);
  });
});

app.get("/:name", (req, res) => {
  const bucket = admin.storage().bucket("images");
  const name = req.params.name;
  bucket.get(name).then((file) => {
    console.log(file);
    req.end("success");
  }).catch((err) => {
    console.log(err);
    req.end("error");
  });
});

exports.files = functions.runWith(runtimeOpts).https.onRequest(app);
