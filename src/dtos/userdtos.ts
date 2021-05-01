import { IsString, IsInt, MinLength, Length, IsEmail } from 'class-validator';
export class Userdto{
    @IsString()
    @Length(4,16,{message:"username must be 6-16 character"})
    readonly name:string
    @MinLength(6)
    @IsEmail()
    readonly email:string
    @Length(6,16,{message:"passwort must be 6-16 character"})
    password:string
}
export class Userufterregister{
    _id:string
     name:string
     email:string
    password:string
}
export class Logindto{
    @MinLength(6)
    @IsEmail()
    readonly email:string
    @Length(6,16,{message:"passwort must be 6-16 character"})
    readonly password:string
}
