import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { ChannelStatService } from "./channelStat.service";
import { ChannelStatControllerBase } from "./base/channelStat.controller.base";

@swagger.ApiTags("channelStats")
@common.Controller("channelStats")
export class ChannelStatController extends ChannelStatControllerBase {
  constructor(protected readonly service: ChannelStatService) {
    super(service);
  }
}
