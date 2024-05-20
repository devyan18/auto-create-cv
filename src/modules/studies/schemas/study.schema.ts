import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type StudyDocument = HydratedDocument<Study>;

@Schema({
  timestamps: true,
  versionKey: false,
  _id: true,
  id: false,
})
export class Study {
  @Prop({ index: true, unique: true })
  studyId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  level: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  startDate: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  creator: User;

  @Prop()
  endDate: string | null;
}

const StudySchema = SchemaFactory.createForClass(Study);

StudySchema.pre('save', function () {
  this.studyId = this._id.toString();
});

StudySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    delete ret._id;
  },
});

export { StudySchema };
