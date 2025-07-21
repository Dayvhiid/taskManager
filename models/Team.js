import mongoose from 'mongoose';

const teamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


export default mongoose.model('Team', teamSchema);