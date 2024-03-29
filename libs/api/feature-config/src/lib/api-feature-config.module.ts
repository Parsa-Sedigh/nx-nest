import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfiguration, mongoConfiguration } from '@nx-nest/api/utils-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfiguration, mongoConfiguration]
    })
  ]
})
export class ApiFeatureConfigModule {
}
