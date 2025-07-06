import { FilterDTO } from "@/application/dto/FilterDTO";
import { GroupChallengeDTO } from "@/application/dto/GroupChallengeDTO";
import { PairProgramingDTO } from "@/application/dto/PairProgammingDTO";
import { IGroupChallenge, IPairProgramming } from "@/application/interfaces/IChallengeInterfaces";
import { IActivePrivateChallengeUsecase, IActivePublicChallengeUsecase, ICreateChallengeUseCase, ICreatePairProgrammingUseCase, IJoinChallengeUseCase, IJoinPairProgrammigUseCase } from "@/application/interfaces/use-cases/IChallengeUseCases";
import { AppError } from "@/domain/error/AppError";
import { logger } from "@/logger";
import { NextFunction, Request, Response } from "express";


export class ArenaController {
    constructor(
        private createChallengeUseCase: ICreateChallengeUseCase,
        private joinChallengeUseCase: IJoinChallengeUseCase<IGroupChallenge>,
        private createPairProgrammingUseCase: ICreatePairProgrammingUseCase,
        private joinPairProgarmmingUseCase: IJoinPairProgrammigUseCase,
        public activePrivateChallengeUsecase: IActivePrivateChallengeUsecase,
        public activePublicChallengeUsecase: IActivePublicChallengeUsecase,
        // public
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
            console.log(joinCode, "code");
            if (joinCode && user) {
                const response = await this.joinChallengeUseCase.execute(joinCode.toString(), user.id)
                console.log(response);
                res.status(200).json({ status: true, message: "joined groupChallenge ", challengeData: response })


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
                const response = await this.joinPairProgarmmingUseCase.execute(joinCode.toString(), user.id,user.name)
                console.log(response);
                res.status(200).json({ status: true, message: "joined groupChallenge ", challengeData: response })


            }
        } catch (error) {
            console.log(error);
            res.status(400).json({ status: false, message: error.message })

        }
    }



    activeChallenges = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.user?.id

            const FilterData = new FilterDTO(req.query)

            const privateChallenges = await this.activePrivateChallengeUsecase.execute(id!)

            const publicChallenges = await this.activePublicChallengeUsecase.execute(FilterData)

            const pairProgramming = await

                res.status(200).json({ status: true, message: "users challenges ", privateChallenges, publicChallenges })


        } catch (error) {
            logger.error("err", error)
            return next(new AppError("Intenal err ", 500))

        }
    }



}