import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationErrorFilter } from './helpers/validationError';
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalFilters(new ValidationErrorFilter())
  await app.listen(process.env.PORT);
}
bootstrap();
