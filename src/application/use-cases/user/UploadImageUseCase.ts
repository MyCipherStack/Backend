import { IUploadImageUseCase } from "@/application/interfaces/use-cases/IUserUseCase";
import { IUploadFileService } from "@/domain/services/IUploadImageService";




export class UploadImageUseCase implements IUploadImageUseCase {

    constructor(
        private uploadImageService: IUploadFileService
    ) { }

    async execute(fileBuffer: Buffer, originalName: string, mimeType: string): Promise<string> {

        const url = await this.uploadImageService.uploadImage(fileBuffer, originalName, mimeType)

        return url
    }


}