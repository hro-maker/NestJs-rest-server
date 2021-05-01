import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { createcategorydto } from 'src/dtos/categorydto';
import { CategoriesServise } from './categories';

@Controller('category')
export class CategoriesController {
constructor(private categoryservise:CategoriesServise){}
    @Post('/create')
    createcategories(@Body(new ValidationPipe())category:createcategorydto){
            return this.categoryservise.createcategory(category)
    }
    @Get('/getall')
    getall(){
        return this.categoryservise.getcategories()
    }
    @Get('/getaone/:id')
    getById(@Param() params){
        return this.categoryservise.getcategoryById(params.id)
    }
}
