import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/models/category';
import { createcategorydto } from './../dtos/categorydto';

@Injectable()
export class CategoriesServise {
    constructor(@InjectModel(Category.name) private CategoryModel: Model<CategoryDocument>){}
    async createcategory(category:createcategorydto){
            const canditate=await this.CategoryModel.findOne({title:category.title})
            if(canditate){
                throw new HttpException("Category already created",HttpStatus.BAD_REQUEST)
            }
            const categori=await this.CategoryModel.create(category)
            return categori
    }
    async getcategories(){
       let category:CategoryDocument[]=await this.CategoryModel.find()
            category= category.map((el,i,arr)=>{
                   const childrens=arr.filter(cat=>{
                      return  cat.parentId==el._id
                    })
                   
                   if(!childrens.length){
                            el.childrens=[]    
                   }
                   el.childrens=childrens.map(elem=>elem._id)
                   return el
            })
            return category
    }
    async getcategoryById(_id){
        return await (await this.CategoryModel.findOne({_id}))
    }
}
