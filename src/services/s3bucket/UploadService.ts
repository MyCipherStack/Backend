import { env } from "@/config/env";
import { s3Client } from "@/config/s3Client";
import { IUploadFileService } from "@/domain/services/IUploadImageService";
import { PutObjectCommand } from "@aws-sdk/client-s3";




export class UploadFileService implements IUploadFileService {
    private bucketName = env.AWS_BUCKET_NAME

    async uploadImage(fileBuffer: Buffer, originalName: string, mimeType: string): Promise<string> {
        const fileName = `avatars/${Date.now()}-${originalName}`
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: fileName,
            Body: fileBuffer,
            ContentType: mimeType,
            // ACL: 'public-read'
        })

        await s3Client.send(command)

        return `https://${this.bucketName}.s3.${env.AWS_REGION}.amazonaws.com/${fileName}`;
    }
}