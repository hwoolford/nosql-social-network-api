const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            max_length: 280,
        },
        username: { type: String, required: true},
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false, 
    }
);

reactionSchema.virtual('formattedTimestamp').get(function() {
    return this.createdAt.toLocaleString();
});

// Transform option for toJSON to replace createdAt with formattedTimestamp
reactionSchema.set('toJSON', {
    transform: function(doc, ret) {
        delete ret.createdAt;
        ret.formattedTimestamp = doc.formattedTimestamp;
        return ret;
    }
});

module.exports = reactionSchema;