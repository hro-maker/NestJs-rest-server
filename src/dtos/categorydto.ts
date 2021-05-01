import { IsString, MinLength } from "class-validator";


export class createcategorydto{
    @MinLength(4)
    readonly title:string
    @IsString()
    readonly parentId:string
}