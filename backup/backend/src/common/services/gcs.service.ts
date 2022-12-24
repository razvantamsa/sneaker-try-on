import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { Storage, File } from "@google-cloud/storage";

@Injectable()
export class GCSService {
  storage: Storage;

  constructor(private readonly configService: ConfigService) {
    this.storage = new Storage({
      projectId: configService.get<string>("GCS_PROJECT_ID"),
      keyFilename: configService.get<string>("GCS_KEY_FILENAME")
    });
    this.configService = configService;
  }

  async stream(destination: string): Promise<File> {
    return this.storage.bucket(this.configService.get<string>("GCS_BUCKET")).file(destination);
  }

  async getSignedURL(filename: string): Promise<string> {
    const [url] = await this.storage
      .bucket(this.configService.get<string>("GCS_BUCKET"))
      .file(filename)
      .getSignedUrl({
        version: "v4",
        action: "write",
        expires: Date.now() + 15 * 60 * 1000, // 15 minutes
        contentType: "application/octet-stream"
      });

    return url;
  }

  async getRemoteFile(filename: string): Promise<File> {
    return this.storage.bucket(this.configService.get<string>("GCS_BUCKET")).file(filename);
  }
}
