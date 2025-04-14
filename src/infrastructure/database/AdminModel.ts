import mongoose,{Schema,Document,Types} from "mongoose"


export interface IAdmin extends Document {
    _id:Types.ObjectId
    name:string;
    password:string;
    refreshToken:string
}


const adminSchema=new Schema<IAdmin>({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },

    refreshToken:{
        type:String
    },
},{timestamps:true})

const adminModel=mongoose.model<IAdmin>("admin",adminSchema)

export default adminModel