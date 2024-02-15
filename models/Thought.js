const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get: function (timestamp) {
            //     return timestamp.toISOString();
            // }
        },
        username: { type: String, required: true },
        reactions: [reactionSchema],
    },
    // {
    //     toJSON: {
    //         virtuals: true,
    //         getters: true,
    //     },
    //     id: false, 
    // } 
);

// thoughtSchema.virtual('formattedCreatedAt').get(function() {
//     return this.createdAt.toLocaleString();
// });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;