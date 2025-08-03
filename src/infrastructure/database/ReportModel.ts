import mongoose, { Document, SchemaTypes, Types } from 'mongoose';

export interface IReports extends Document{

    reportType:string
    reportedUser:Types.ObjectId
    description:string,
    submittedBy:Types.ObjectId,
    pageInfo:string,
    status:string,
    createdAt:Date,
    updatedAt:Date
}

const reportSchema = new mongoose.Schema<IReports>({

  reportType: { type: String, enum: ['issue', 'user'], required: true },

  reportedUser: { type: SchemaTypes.ObjectId, required(this:IReports) { return this.reportType === 'user'; }, ref: 'User' },

  description: { type: String, required: true },

  submittedBy: { type: SchemaTypes.ObjectId, require: true, ref: 'User' },

  pageInfo: { type: String },

  status: { type: String, enum: ['pending', 'in_progress', 'solved', 'rejected'], default: 'pending' },

}, { timestamps: true });

export const reportModel = mongoose.model('report', reportSchema);
