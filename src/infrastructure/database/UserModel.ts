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
    refreshToken:string
    status:string
    role:string
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
        // default:"https://images.app.goo.gl/WxwYnYXooctTp8sX7"
    },
    refreshToken:{
        type:String
    },
    googleId:{
        type:String,
    },
    status:{
        type:String,
        default:"active"
    },
    role:{
        type:String,
        default:"regular"
    }
},{timestamps:true})

const UserModel=mongoose.model<IUser>("User",UserSchema)

export default UserModel