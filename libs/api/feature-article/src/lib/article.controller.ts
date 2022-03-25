import { Controller, Get } from '@nestjs/common';
import { ArticleService } from '@nx-nest/api/data-access-article';

@Controller('articles')
export class ArticleController {

  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async getAllArticles() {
    return await this.articleService.getAll();
  }
}
