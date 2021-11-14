const express = require('express');
const router = express.Router();

const School = require('../models/School');

router.post('/', (req, res) => {
   const { name, address } = req.body;

   const { country, city, street, number } = address;

   //Validationn
   const errors = [];

   //Check if the name field is empty
   if (
      !name.length ||
      !country.length ||
      !city.length ||
      !street.length ||
      !number.length
   ) {
      errors.push({ validationError: 'You should fill all inputs' });
   }
   //Check if the number field is actually a number
   if (!Number(address.number)) {
      errors.push({
         validationError: 'You should put a valid number in the number field',
      });
   }

   //Check if the client is trying to create a school that already exists in a specific city
   if (errors.length < 0) {
      School.find({}) //Like SELECT * FROM schools
         .then((schools) => {
            const sameNameSchools = schools.filter((school) => {
               return school.name === name;
            });

            if (sameNameSchools.length) {
               const sameSchoolSameCity = sameNameSchools.filter((school) => {
                  return school.city === city;
               });
               if (sameSchoolSameCity.length) {
                  errors.push({
                     validationError:
                        'You are trying to create a school in a city that already exists',
                  });
                  res.status(422).json(errors);
               } else {
                  School.create({ name: name, address: address }).then((data) =>
                     res.send(data)
                  );
               }
            } else {
               School.create({ name: name, address: address }).then((data) =>
                  res.send(data)
               );
            }
         })
         .catch((err) => {
            console.log(err);
         });
   } else {
      console.log('What are we doing?');
   }
});

// router.post('/', (req, res) => {
//    const { name, address } = req.body;
//    const { country, city, street, number } = address;

//    // VALIDATION
//    const errors = [];

//    !name || !country || !city || !street || !number
//       ? errors.push({ validationError: 'All fields must be filled' })
//       : name;

//    !Number(number)
//       ? errors.push({ validationError: 'Address number is not a valid number' })
//       : number;

//    if (!errors) {
//       School.find({})
//          .then((schools) => {
//             const sameSchool = schools.filter((school) => school.name === name);

//             if (sameSchool) {
//                const sameCity = sameSchool.filter(
//                   (school) => school.address.city === city
//                );

//                if (sameCity) {
//                   errors.push({
//                      validationError: 'School name is already in this city',
//                   });
//                   res.status(422).json(errors);
//                } else {
//                   School.create({ name, address }).then((data) => {
//                      res.send(data);
//                   });
//                }
//             } else {
//                School.create({ name, address }).then((data) => {
//                   res.send(data);
//                });
//             }
//          })
//          .catch((err) => {
//             console.log(err);
//             res.send(err);
//             res.status(422).json(errors);
//          });
//    }
// });
module.exports = router;
