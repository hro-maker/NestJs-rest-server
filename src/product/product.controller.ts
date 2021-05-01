import { Body, Controller, Get, Param, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { productdto } from "src/dtos/productdtos";
import { ProductServise } from './product.servise';
interface Iparam{
        id:string
}

@Controller('product')
export class ProductController{
        constructor(private productservise:ProductServise){}
    @Post('/create')
    @UseInterceptors(FilesInterceptor('files'))
    createproduct(@Body()product:productdto,@UploadedFiles() files: Express.Multer.File){
            return this.productservise.create(files,product)
    }

    @Get('/getall')
    getall(){
            return this.productservise.getall()
    }
    @Get('get/:id')
    getbyid(@Param()id:Iparam){
            return this.productservise.getbyid(id.id)
    }
}