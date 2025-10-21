import { NextFunction, Request, Response } from 'express';
import { ProfileDTO } from '@/application/dto/ProfileDTO';
import { IUpdateUserUseCase, IUploadImageUseCase } from '@/application/interfaces/use-cases/IUserUseCase';
import { IGetRepositoryDataUseCase } from '@/application/interfaces/use-cases/IGetRepositoryDataUseCase';
import { IVerifyUserPasswordUseCase } from '@/application/interfaces/use-cases/IUserPasswordUseCases';
import { ResetPasswordDTO } from '@/application/dto/ResetPasswordDTO';
import { IResetPasswordUseCase } from '@/application/interfaces/use-cases/IResetPasswordUseCase';
import { User } from '@/domain/entities/User';
import { logger } from '@/infrastructure/logger/WinstonLogger/logger';
import { AppError } from '@/domain/error/AppError';
import { HttpStatusCode } from '@/shared/constants/HttpStatusCode';
import { MulterDTO } from '@/application/dto/MulterDTO';
import { UserMapper } from '@/application/mapper/UserMapper';

export class ProfileController {
  constructor(
    private updateUseCase: IUpdateUserUseCase,
    private getRepositoryDataUseCase: IGetRepositoryDataUseCase<User>,
    private verifyUserPasswordUseCase: IVerifyUserPasswordUseCase,
    private resetPasswordUseCase: IResetPasswordUseCase,
    private uploadImageUsecase: IUploadImageUseCase
  ) { }

  update = async (req: Request, res: Response) => {
    try {
      const user = req.user as { email: string };

      const profileData = new ProfileDTO(req.body.personal, req.body.appearance, req.body.preferences);

      logger.info("update profile", { profileData: req.body.personal })

      const data = await this.updateUseCase.execute(user.email, profileData);
      if (data) { res.status(HttpStatusCode.OK).json({ status: true, message: 'problems fetched success', user: { name: data.name, email: data.email, image: data.image } }); }
    } catch (error: any) {
      res.status(HttpStatusCode.BAD_REQUEST).json({ status: false, message: error.message });
    }
  };

  getData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('get profile data');

      const user = req.user as { email: string, id: string };

      let profile = await this.getRepositoryDataUseCase.OneDocumentById(user.id.toString());

      if (profile) {

        const profileDTO = UserMapper.toResponseDTO(profile)

        return res.status(HttpStatusCode.OK).json({ status: true, message: 'Problems fetched success', user: profileDTO });
      }
      next(new AppError('Something went wrong', HttpStatusCode.INTERNAL_SERVER_ERROR));

    } catch (error) {
      next(new AppError('Something went wrong', HttpStatusCode.INTERNAL_SERVER_ERROR));

    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = new ResetPasswordDTO(req.body.formData, req.body.email);

      if (data.currentPassword === data.password) {
        next(new AppError('New password must be  different from old', HttpStatusCode.BAD_REQUEST));
      }
      const isValid = await this.verifyUserPasswordUseCase.execute(data.email, data.currentPassword);
      if (isValid) {
        this.resetPasswordUseCase.execute(data.email, data.password);

        res.status(HttpStatusCode.OK).json({ status: true, message: 'password updated' });
      } else {
        next(new AppError('Incorrect current password', HttpStatusCode.CONFLICT));

      }
    } catch (error) {
      console.log(error);

      next(new AppError('Something went wrong', HttpStatusCode.INTERNAL_SERVER_ERROR));

    }
  };


  profilePicUpload = async (req: Request, res: Response, next: NextFunction) => {
    try {


      const file = req.file as Express.Multer.File

      const fileData = new MulterDTO(file)


      const url = await this.uploadImageUsecase.execute(fileData.buffer, fileData.originalName, fileData.mimetype)

      res.status(HttpStatusCode.OK).json({ status: true, message: 'image uploaded ', data: url });

    } catch (error) {

      logger.error("error", error)
      next(new AppError('Something went wrong', HttpStatusCode.INTERNAL_SERVER_ERROR));

    }
  }

}
