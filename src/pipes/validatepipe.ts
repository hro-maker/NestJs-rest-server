import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const errorsa = errorhandler(errors);
      throw new BadRequestException(errorsa);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
function errorhandler(array = []) {
  const errors = array.reduce((accum, elem) => {
    accum.fields = (accum.fields ? `${accum.fields}, ` : ' ') + elem.property;
    accum.messages =
      (accum.messages ? `${accum.messages}, ` : '') +
      Object.values(elem.constraints).reduce((calc, el) => {
        calc = `${calc} ${el}`;
        return calc;
      }, '');
    return accum;
  }, {});
  return errors;
}
