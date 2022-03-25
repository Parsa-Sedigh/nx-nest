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
