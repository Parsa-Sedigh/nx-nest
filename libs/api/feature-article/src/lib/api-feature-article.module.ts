import { Module } from '@nestjs/common';
import { ApiDataAccessArticleModule } from '@nx-nest/api/data-access-article';
import { ArticleController } from './article.controller';

@Module({
  imports: [
    ApiDataAccessArticleModule
  ],
  controllers: [
    ArticleController
  ],
  providers: [],
  exports: [],
})
export class ApiFeatureArticleModule {}
