import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticlesService } from '@nx-nest/api/data-access-article';

@Component({
  selector: 'nx-nest-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly articles$ = this.articlesService.articleControllerGetAllArticles();

  constructor(private readonly articlesService: ArticlesService) {}
}
