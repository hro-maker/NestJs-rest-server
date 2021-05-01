import {  Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { addcartitemdto, changecounterdto } from 'src/dtos/cartdtos';
import { Cart, CartDocument } from 'src/models/cart.model';
import { Product, ProductDocument } from 'src/models/product';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class CartServise {
  constructor(
    @InjectModel(Cart.name) private Cartmodel: Model<CartDocument>,
    @InjectModel(Product.name) private ProductModel: Model<ProductDocument>,
  ) {}
  async addCartitem(dto: addcartitemdto) {
    const product = await this.ProductModel.findOne({ _id: dto.productId });
    const cart = await this.Cartmodel.findOne({ userId: dto.userId });
    if (cart) {
      if (cart.items.some((el) => String(el.item) == String(product._id))) {
        cart.items.map((elem) =>
          String(elem.item) === String(product._id)
            ? (elem.count = elem.count + 1)
            : elem,
        );
      } else {
        cart.items = [...cart.items, { item: product._id, count: 1 }];
      }
      const newcart = await this.Cartmodel.findOneAndUpdate(
        { userId: dto.userId },
        cart,
      );

      return cart;
    } else {
      const newcart = await this.Cartmodel.create({
        userId: dto.userId,
        items: [{ item: product._id, count: 1 }],
      });
      return newcart;
    }
  }
  async changecount(dto: changecounterdto) {
    const cart = await this.Cartmodel.findOne({ _id: dto.id });
    if(!cart || !cart.items.some(el=> String(el.item) === String(dto.productId))){
        throw new BadRequestException("cart dont fount")
    }
    cart.items.map((el) => {
      if (String(el.item) === String(dto.productId) && el.count != 1) {
        el.count -= 1;
      }
      return el;
    });
    await this.Cartmodel.findOneAndUpdate({ _id: dto.id }, cart);
    return cart;
  }
 async removecartitem(dto:changecounterdto){
    const cart = await this.Cartmodel.findOne({ _id: dto.id });
    if(!cart || !cart.items.some(el=> String(el.item) === String(dto.productId))){
        throw new BadRequestException("cart dont fount")
    }
   cart.items= cart.items.filter((el)=>String(el.item) !== String(dto.productId))
    await this.Cartmodel.findOneAndUpdate({ _id: dto.id }, cart);
    return cart;
 }
}
