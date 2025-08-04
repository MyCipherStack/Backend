import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
    _id:Types.ObjectId
    name:string;
    displayName:string;
    email:string;
    phone:string
    password:string;
    image:string;
    bio:string;
    github:string
    linkedin:string
    googleId:string;
    createdAt:Date;
    updatedAt:Date;
    refreshToken:string
    status:string
    role:string
    theme:string
    preferences: {
        emailNotifications: boolean,
        interviewReminders: boolean,
        contestReminders: boolean,
        language:string
        timezone:string
        publicProfile: boolean,
        showActivity: false,
      },
    streak:{lastActiveDate:Date, currentStreak:number, higestStreak:number},
    subscriptionId:Types.ObjectId
    rankingPoints:number
    // createdContest:{count:string,date:Date}
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: { type: String },

  password: { type: String, required: true },

  image: { type: String, // default:"https://images.app.goo.gl/WxwYnYXooctTp8sX7"
  },
  bio: { type: String },

  github: { type: String },

  linkedin: { type: String },

  refreshToken: {
    type: String,
  },
  googleId: {
    type: String,
  },
  status: {
    type: String,
    default: 'active',
  },
  role: {
    type: String,
    default: 'regular',
  },
  preferences: {
    emailNotifications: { type: Boolean, default: true },
    interviewReminders: { type: Boolean, default: true },
    contestReminders: { type: Boolean, default: true },
    language: { type: String, default: 'english' },
    timezone: { type: String, default: 'gmt-8' },
    publicProfile: { type: Boolean, default: true },
    showActivity: { type: Boolean, default: true },
  },
  theme: { type: String, default: 'cyberpunk' },

  streak: { lastActiveDate: Date, currentStreak: Number, higestStreak: Number },

  subscriptionId: { type: Schema.ObjectId, default: null, ref: 'subscription' },

  rankingPoints: { type: Number },

  // createdContest:{type:{count:String,date:Date},default:0}

}, { timestamps: true });

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;
