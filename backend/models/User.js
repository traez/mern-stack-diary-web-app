import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import validator from 'validator';

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    
    password: {
        type: String,
        required: true
    }
}, {
    collection: 'users',
    timestamps: true
});

UserSchema.statics.signup = async function(email, password) {
    if (!email || !password) throw Error('all fields required');
    if (!validator.isEmail(email)) throw Error('invalid email');
    if (!validator.isStrongPassword(password)) throw Error('password not strong');

    const exists = await this.findOne({ email });
    if (exists) throw Error('email already registered');

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash });

    return user;
};

UserSchema.statics.login = async function(email, password) {
    if (!email || !password) throw Error('all fields required');

    const user = await this.findOne({ email });
    if (!user) throw Error('email not registered');

    const match = await bcrypt.compare(password, user.password);

    if (!match) throw Error('incorrect password');

    return user;
};

export default model('User', UserSchema);