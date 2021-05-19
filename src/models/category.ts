import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type CategoryDocument = Category & Document;
interface Ichild{
  id:string,
  title:string
}
@Schema()
export class Category {
  @Prop()
  title: string;
  @Prop()
  parentId: string;
  @Prop()
  childrens?: Ichild[] | [];
}

export const CategorySchema = SchemaFactory.createForClass(Category);