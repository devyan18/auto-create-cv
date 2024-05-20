import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type ExperienceDocument = HydratedDocument<Experience>;

@Schema({
  timestamps: true,
  versionKey: false,
  _id: true,
  id: false,
})
export class Experience {
  @Prop({ index: true, unique: true })
  experienceId: string;

  @Prop({ required: true })
  position: string;

  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  startDate: string;

  @Prop({ required: false, default: null })
  endDate: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  creator: User;
}

const ExperienceSchema = SchemaFactory.createForClass(Experience);

ExperienceSchema.pre('save', function () {
  this.experienceId = this._id.toString();
});

// exclude _id from response
ExperienceSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    delete ret._id;
  },
});

export { ExperienceSchema };
