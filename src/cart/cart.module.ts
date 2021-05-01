import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Cart, CartSchema } from "src/models/cart.model";
import { Product, ProductSchema } from "src/models/product";
import { Cartcontroller } from './cart.controller';
import { CartServise } from './cart.servise';


@Module({
    imports:[MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
    controllers:[Cartcontroller],
   providers:[CartServise]
})
export class CartModule {}
