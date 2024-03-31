/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import { isRecordNotFoundError } from "../../prisma.util";
import * as errors from "../../errors";
import { Request } from "express";
import { plainToClass } from "class-transformer";
import { ApiNestedQuery } from "../../decorators/api-nested-query.decorator";
import { ChannelStatService } from "../channelStat.service";
import { ChannelStatCreateInput } from "./ChannelStatCreateInput";
import { ChannelStat } from "./ChannelStat";
import { ChannelStatFindManyArgs } from "./ChannelStatFindManyArgs";
import { ChannelStatWhereUniqueInput } from "./ChannelStatWhereUniqueInput";
import { ChannelStatUpdateInput } from "./ChannelStatUpdateInput";

export class ChannelStatControllerBase {
  constructor(protected readonly service: ChannelStatService) {}
  @common.Post()
  @swagger.ApiCreatedResponse({ type: ChannelStat })
  async createChannelStat(
    @common.Body() data: ChannelStatCreateInput
  ): Promise<ChannelStat> {
    return await this.service.createChannelStat({
      data: {
        ...data,

        channel: data.channel
          ? {
              connect: data.channel,
            }
          : undefined,
      },
      select: {
        avgVideoRevenue: true,
        avgViewCount: true,

        channel: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        rpm: true,
        totalRevenue: true,
        totalViewCount: true,
        updatedAt: true,
        username: true,
        videoCount: true,
        ytChannelId: true,
      },
    });
  }

  @common.Get()
  @swagger.ApiOkResponse({ type: [ChannelStat] })
  @ApiNestedQuery(ChannelStatFindManyArgs)
  async channelStats(@common.Req() request: Request): Promise<ChannelStat[]> {
    const args = plainToClass(ChannelStatFindManyArgs, request.query);
    return this.service.channelStats({
      ...args,
      select: {
        avgVideoRevenue: true,
        avgViewCount: true,

        channel: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        rpm: true,
        totalRevenue: true,
        totalViewCount: true,
        updatedAt: true,
        username: true,
        videoCount: true,
        ytChannelId: true,
      },
    });
  }

  @common.Get("/:id")
  @swagger.ApiOkResponse({ type: ChannelStat })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async channelStat(
    @common.Param() params: ChannelStatWhereUniqueInput
  ): Promise<ChannelStat | null> {
    const result = await this.service.channelStat({
      where: params,
      select: {
        avgVideoRevenue: true,
        avgViewCount: true,

        channel: {
          select: {
            id: true,
          },
        },

        createdAt: true,
        id: true,
        rpm: true,
        totalRevenue: true,
        totalViewCount: true,
        updatedAt: true,
        username: true,
        videoCount: true,
        ytChannelId: true,
      },
    });
    if (result === null) {
      throw new errors.NotFoundException(
        `No resource was found for ${JSON.stringify(params)}`
      );
    }
    return result;
  }

  @common.Patch("/:id")
  @swagger.ApiOkResponse({ type: ChannelStat })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async updateChannelStat(
    @common.Param() params: ChannelStatWhereUniqueInput,
    @common.Body() data: ChannelStatUpdateInput
  ): Promise<ChannelStat | null> {
    try {
      return await this.service.updateChannelStat({
        where: params,
        data: {
          ...data,

          channel: data.channel
            ? {
                connect: data.channel,
              }
            : undefined,
        },
        select: {
          avgVideoRevenue: true,
          avgViewCount: true,

          channel: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          id: true,
          rpm: true,
          totalRevenue: true,
          totalViewCount: true,
          updatedAt: true,
          username: true,
          videoCount: true,
          ytChannelId: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }

  @common.Delete("/:id")
  @swagger.ApiOkResponse({ type: ChannelStat })
  @swagger.ApiNotFoundResponse({ type: errors.NotFoundException })
  async deleteChannelStat(
    @common.Param() params: ChannelStatWhereUniqueInput
  ): Promise<ChannelStat | null> {
    try {
      return await this.service.deleteChannelStat({
        where: params,
        select: {
          avgVideoRevenue: true,
          avgViewCount: true,

          channel: {
            select: {
              id: true,
            },
          },

          createdAt: true,
          id: true,
          rpm: true,
          totalRevenue: true,
          totalViewCount: true,
          updatedAt: true,
          username: true,
          videoCount: true,
          ytChannelId: true,
        },
      });
    } catch (error) {
      if (isRecordNotFoundError(error)) {
        throw new errors.NotFoundException(
          `No resource was found for ${JSON.stringify(params)}`
        );
      }
      throw error;
    }
  }
}