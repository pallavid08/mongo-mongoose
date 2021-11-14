const mongoose = require('mongoose');

//Import the schema class from the mongoose package
//Schema is not a method, it is a property

const Schema = mongoose.Schema;

//This is a class
//Single property does not require us to make an object
//This is creating a new instance of the Schema class and keeps it in a variable.
//In this schema we put the structure of our model
const myOwnSchema = new Schema({
   firstName: { type: String, required: true },
   lastName: { type: String, required: true },
   age: { type: Number },
   registered: { type: Boolean, default: false },
   grades: { type: Array },
   //    class: { type: String },
   school: { type: Schema.Types.ObjectId, ref: 'School', required: false },
});

//Connect schema to the model
//First argument is the name of that we give to the schema. Name should be singular
//Second argument is the schema that is supposed to be connected to this model
const Student = mongoose.model('Student', myOwnSchema);

module.exports = Student;
