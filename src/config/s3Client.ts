import { env } from "./env";
import { S3Client } from "@aws-sdk/client-s3"

export const s3Client=new S3Client({
    region:env.AWS_REGION!,
    credentials:{
        accessKeyId:env.AWS_ACCESS_KEY!,
        secretAccessKey:env.AWS_SECRET_ACCESS_KEY!
    }

})

