import mongoose, { Schema } from "mongoose";
// create the user Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
