import { Schema, model, models } from 'mongoose';

const schema = Schema({
  username: {
    type: String,
    require: true,
    maxlength: 30,
    unique: true,
  },
  imgSrc: {
    type: String,
    require: true,
    maxlength: 400,
  },
  password: {
    type: String,
    require: true,
  },
});

export default models.User || model('User', schema);
