## Swagger

- the Swagger document is hosted at the /api endpoint, making it accessible via http://localhost:3000/api, offering a visual interface for interacting with the API. As a best practice, maintaining up-to-date and comprehensive Swagger documentation ensures that APIs are understandable and usable, aiding in both development and API consumption.

- The syntax entities: ['dist/**/*.entity.js'] has been utilized for entity registration, yet it is incompatible with Webpack hot module reloading, necessitating manual entity registration within the typeOrmAsyncConfig object.
- As a best practice, specifying each entity class directly in the TypeORM configuration ensures clarity and reliability, especially during the development phase when hot reloading is frequently used.

## Register the Swagger plugin in nest-cli.json

```json
  "compilerOptions": {
"deleteOutDir": true,
"plugins": [
{
"name": "@nestjs/swagger",
"options": {
"introspectComments": true
}
}
]
}
```

## Enable Bearer Auth
