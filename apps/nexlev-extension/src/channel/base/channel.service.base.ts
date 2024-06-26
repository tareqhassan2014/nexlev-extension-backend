/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { PrismaService } from "../../prisma/prisma.service";

import {
  Prisma,
  Channel, // @ts-ignore
  ChannelStat,
} from "@prisma/client";

export class ChannelServiceBase {
  constructor(protected readonly prisma: PrismaService) {}

  async count<T extends Prisma.ChannelCountArgs>(
    args: Prisma.SelectSubset<T, Prisma.ChannelCountArgs>
  ): Promise<number> {
    return this.prisma.channel.count(args);
  }

  async channels<T extends Prisma.ChannelFindManyArgs>(
    args: Prisma.SelectSubset<T, Prisma.ChannelFindManyArgs>
  ): Promise<Channel[]> {
    return this.prisma.channel.findMany(args);
  }
  async channel<T extends Prisma.ChannelFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.ChannelFindUniqueArgs>
  ): Promise<Channel | null> {
    return this.prisma.channel.findUnique(args);
  }
  async createChannel<T extends Prisma.ChannelCreateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ChannelCreateArgs>
  ): Promise<Channel> {
    return this.prisma.channel.create<T>(args);
  }
  async updateChannel<T extends Prisma.ChannelUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.ChannelUpdateArgs>
  ): Promise<Channel> {
    return this.prisma.channel.update<T>(args);
  }
  async deleteChannel<T extends Prisma.ChannelDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.ChannelDeleteArgs>
  ): Promise<Channel> {
    return this.prisma.channel.delete(args);
  }

  async getChannelStats(parentId: string): Promise<ChannelStat | null> {
    return this.prisma.channel
      .findUnique({
        where: { id: parentId },
      })
      .channelStats();
  }
}
