import mongoose, { ObjectId, Types } from "mongoose";

interface ILeaderBoard{
    challengeId:ObjectId
    userId:ObjectId
    totalScore:number
    rank:number
    solvedProblems:[{time:Date,problemId:ObjectId,submissionId:ObjectId,score:number}]
}


const solvedProblemSchema=new mongoose.Schema({
    time:{type:Number},problemId:{type:Types.ObjectId},submissionId:{type:Types.ObjectId},score:{type:Number}
})

const LeaderBoardSchmea=new mongoose.Schema<ILeaderBoard>({

    challengeId:{type:Types.ObjectId,require:true},

    userId:{type:Types.ObjectId,ref:"User",required:true},

    totalScore :{type:Number,default:0},

    rank:{type:Number},

    solvedProblems:{type:[solvedProblemSchema],default:[],ref:"problem"}
    
},{timestamps:true})

export const  leaderBoardModel=mongoose.model("leaderBoard",LeaderBoardSchmea)