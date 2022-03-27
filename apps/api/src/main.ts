/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { AppConfiguration, appConfiguration } from '@nx-nest/api/utils-config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const configureSwagger = (appConfig: AppConfiguration, app: INestApplication, globalPrefix: string) => {
  const swaggerDocOptions = new DocumentBuilder()
    .setTitle('Nx Article Api')
    .setDescription('Nx Article Api Docs')
    .setVersion('1.0.0')
    .addServer(appConfig.domain, 'development')
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerDocOptions);
  const swaggerUIPath = `/${globalPrefix}/docs`;
  SwaggerModule.setup(swaggerUIPath, app, swaggerDoc);
  Logger.log(`Swagger Docs enabled: ${appConfig.domain}${swaggerUIPath}`, 'NestApplication')
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get<AppConfiguration>(appConfiguration.KEY);
  const globalPrefix = 'api';
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  configureSwagger(appConfig, app, globalPrefix);

  // const port = process.env.PORT || 3333;
  // await app.listen(appConfig.port);
  // Logger.log(
  //   `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  // );
  await app.listen(appConfig.port, () => {
    Logger.log(`Listening on: ${appConfig.domain}/${globalPrefix}`);
  });
}

bootstrap();
