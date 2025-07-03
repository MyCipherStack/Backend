import mongoose, { Document, ObjectId, Types } from "mongoose";
import { customAlphabet } from "nanoid"

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 6);


export interface IPairProgramming extends Document {

  hostId: ObjectId
  challengeName: string;
  duration: number
  problems: string[],
  type: string
  joinCode: string
  currentStatus: Object
  startTime: Date,
  endTime: Date,
  status: string,
  invitedUsers:string[],
  createdAt?: string,
  updatedAt?: string

};


const PairProgramingSchema = new mongoose.Schema<IPairProgramming>({

  hostId: { type: Types.ObjectId, ref: "User", required: true },

  challengeName: { type: String, required: true },

  duration: { type: Number, required: true,default:60 },

  currentStatus: { type: Object },

  problems: [{ type: Types.ObjectId, ref: "problem", required: true }],

  startTime: { type: Date, required: true, default: () => new Date(Date.now() + 3 * 60 * 1000) },

  endTime: { type: Date },

  type: { type: String, required: true },

  joinCode: { type: String, required: true },
  
  invitedUsers:[{type:String}],

  status: { type: String, enum: ["waiting", "started", "ended", "blocked"], default: "waiting" },


  


}, { timestamps: true })


PairProgramingSchema.pre("save", function (next) {
  if (this.isModified("startTime") || this.isModified("duration")) {
    this.endTime = new Date(this.startTime.getTime() + this.duration * 60 * 1000)
  }
  next()
})


export const PairProgrammingModel = mongoose.model<IPairProgramming>("pairProgramming", PairProgramingSchema)
