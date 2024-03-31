import { Module } from "@nestjs/common";
import { ChannelModuleBase } from "./base/channel.module.base";
import { ChannelService } from "./channel.service";
import { ChannelController } from "./channel.controller";

@Module({
  imports: [ChannelModuleBase],
  controllers: [ChannelController],
  providers: [ChannelService],
  exports: [ChannelService],
})
export class ChannelModule {}
