




import { leaderBoard } from "@/domain/entities/LeaderBoard";
import { User } from "@/domain/entities/User";



export class leaderBoardMapper {


        static toResponseDTO(leaderBoard: leaderBoard[]) {
                let rank = 1;
        
             return   leaderBoard
                        .map((data) => {
                                return {
                                        userName: (data.userId as User).name,
                                        totalScore: data.totalscore,
                                        solvedCount: data.solvedProblems?.length ?? 0,
                                        isLive: false,
                                        image: (data.userId as User).image || '',
                                        rank: rank++,
                                };
                        });
        }

}