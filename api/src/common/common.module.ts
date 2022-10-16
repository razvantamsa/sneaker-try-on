import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { GCSService } from "../common/services/gcs.service";
import { UtilsService } from "./generics/utils.service";

@Module({
  providers: [ConfigService, GCSService, UtilsService],
  exports: [GCSService, UtilsService]
})
export class CommonModule {}
