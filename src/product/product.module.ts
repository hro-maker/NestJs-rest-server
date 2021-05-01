import { Module } from '@nestjs/common';
import { ProductServise } from './product.servise';
import { ProductController } from './product.controller';
import { FileServise } from './../creatfiles/file.servise';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/models/product';

@Module({
    imports:[MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
    providers:[ProductServise,FileServise],
    controllers:[ProductController]
})
export class ProductModule {}
