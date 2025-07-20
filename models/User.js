import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 6,
    },
    email: {
        type: String,
        unique:true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
         type: Date,
         default: Date.now
    }
})


userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
       next()
    } else {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password =  await bcrypt.hash(this.password,salt);
            next();
        } catch (error) {
            next(error);
        }
    }
})

userSchema.methods.comparePassword =  async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

export default mongoose.model('User', userSchema);

