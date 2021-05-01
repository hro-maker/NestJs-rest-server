import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/models/usermodel';
import { AuthController } from './auth.controller';
import { authServise } from './auth.servise';
import { UserSchema } from './../models/usermodel';

@Module({
    imports:[MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers:[AuthController],
    providers:[authServise]
})
export class AuthModule {}
