import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import { filemodule } from './creatfiles/file.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CartModule } from './cart/cart.module';
dotenv.config();
@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.3l6j1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      {useFindAndModify:true}
    ),
    AuthModule,
    filemodule,
    CartModule,
    CategoriesModule,
    ProductModule,
  ],
})
export class Appmodule {}
