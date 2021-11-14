const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myOwnSchema = new Schema({
   name: { type: String, required: true },
   address: {
      country: { type: String, required: true },
      city: { type: String, required: true },
      street: { type: String, required: true },
      number: { type: Number, required: true },
   },
   students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
});

const School = mongoose.model('School', myOwnSchema);

module.exports = School;
