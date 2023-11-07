import { Schema, model, models } from 'mongoose';

const schema = Schema({
  player1: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  player2: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  table: {
    type: Schema.Types.ObjectId,
    ref: 'Table',
  },
});

export default models.Game || model('Game', schema);
