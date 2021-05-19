import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { identity } from "rxjs";
import { User, UserDocument } from 'src/models/usermodel';
import { Logindto, Userdto, Userufterregister } from '../dtos/userdtos';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()
@Injectable()
export class authServise{
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>){}
  async  register(user:Userdto):Promise<Userufterregister | User>{
        try {
            const canditate=await this.userModel.findOne({email:user.email})
                        if(canditate){
                            throw new HttpException("user already registret",HttpStatus.BAD_REQUEST)
                        }
            user.password=await bcrypt.hash(user.password,12)
            const newuser= await this.userModel.create({...user})                   
            return newuser
        } catch (error) {
            throw new HttpException(error.message,HttpStatus.BAD_REQUEST)
        }
    }
    async login(user:Logindto){
        try {
            const canditate=await this.userModel.findOne({email:user.email})
                        if(!canditate){
                            throw new HttpException("user dont found",HttpStatus.BAD_REQUEST)
                        }
          const valipassword=await bcrypt.compare(user.password,canditate.password)
          if(!valipassword){
            throw new HttpException("password is incorrect",HttpStatus.BAD_REQUEST)
          }   
          const token=jwt.sign({id:canditate._id,username:canditate.name},process.env.JWT_SECRET,{expiresIn:"24h"})
          return {user:canditate,token}
        } catch (error) {
            throw new BadRequestException(error.message)
        } 

    }
}
