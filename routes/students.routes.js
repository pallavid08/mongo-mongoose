const express = require('express');
const router = express.Router();

const Student = require('../models/Student');
const School = require('../models/School');

// router.post('/', (req, res) => {
//    const { firstName, lastName, age, registered, grades, school } = req.body;

//    Student.create({
//       firstName: firstName,
//       lastName: lastName,
//       age: age,
//       registered: registered,
//       grades: grades,
//       school:school
//    })
//       .then((data) => {
//          res.send(data);
//       })
//       .catch((err) => {
//          res.send(err);
//       });
// });

//With async await
router.post('/', async (req, res) => {
   const { firstName, lastName, age, registered, grades, school } = req.body;

   try {
      const student = await Student.create({
         firstName,
         lastName,
         age,
         registered,
         grades,
         school,
      });
      //   console.log('school-id: ' + school);
      //   console.log('student-id: ' + student._id);

      const updatedSchool = await School.findByIdAndUpdate(
         school,
         {
            $push: { students: student._id },
         },
         { new: true }
      ).populate('students');
      res.send(updatedSchool);
   } catch (err) {
      res.send(err);
   }
});

// Students.findByIdAndUpdate('6141c554cbe94d43bcf83b02', { firstName: 'Monica' });

module.exports = router;
