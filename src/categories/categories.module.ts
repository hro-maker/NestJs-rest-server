import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/models/category';
import { CategoriesServise } from './categories';
import { CategoriesController } from './categories.controller';

@Module({
  imports:[MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  controllers: [CategoriesController],
  providers: [CategoriesServise]
})
export class CategoriesModule {}
