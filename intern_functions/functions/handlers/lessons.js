const {db} = require('../util/admin');
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
      res.status(500).json({ error: JSON.stringify(err)});
    });
}

exports.getLesson = (req,res) => {
  let lesson = {};
  db.doc(`/lessons/${req.params.lessonId}`).get()
    .then((doc) => {
      if(!doc.exists) {
        return res.status(404).json({ error: 'lesson not Found!' });
      }
      lesson.metadata = doc.data().metadata;
      lesson.lessonId = doc.id;
      lesson.chapters = [];
      db.collection('/chapters').where('lessonId', '==', doc.id).orderBy('chapNo').get()
        .then(data => {
          data.forEach((body) => {
            lesson.chapters.push(body.data());
          })
          return res.json(lesson);
        })
        .catch((err) => {
          res.status(500).json({ error: JSON.stringify(err)});
        });
    })
    .catch((err) => {
      res.status(500).json({ error: JSON.stringify(err)});
    });
}