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
        },
        username: { type: String, required: true },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false, 
    } 
);

thoughtSchema.virtual('formattedTimestamp').get(function() {
    return this.createdAt.toLocaleString();
});

// Transform option for toJSON to replace createdAt with formattedTimestamp
thoughtSchema.set('toJSON', {
    transform: function(doc, ret) {
        delete ret.createdAt;
        ret.formattedTimestamp = doc.formattedTimestamp;
        return ret;
    }
});

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;