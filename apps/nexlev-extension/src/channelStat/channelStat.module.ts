import { Module } from "@nestjs/common";
import { ChannelStatModuleBase } from "./base/channelStat.module.base";
import { ChannelStatService } from "./channelStat.service";
import { ChannelStatController } from "./channelStat.controller";

@Module({
  imports: [ChannelStatModuleBase],
  controllers: [ChannelStatController],
  providers: [ChannelStatService],
  exports: [ChannelStatService],
})
export class ChannelStatModule {}
