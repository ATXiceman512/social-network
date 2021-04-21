const { Schema, model, Types } = require('mongoose');
const date = require('../utils/date');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reaction: {
      type: String,
      required: 'Please share your reaction!',
      max: 280
    },
    username: {
      type: String,
      required: 'Please provide a valid username'
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => date(createdAtVal)

    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: 'Please share your thoughts!',
      min: 1,
      max: 280
    },
    createdAt: {
      type: Date,
      default: Date.now, 
      get: (createdAtVal) => date(createdAtVal) 
    },
    username: {
      type: String,
      required: 'Please provide a valid username.'
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    }
  }
);
ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;