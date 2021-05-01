import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileServise } from 'src/creatfiles/file.servise';
import { productdto } from './../dtos/productdtos';
import { Product, ProductDocument } from 'src/models/product';
import { Model } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class ProductServise {
    constructor (
        private  fileservise:FileServise,
        @InjectModel(Product.name) private ProductModel: Model<ProductDocument>
        ){}
   async create(files,productdt:productdto){
       try {
        
        const canditate=await this.ProductModel.findOne({name:productdt.name})
        if(canditate){
            throw new HttpException("productwith this name already creaded",HttpStatus.BAD_REQUEST)
        }
        const filepaths= files.reduce((accum,file) => {
            const filepath=this.fileservise.create(file)
            accum=[...accum,filepath]
            return accum
        },[]);
        productdt.categories=productdt.categories.split(",")
        console.log(productdt)
        const product=await this.ProductModel.create({...productdt,fotos:filepaths})
         return product
       } catch (error) {
           throw new HttpException(error.message,HttpStatus.BAD_REQUEST)
       }
    }
    async getall(){
        const products=await this.ProductModel.find()
        return products
    }
    async getbyid(id:string){
        try {
            const product=await this.ProductModel.findOne({_id:id})
        if(!product){
            throw new HttpException("product dont found",HttpStatus.BAD_REQUEST)
        }
        return product
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }
}
