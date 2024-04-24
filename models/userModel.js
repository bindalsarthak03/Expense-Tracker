const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  incomes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Income" }],
  expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense"}]
})

UserSchema.pre('remove', async function(next) {
  try {
    // Remove associated incomes
    console.log("Inside delete pre")
    await mongoose.model('Income').delete({ user: this._id });
    console.log("deleted")
    next();
  } catch (error) {
    console.log("Error in pre removing hook:",error)
    next(error);
  }
});
module.exports = mongoose.model('User', UserSchema)