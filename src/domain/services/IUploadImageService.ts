

export interface IUploadFileService {

    uploadImage(fileBuffer: Buffer, originalName: string, mimeType: string): Promise<string>

}