import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { generateHash } from 'src/common/services';

export type UserDocument = HydratedDocument<User>;

// auto create id from uuid
@Schema({ _id: true, id: false })
export class User {
  @Prop({ index: true, unique: true })
  userId: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: false, default: null })
  password: string;

  @Prop({ required: true })
  isOAuthAccount: boolean;

  @Prop({ required: true })
  username: string;

  @Prop({ type: String, default: 'https://unavatar.io/user/' })
  avatar: string;
}

// hash password pre save

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  const hash = await generateHash(this.password);

  this.password = hash;

  next();
});

// exclude _id from response

UserSchema.pre('save', function () {
  if (this.isModified('isOAuthAccount')) {
    if (!this.isOAuthAccount && !this.password) {
      throw new Error('Password is required');
    }
  }

  this.userId = this._id.toString();
});

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export { UserSchema };
