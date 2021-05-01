import { NestFactory } from '@nestjs/core';
import { Appmodule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(Appmodule);
  const PORT=process.env.PORT || 3000
  await app.listen(PORT,()=>{
    console.log(`server startet on port ${PORT}`)
  });
}
bootstrap();
