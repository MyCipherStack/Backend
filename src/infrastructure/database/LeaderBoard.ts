import mongoose, { ObjectId, Types } from "mongoose";

interface ILeaderBoard{
    challengeId:ObjectId
    userId:ObjectId
    score:number
    rank:number
    solvedProblems:[{time:Date,problemId:ObjectId,submissionId:ObjectId}]
}


const solvedProblemSchema=new mongoose.Schema({
    time:{type:Date},problemId:{type:Types.ObjectId},submissionId:{type:Types.ObjectId}
})

const LeaderBoardSchmea=new mongoose.Schema<ILeaderBoard>({

    challengeId:{type:Types.ObjectId,require:true},

    userId:{type:Types.ObjectId,ref:"User",required:true},

    score :{type:Number,default:0},

    rank:{type:Number},

    solvedProblems:{type:[solvedProblemSchema],default:[],ref:"problem"}
    
},{timestamps:true})

export const  leaderBoardModel=mongoose.model("leaderBoard",LeaderBoardSchmea)