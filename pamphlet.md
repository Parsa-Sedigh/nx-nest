/* In nest, the controller is basically your route handler.
In angular.json , we're gonna set up a new target, so we can run the frontend and backend together. Let's call it 'serve-all' .

Now create a directory inside lib folder called api.

Now generate a library and call it utils-config.
Then generate another library and call it feature-config instead of utils-config.
In both of these libraries, the directory where the library is placed, is called `api`.

By saying:
export const InjectAppConfig = () => Inject(appConfiguration.KEY);
now whenever you want to inject the app config, you can just use this helper instead of that syntax?.

Now we're done with app configuration and just go a head and export it as the public api, which is done by exporting it from the index.ts file 
in that specific library.

Now go to featureConfig module and import the ConfigModule there.
Then go to app.module.ts of api and import the api-feature-config.module there.

Why not just use the utilsConfigModule inside appModule?
Because I want to make a very distinction separation between what can be imported inside of app.module . So basically everything that we imported
in app.module , should be a feature module. That way if we had another nestjs application, for example a serverless function like cloud function
and then we can reuse the feature config module with the same configuration setup in that app too.

Now go to main.ts of nestjs app and use the app configuration there.

Now our backend should run on port 3000 instead of 3333.

Now in utils config, create a mongo.configuration.ts . Then export the mongo configuration from the index.ts . Then import it in api-feature-config 
module.

Now install @nestjs/mongoose mongoose .

Now that you have mongoose, we're gonna set up a docker compose to spin up a mongo docker container so you don't have to install mongo.

Now instead of "commands": ["nx serve api", "nx serve post"] in project.json for running the project, we use docker-compose:
"commands": ["nx serve api", "docker-compose up"]

Let's create a new nestjs library and name the library: data-access-article in the api directory.
Then create another one and call it `feature-article` in the api directory.

Now we have the model set up with mongoose, so now mongodb is aware of our model. You can just use the model directly, but it's a good practice
to create a service for it. So create article service.

Now export that service and provide it to be used in apps, by exporting it in index.ts file in the lib. Then add it to providers array of
api-data-access-article.module .
Then import ApiDataAccessArticleModule in api-feature-article.module .

Then import the api-feature-article.module in app.module .

Now let's add open-api so run: npm i @nestjs/swagger swagger-ui-express
Then in main.ts file of nestjs app , create a function called configureSwagger.

There's no hot reload for swagger ui, see if you for example add a new @ApiTags() to a controller, you have to refresh the browser(don't re-run the
serve command though!).

Now create a new library called `data-access-dtos` under the api directory. So run:
nx generate @nrwl/nest:library --name=data-access-dtos --directory=api --no-interactive --dry-run and then delete the generated module file there.
We don't need the module file there but we're still using nestjs stuff there, so that's why we created as a nest library. Some people might argue that
why don't you just use a node library or a workspace library?
Because we're using some nestjs features. So we generated a nestjs library.
After creating a dto, export it as the public api.
---
How to share types and interfaces between frontend and backend?
We can generate a library and export that interface or type from the library and in frontend and backend you can consume it.
But there's also a different way.

Don't forget to refresh the browser to see the updates to swagger.

---
Normally in your project, you don't want to expose the model like article model, as the public API of the data access library. Because
the model is the contract between your application and DB, so you don't want to expose that. You want your service to manage that instead of 
anything else. But in our case, we did it. We exposed the article.model in index.ts of data-access-article library. Usually you would have like
an article dto and then you have some transformations layer in between to transform your article to article dto.
Also adding the @ApiProperty decorator to the properties of a model class is not good. Instead you want to add that decorator to properties of 
dto class.

Currently, you're seeing that we have to do a lot of things to let swagger knows about all of these information. There's a better way and it's to use
the swagger plugin.

Let's remove the @ApiProperty from ArticleModel class and ArticleDto class. But don't do this in controller classes I guess. 

Then go to angular.json (which in our case is project.json) and look for the build target of the api and add the tsPlugins property to
options object. There, dtoFileNameSuffix, is the file extension of all the models that you want swagger to look at.
Now restart your server.

If you use the swagger plugin, you can STILL use the decorators. Now install the openapitools package.

In the api:gen npm script, you see http://localhost:3000/api/docs-json. Now we know that http://localhost:3000/api/docs is where
swagger ui lives right now. If you append -json to whatever path you set up for your swagger ui, you're gonna get the JSON version of the swagger ui.
So now go to http://localhost:3000/api/docs-json to see the json version of swagger ui which itself lives in http://localhost:3000/api/docs .
Now because this is in JSON format, toolings around swagger ui can read this json format. So we're saying for the openapi generator, we say:
hey, this(the json format of swagger ui) is the input. Read this. Using a generator called typescript-angular and generate services and stuff like that.

Now run: npm run api:gen and after that, a directory called model is generated which is called(in this case) createArticleDto.ts and also an api
directory which has an api.ts and articles.service.ts .

Now generate a new library for the frontend:
nx generate @nrwl/angular:library --name=data-access-api --directory=article --no-interactive --dry-run
Then remove the generated module file there and also remove the export statement of it in index.ts and instead in index.ts , we just export everything
from the lib directory.

TODO: COULDN'T RUN THIS NPM SCRIPT. I GUESS IT'S BECAUSE WE COULDN'T CONNECT TO MONGODB.
 
If you're using the swagger plugin to generate the response for your endpoints, you have to write the return types of those endpoints.
So we actually NEED the @ApiTags and @ApiOkResponse and @ApiCreatedResponse.

Now you can call the methods that generated angular services, in your angular components.

TODO: rename the `post` project with `article`. Because it conflicts with Post function decorator from nest.

We can not share @ApiProperty s of dtos with our frontend. Generator is a nice workaround to this. Another approach is that the swagger module just
got like a shim file, so you can use the shim to tell your frontend bundler: "Hey, if you see nestjs, look at this shim file" and then you can share
your stuff without the generator. But you're gonna have to write all the angular services for the endpoints in swagger, YOURSELF.

In a real project, we would have like a base model and a base service and ... , so you don't have to have findAll() createAll() and ... , for each entity
and also the error handling would be like this.

Automapper maps your entities to your DTOs or view models(models for the view) and the idea is that you don't want to expose your entity to the frontend.
A package that do this is class transformer.
