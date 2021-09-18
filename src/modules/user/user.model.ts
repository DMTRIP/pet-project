import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, PopulatedDoc, SchemaTypes } from 'mongoose';
import { Field, ObjectType } from '@nestjs/graphql';

export type UserDocument = User & Document;

@ObjectType()
@Schema()
export class User {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: false })
  middleName?: string;

  // TODO add min and max age validation
  @Prop({ type: Date, required: true })
  birthdayDate: Date;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Field(() => [User])
  @Prop({ type: [SchemaTypes.ObjectId] })
  friends?: PopulatedDoc<User>[];
}

export const UserSchema = SchemaFactory.createForClass(User);
