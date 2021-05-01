import { Body, Controller, Get, Post } from '@nestjs/common';
import { Logindto, Userdto } from 'src/dtos/userdtos';
import { ValidationPipe } from 'src/pipes/validatepipe';
import { authServise } from './auth.servise';

@Controller('auth')
export class AuthController {
    constructor(private authservise:authServise){}
    @Post("/register")
    register(@Body(new ValidationPipe())userdto:Userdto){
            return this.authservise.register(userdto)
    }
    @Post("/login")
    login(@Body(new ValidationPipe())userdto:Logindto){
            return this.authservise.login(userdto)
    }
}
