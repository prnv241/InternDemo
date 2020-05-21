const {db, admin} = require('../util/admin');
const { v4: uuid } = require('uuid');
const config = require('../util/config');

exports.getLessonsInfo = (req,res) => {
  db.collection('lessons').get()
    .then((data) => {
      let lessons = [];
      data.forEach((doc) => {
        lessons.push({
          lessonId: doc.id,
          lessonName: doc.data().metadata.lessonName,
          chaptersCount: doc.data().metadata.chaptersCount,
          videosCount: doc.data().metadata.videosCount,
          quizesCount: doc.data().metadata.quizesCount,
          readingsCount: doc.data().metadata.readingsCount,
          complitedCount: doc.data().metadata.complitedCount
        });
      }); 
      return res.json(lessons);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

exports.getLesson = (req,res) => {
  let lesson = {};
  db.doc(`/lessons/${req.params.lessonId}`).get()
    .then((doc) => {
      lesson.metadata = doc.data().metadata;
      lesson.lessonId = doc.id;
      lesson.chapters = [];
      db.collection('/chapters').where('lessonId', '==', doc.id).orderBy('chapNo').get()
        .then(data => {
          data.forEach((body) => {
            lesson.chapters.push({
              chapName: body.data().chapName,
              chapNo: body.data().chapNo,
              lessonId: body.data().lessonId,
              quiz: body.data().quiz,
              reading: body.data().reading,
              videos: body.data().videos,
              chapId: body.id,
            });
          })
          return res.json(lesson);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

exports.getModule = (req,res) => {
  let module = {};
  const type = req.params.type;
  const chapId = req.params.chapId;
  const ref = req.params.ref;
  db.doc(`/chapters/${chapId}`).get()
    .then(doc => {
      module.chapter = {
        chapName: doc.data().chapName,
        chapNo: doc.data().chapNo,
        lessonId: doc.data().lessonId,
        quiz: doc.data().quiz,
        reading: doc.data().reading,
        videos: doc.data().videos,
        chapId: doc.id,
      };
      return db.doc(`/${type}/${ref}`);
    })
    .then(body => {
      body.get()
        .then(doc => {
          module.data = doc.data();
          module.data.ref = doc.id;
          module.data.answers = {};
          return res.json(module);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

exports.newModule = (req,res) => {
  const chapId = req.params.chapId;
  var video = {
    complited: false,
    name: req.body.name,
    time: req.body.time,
    desc: req.body.desc,
    url: req.body.url
  }
  var vid = {
    complited: false,
    name: req.body.name,
    time: req.body.time
  }
  db.collection('videos').add(video)
    .then(doc => {
      vid.ref = doc.id;
      return db.doc(`/chapters/${chapId}`)
    })
    .then(body => {
      body.update({
        videos: admin.firestore.FieldValue.arrayUnion(vid)
      });
      return res.json(video);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    })
}

exports.uploadModule = (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: req.headers });

  let FileToBeUploaded = {};
  let FileName;
  let generatedToken = uuid();

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== "video/mp4" && mimetype !== "video/x-msvideo") {
      return res.status(400).json({ error: "Wrong file type submitted" });
    }
    const FileExtension = filename.split(".")[filename.split(".").length - 1];
    FileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${FileExtension}`;
    const filepath = path.join(os.tmpdir(), FileName);
    FileToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(FileToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: FileToBeUploaded.mimetype,
            firebaseStorageDownloadTokens: generatedToken,
          },
        },
      })
      .then(() => {
        const FileUri = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${FileName}?alt=media&token=${generatedToken}`;
        return res.json({ fileUrl: FileUri });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: "something went wrong" });
      });
  });
  busboy.end(req.rawBody);
};

exports.checkResults = (req,res) => {
  var chapId = req.params.chapId;
  var ref = req.params.ref;
  var results = {};
  db.doc(`/quizes/${ref}`).get()
    .then(doc => {
      var questions = doc.data().questions;
      var answers = doc.data().answers;
      var submitted = req.body.quizAns;
      results.noques = questions.length;
      results.nosub = submitted.length;
      var correct = 0;
      submitted.forEach(sub => {
        let obj = answers.find(o => o.id === sub.id);
        if(obj.answer ===  sub.ans) {
          correct = correct + 1;
        }
      })
      results.nocurr = correct;
      results.percent = (correct/questions.length)*100;
      return db.doc(`/quizes/${ref}`);
    })
    .then(body => {
      body.update({ result: results });
      body.update({complited: true})
      db.doc(`/chapters/${chapId}`).get()
        .then((chap) => {
          quiz = chap.data().quiz;
          quiz.forEach((o) =>{
            if(o.ref === ref) {
              o.complited = true;
            }
          })
          db.doc(`/chapters/${chapId}`).update({ quiz: quiz });
          return res.json({ success: "Quiz submitted successfully! "});
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ error: err.message });
        });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: "something went wrong" });
    });
}

exports.markRead = (req,res) => {
  const type = req.params.type;
  const chapId = req.params.chapId;
  const ref = req.params.ref;
  db.doc(`/${type}/${ref}`).update({complited: true})
    .then(() => {
      return db.doc(`/chapters/${chapId}`);
    })
    .then(data => {
      if(type === 'videos') {
        var videos;
        data.get()
        .then((chap) => {
          videos = chap.data().videos;
          videos.forEach((o) =>{
            if(o.ref === ref) {
              o.complited = true;
            }
          })
          data.update({ videos: videos })
            .then(() => {
              return res.json({ success: "Marked Complited"});
            })
            .catch((err) => {
              console.error(err);
              return res.status(500).json({ error: err.message });
            });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ error: err.message });
        });
    
      } else {
        var reading;
        data.get()
        .then((chap) => {
          reading = chap.data().reading;
          reading.forEach((o) =>{
            if(o.ref === ref) {
              o.complited = true;
            }
          })
          data.update({ reading: reading })
            .then(() => {
              return res.json({ success: "Marked Complited"});
            })
            .catch((err) => {
              console.error(err);
              return res.status(500).json({ error: err.message });
            });
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).json({ error: err.message });
        });
      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.message });
    });
}

exports.getResult = (req,res) => {
  var ref = req.params.ref;
  let result;
  db.doc(`/quizes/${ref}`).get()
    .then((doc) => {
      result = doc.data().result;
      return res.json(result);
    }) 
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.message });
    });
}