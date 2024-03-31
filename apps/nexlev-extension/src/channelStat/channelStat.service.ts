import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ChannelStatServiceBase } from "./base/channelStat.service.base";

@Injectable()
export class ChannelStatService extends ChannelStatServiceBase {
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
