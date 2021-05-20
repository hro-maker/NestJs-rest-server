import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/models/category';
import { createcategorydto } from './../dtos/categorydto';
function createCategories(categories, parentId = null) {
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == '');
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }
  for (const cate of category) {
    categoryList.push({
      _id: cate._id,
      title: cate.title,
      parentId: cate.parentId,
      childrens: createCategories(categories, cate._id),
    });
  }
  return categoryList;
}
@Injectable()
export class CategoriesServise {
  constructor(
    @InjectModel(Category.name) private CategoryModel: Model<CategoryDocument>,
  ) {}
  async createcategory(category: createcategorydto) {
    const canditate = await this.CategoryModel.findOne({
      title: category.title,
    });
    if (canditate) {
      throw new HttpException(
        'Category already created',
        HttpStatus.BAD_REQUEST,
      );
    }
    const categori = await this.CategoryModel.create(category);
    return categori;
  }
  async getcategories() {
    const category: CategoryDocument[] = await this.CategoryModel.find();
    console.log('category', category);
    const categoriList = createCategories(category);
    console.log('categorylistttttttttt', categoriList);
    return categoriList;
  }
  async getcategoryById(_id) {
    return await this.CategoryModel.findOne({ _id });
  }
}
