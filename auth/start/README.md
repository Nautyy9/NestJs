## Exporting the Service

- Will get an error of UserService Module not found inside the Auth Module because even though we are importing the UserServiceModule we were not exporting the UserServiceModule from the User Module so we need to export the module to make it available for other modules

## Don't Unnecessarily add the controller and service if not require

- i added the `AuthService` and `AuthController` to the **`AppModule`** and since the `AuthService` request the JwtService which in turn requires `JwtModule` to be configured before the Service , which should be the case since im importing the `AuthModule` in the imports of the `AppModule` but , the fact that `AuthService` should be injected unless the `AuthController` calls the `AuthService` requesting the `JwtModule` import.
- Which means that the `JwtModule` hasn't been intitalized even though it is being provided in the imports which is due to the fact that the AuthModule is being called from the `AuthController`.
- **`So never import the Service or the Controller until it is required or throws an error for not doing so.`**

## Server Retrying to connect error

- If you added a column in the table and the NestJs gives error for it being not available on the already created record{[Meaning it shows null constraint error]} then make the column **`nullable`**
