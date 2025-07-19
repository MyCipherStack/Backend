import { FilterDTO } from "@/application/dto/FilterDTO";
import { GroupChallengeDTO } from "@/application/dto/GroupChallengeDTO";
import { PairProgramingDTO } from "@/application/dto/PairProgammingDTO";
import { IGroupChallenge } from "@/application/interfaces/IChallengeInterfaces";
import { IActivePrivateChallengeUsecase, IActivePublicChallengeUsecase, IChallengeResultsUseCase, ICreateChallengeUseCase, ICreatePairProgrammingUseCase, IEndChallengeUseCase, IEvaluateWinnerUsecase, IJoinChallengeUseCase, IJoinPairProgrammigUseCase, ILeaderBoardUseCase } from "@/application/interfaces/use-cases/IChallengeUseCases";
import { IGetRepositoryDataUseCase } from "@/application/interfaces/use-cases/IGetRepositoryDataUseCase";
import { IUpdateRepositoryDataUseCase } from "@/application/interfaces/use-cases/ISharedUseCase";
import { GroupChallenge } from "@/domain/entities/GroupChallenge";
import { User } from "@/domain/entities/User";
import { AppError } from "@/domain/error/AppError";
import { logger } from "@/logger";  
import { NextFunction, Request, Response } from "express";


export class ArenaController {
    constructor(
        private createChallengeUseCase: ICreateChallengeUseCase,
        private joinChallengeUseCase: IJoinChallengeUseCase<IGroupChallenge>,
        private createPairProgrammingUseCase: ICreatePairProgrammingUseCase,
        private joinPairProgarmmingUseCase: IJoinPairProgrammigUseCase,
        private activePrivateChallengeUsecase: IActivePrivateChallengeUsecase,
        private activePublicChallengeUsecase: IActivePublicChallengeUsecase,
        private getUserDataUseCase: IGetRepositoryDataUseCase<User>,
        private updateChallengeUseCase: IUpdateRepositoryDataUseCase<GroupChallenge>,
        private getChallengeDataUseCase: IGetRepositoryDataUseCase<GroupChallenge>,
        private endChallengeQueueUseCase: IEndChallengeUseCase,
        private challengeResultsUseCase: IChallengeResultsUseCase,
        private leaderBoardUseCase: ILeaderBoardUseCase,
        // private AllPariprogrammingDataUseCase: IGetAllRepoDataUsingFieldUseCase<PairProgramming>
    ) { }

    createGroupChallenge = async (req: Request, res: Response) => {
        try {
            const challengeData = new GroupChallengeDTO(req.body)
            const userId = req.user as { id: string }
            const joinCode = await this.createChallengeUseCase.execute({ ...challengeData, hostId: userId.id })

            console.log(joinCode, "joinCode");
            res.status(200).json({ status: true, message: "challenge created", joinCode })
        } catch (error) {
            console.log(error);

            res.status(400).json({ status: false, message: error })
        }
    }


    joinGroupChallenge = async (req: Request, res: Response) => {
        try {
            console.log("joinchallengecontroller");

            console.log(req.query);
            const joinCode = req.query.joinCode
            const user = req.user as { id: string }

            if (joinCode && user) {
                const response = await this.joinChallengeUseCase.execute(joinCode.toString(), user.id)

                logger.info("join challenge", { host: response.hostId, userid: user.id })

                const isHost = response.hostId == user.id.toString()
                logger.info("ishost", { isHost, host: typeof response.hostId, id: typeof user.id })
                res.status(200).json({ status: true, message: "joined groupChallenge ", challengeData: { ...response, isHost } })


            }


        } catch (error) {
            console.log(error);
            res.status(400).json({ status: false, message: error.message })

        }
    }



    createPairProgramming = async (req: Request, res: Response) => {
        try {

            const data = new PairProgramingDTO(req.body)
            const userId = req.user as { id: string }
            console.log("create challenge contoller", data);

            const joinCode = await this.createPairProgrammingUseCase.execute({ ...data, hostId: userId.id })

            console.log(joinCode, "joinCode");
            res.status(200).json({ status: true, message: "Challenge created", joinCode })
        } catch (error) {
            console.log(error);

            res.status(400).json({ status: false, message: error })
        }
    }



    joinPairProgramming = async (req: Request, res: Response) => {
        try {

            const joinCode = req.query.joinCode
            const user = req.user
            console.log(joinCode, "code");
            if (joinCode && user) {

                const response = await this.joinPairProgarmmingUseCase.execute(joinCode.toString(), user.id, user.name)

                const userData = await this.getUserDataUseCase.OneDocumentByid(response?.hostId)

                res.status(200).json({ status: true, message: "joined groupChallenge ", challengeData: response, hostname: userData?.name })


            }
        } catch (error) {
            console.log(error);
            res.status(400).json({ status: false, message: error.message })

        }
    }





    activeChallenges = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.user?.id

            let FilterData = new FilterDTO(req.query)

            FilterData.status = "waiting"

            const privateChallenges = await this.activePrivateChallengeUsecase.execute(id!)

            const publicChallenges = await this.activePublicChallengeUsecase.execute(FilterData)

            // const pairProgramming = await



            res.status(200).json({ status: true, message: "users challenges ", privateChallenges, publicChallenges })


        } catch (error) {
            logger.error("err", error)
            return next(new AppError("Intenal error ", 500))

        }   
    }





    startChallenge = async (req: Request, res: Response, next: NextFunction) => {
        try {

            logger.info("starting challenge...........")
            const challengeId = req.body.id

            const id = req.user?.id

            const challengeData = await this.getChallengeDataUseCase.OneDocumentByid(challengeId)

            if (challengeData?.hostId?.toString() !== id?.toString()) {


                return res.status(403).json({ status: false, message: "you are not a host", })

            }


            const response = await this.updateChallengeUseCase.execute(challengeId, { status: "started" })

            if (challengeData?.duration) {

                logger.info("end Challenge queue stared", { host: challengeData?.hostId, id })
                this.endChallengeQueueUseCase.execute(challengeId, challengeData.duration * 60 * 1000)
            }


            logger.info("startd Challed data", { response })

            res.status(200).json({ status: true, message: "Challenge Started ", challengeData: { ...response, isHost: true } })




        } catch (error) {

            logger.error("start challenge err", { error })
            return next(new AppError("Intenal error ", 500))


        }
    }


    challengeResults = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.user?.id


            const response = await this.challengeResultsUseCase.execute(id!)

            logger.info("challengeResults", { response })

            res.status(200).json({ status: true, message: "all results Started ", allChallenge: response })

        } catch (error) {

            return next(new AppError("Intenal error ", 500))

        }
    }



    challengeLeaderBoard = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const challengeId = req.params.id

            const response = await this.leaderBoardUseCase.execute(challengeId)

            logger.info("leaderboard", { data: response })


            res.status(200).json({ status: true, message: "leaderBoard deatils", response })

        } catch (error) {
            logger.info("err", error)
            return next(new AppError("Intenal error ", 500))

        }
    }




    // pairProgrammingRequest = async (req: Request, res: Response, next: NextFunction) => {
    //     try {


    //         this.AllPariprogrammingDataUseCase.execute({ invitedUser })


    //     } catch (error) {


    //         return next()

    //     }
    // }


}