// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// @Schema()
// export class User extends Document {
//   @Prop({ required: true, unique: true })
//   email: string;

//   @Prop({ required: true })
//   password: string;

//   @Prop({ default: Date.now })
//   createdAt: Date;
// }

// export const UserSchema = SchemaFactory.createForClass(User);

import { Schema, Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  createdAt: Date;
}

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
