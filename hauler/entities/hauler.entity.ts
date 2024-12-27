import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type HaulerDocument = Hauler & Document;

function customTimestamp(): number {
  return new Date().getTime();
}

@Schema()
export class Hauler {
  _id: mongoose.Types.ObjectId;

  @Prop()
  userId: string;

  @Prop()
  haulerName: string;

  @Prop({default:''})
  haulerEmail: string;

  @Prop()
  haulerMobileNumber: string;

  @Prop()
  haulerCountryCode: string;

  @Prop()
  haulerCountryCodeEmoji: string;

  @Prop()
  organizationId: string;

  @Prop({ default: false })
  isDelete: boolean

  @Prop({ default: customTimestamp })
  createdAt: number;

  @Prop({ default: customTimestamp })
  updatedAt: number;
}
export const HaulerSchema = SchemaFactory.createForClass(Hauler);

