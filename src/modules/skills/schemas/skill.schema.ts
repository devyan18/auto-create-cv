import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type SkillDocument = HydratedDocument<Skill>;

@Schema({
  timestamps: true,
  versionKey: false,
  _id: true,
  id: false,
})
export class Skill {
  @Prop({ index: true, unique: true })
  skillId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  yearsOfExperience: number;

  @Prop({ required: true })
  logo: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  creator: User;
}

const SkillSchema = SchemaFactory.createForClass(Skill);

SkillSchema.pre('save', function () {
  this.skillId = this._id.toString();
});

// exclude _id from response
SkillSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    delete ret._id;
  },
});

export { SkillSchema };
