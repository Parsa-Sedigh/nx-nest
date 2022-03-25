import { Module } from '@nestjs/common';
import { ApiFeatureConfigModule } from '@nx-nest/api/feature-config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfiguration, mongoConfiguration } from '@nx-nest/api/utils-config';
import { ApiFeatureArticleModule } from '@nx-nest/api/feature-article';


@Module({
  imports: [
    ApiFeatureConfigModule,
    MongooseModule.forRootAsync({
      inject: [mongoConfiguration.KEY],
      useFactory: (config: MongoConfiguration) => ({
        uri: config.uri,
        dbName: config.dbName
      })
    }),
    ApiFeatureArticleModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
