import mongoose,{Schema,Document,Types} from "mongoose"

export interface IUser extends Document {
    _id:Types.ObjectId
    name:string;
    email:string;
    password:string;
    image:string;
    googleId:string;
    created_at:Date;
    updated_at:Date;
}

// create the user Schema

const UserSchema=new Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    googleId:{
        type:String,
    }
},{timestamps:true})

const UserModel=mongoose.model<IUser>("User",UserSchema)

export default UserModel