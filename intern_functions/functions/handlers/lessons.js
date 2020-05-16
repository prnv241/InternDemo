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
      console.log(err);
    });
}