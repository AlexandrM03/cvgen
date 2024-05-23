import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
    private readonly client: S3Client;
    private readonly bucket: string;

    constructor(
        private readonly configService: ConfigService
    ) {
        this.client = new S3Client({
            region: configService.get('S3_REGION'),
            credentials: {
                accessKeyId: configService.get('S3_ACCESS_KEY_ID'),
                secretAccessKey: configService.get('S3_SECRET_ACCESS_KEY')
            },
            endpoint: configService.get('S3_ENDPOINT'),
            forcePathStyle: true,
            apiVersion: 'latest'
        });
        this.bucket = configService.get('S3_BUCKET');
    }

    async createObject(key: string, buffer: Buffer | string, contentType: string) {
        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: buffer,
            ContentType: contentType
        });
        await this.client.send(command);
    }

    async deleteObject(key: string) {
        const command = new DeleteObjectCommand({
            Bucket: this.bucket,
            Key: key
        });
        await this.client.send(command);
    }

    async getPresignedURL(key: string) {
        const command = new GetObjectCommand({
            Bucket: this.bucket,
            Key: key
        });
        return await getSignedUrl(this.client, command, { expiresIn: 3600 });
    }
}
