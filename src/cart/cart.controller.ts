import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { addcartitemdto, changecounterdto } from "src/dtos/cartdtos";
import { AuthGuard } from "src/guards/canactivate";
import { CartServise } from './cart.servise';



@Controller('cart')
export class Cartcontroller{
    constructor(private cartservise:CartServise){}
    @Post('/addtocart')
    @UseGuards(AuthGuard)
    addtocart(@Body()dto:addcartitemdto){
            return this.cartservise.addCartitem(dto)
    }
    @Post('/minuscount')
    @UseGuards(AuthGuard)
    minuscount(@Body()dto:changecounterdto){
            return this.cartservise.changecount(dto)
    }
    @Post('/remove')
    @UseGuards(AuthGuard)
    removecartitem(@Body()dto:changecounterdto){
            return this.cartservise.removecartitem(dto)
    }
}