import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseHandlerInterceptor } from './common/interceptors/response.interceptor ';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ResponseHandlerInterceptor());

  const port = process.env.PORT || 3000;

  await app.listen(port, () => {
    console.log(`Application is running on: http://localhost:${port}`);
  });
}

bootstrap().catch((err) => {
  console.error('Error during application bootstrap:', err);
});
