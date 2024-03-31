/*
------------------------------------------------------------------------------ 
This code was generated by Amplication. 
 
Changes to this file will be lost if the code is regenerated. 

There are other ways to to customize your code, see this doc to learn more
https://docs.amplication.com/how-to/custom-code

------------------------------------------------------------------------------
  */
import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { ChannelStatWhereInput } from "./ChannelStatWhereInput";
import { IsOptional, ValidateNested, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { ChannelStatOrderByInput } from "./ChannelStatOrderByInput";

@ArgsType()
class ChannelStatFindManyArgs {
  @ApiProperty({
    required: false,
    type: () => ChannelStatWhereInput,
  })
  @IsOptional()
  @ValidateNested()
  @Field(() => ChannelStatWhereInput, { nullable: true })
  @Type(() => ChannelStatWhereInput)
  where?: ChannelStatWhereInput;

  @ApiProperty({
    required: false,
    type: [ChannelStatOrderByInput],
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Field(() => [ChannelStatOrderByInput], { nullable: true })
  @Type(() => ChannelStatOrderByInput)
  orderBy?: Array<ChannelStatOrderByInput>;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  skip?: number;

  @ApiProperty({
    required: false,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Field(() => Number, { nullable: true })
  @Type(() => Number)
  take?: number;
}

export { ChannelStatFindManyArgs as ChannelStatFindManyArgs };