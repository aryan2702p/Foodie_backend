const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: Buffer, required: true },
  role: { type: String, required: true, default:'user' },
  name: { type: String },
  points: {type: Number,required: true, default:0 },
  rank: {type: String,required: true, default: 'Newbie'},
  lastLogin: { type: Date, required: true, default: Date.now },
  
  salt: Buffer
});

const virtual = userSchema.virtual('id');
virtual.get(function () {
  return this._id;
});
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.User = mongoose.model('User', userSchema);