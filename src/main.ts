import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as config from 'config';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  const serverConfig = config.get('server');
  logger.log(process.env.NODE_ENV);
  logger.log(`Server Config: ${JSON.stringify(serverConfig)}`);
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    console.log('DEV');
    app.enableCors();
  } else {
    console.log('PROD');
    app.enableCors({ origin: serverConfig.origin });
    logger.log(`Accepting requests from origin ${serverConfig.origin}`);
  }

  const options = new DocumentBuilder()
    .setTitle('Reservation API')
    .setDescription('Reservation API description')
    .setVersion('1.0')
    .addTag('reservation')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
