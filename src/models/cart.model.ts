// @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }] })
// owner: Owner[];
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Product } from 'src/models/product';
export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop()
  userId: string;
    @Prop()
    items: {item:{type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]},count:number}[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);