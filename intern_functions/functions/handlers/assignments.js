const { db } = require('../util/admin');

exports.getAssignInfo = (req,res) => {
  db.collection('assignments').get()
    .then((data) => {
      let assignments = [];
      data.forEach((doc) => {
        assignments.push({
          assgnId: doc.id,
          lessonName: doc.data().metadata.lessonName,
          chaptersCount: doc.data().metadata.chaptersCount,
          videosCount: doc.data().metadata.videosCount,
          quizesCount: doc.data().metadata.quizesCount,
          readingsCount: doc.data().metadata.readingsCount,
          complitedCount: doc.data().metadata.complitedCount,
          complited: doc.data().metadata.complited,
          dueDate: doc.data().metadata.dueDate,
        });
      }); 
      return res.json(assignments);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}

exports.getAssgn = (req,res) => {
  let assignment = {};
  db.doc(`/assignments/${req.params.assgnId}`).get()
    .then((doc) => {
      assignment.metadata = doc.data().metadata;
      assignment.lessonId = doc.id;
      assignment.chapters = [];
      db.collection('/chapters').where('assgnId', '==', doc.id).orderBy('chapNo').get()
        .then(data => {
          data.forEach((body) => {
            assignment.chapters.push({
              chapName: body.data().chapName,
              chapNo: body.data().chapNo,
              lessonId: body.data().lessonId,
              quiz: body.data().quiz,
              reading: body.data().reading,
              videos: body.data().videos,
              chapId: body.id,
            });
          })
          return res.json(assignment);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
}