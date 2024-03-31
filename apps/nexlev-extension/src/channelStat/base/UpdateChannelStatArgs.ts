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
import { ChannelStatWhereUniqueInput } from "./ChannelStatWhereUniqueInput";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ChannelStatUpdateInput } from "./ChannelStatUpdateInput";

@ArgsType()
class UpdateChannelStatArgs {
  @ApiProperty({
    required: true,
    type: () => ChannelStatWhereUniqueInput,
  })
  @ValidateNested()
  @Type(() => ChannelStatWhereUniqueInput)
  @Field(() => ChannelStatWhereUniqueInput, { nullable: false })
  where!: ChannelStatWhereUniqueInput;

  @ApiProperty({
    required: true,
    type: () => ChannelStatUpdateInput,
  })
  @ValidateNested()
  @Type(() => ChannelStatUpdateInput)
  @Field(() => ChannelStatUpdateInput, { nullable: false })
  data!: ChannelStatUpdateInput;
}

export { UpdateChannelStatArgs as UpdateChannelStatArgs };