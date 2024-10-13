# SERVICES VS CONTROLLER [INJECTABLE]

There are two ways to add external {[object]}-> [{useValue}] provider|| {[class]}->[{useClass}] provider

=> the provide has a object which takes provide and useClass|useValue -> the [provide] make the object|value or class available as the Injectable

=> private -> which makes the provider available to that class and object

1. with [service] exporting the the Injectable -> i.e, the object added with useValue , to the songService[service] but the problem with this that the service can only export to the the [controller] as the class to the constructor but it won't be private to the [controller] although it will be private to the [service]

2. with [controller] , we can import the provider to the controller directly as injectable which will make the provider object available as private class

key points => [services] are exported but the [controller] aren't . Because the [controller] contains the routes while [services] are only for method exportation to the controllers

# CLASS||OBJECT -- SERVICES -- MODULE

- these terms are co-dependent because to make the class || object available as a service to the controller we need to import the class inside the module as provider
- meaning that every external class || object we want to use as a service first we need to import it as the provider inside the module .

# INJECT || INJECTABLE

- injectable is a class decorator while inject is the method or property decorator
- we use injectable above the class as to make the class exportable to the [module] and the [controller]
- while [module] just exports the class || object the main handler is [controller]
- [controller] decide how to use the [provider]
- for a [service-provider] we Inject it as a private [class-value]
- for a [non-service-provider] we Inject it as a [Inject] with full [object-declaration]
- with [non-service-provider] we don't need to create a class Constructor as we are directly Injecting the Object insidethe constructor

# PROVIDERS

- controller looks for dependencies[services], when it finds one then [NEST] will create a instance of that dependency[service] , cache it and return it , if has one already then returns the cached one
- Techniques to create || use providers:
- - `Standard Provider` ==> using [AppService] inside the provider
- - `Value provider` ==> using [useValue] to provide constant value with [Inject] decorator
- - `Class Provider` ==> using [useClass] to provide a class [Injectable] injecting as constructor value.
- - `Non Class Provider` ==> using [useValue] for injecting a object to provider injecting as constructor value.
- - `Factory Provider` ==> using [useFactory] to provide a dynamic provider
- - `Non Service Provider` ==> using [useFactory] to inject a provider to the controller || service with [@Inject]

# Injection Scope

- `DEFAULT` -> A Single instance of the provider is shared across all the entire application. After first instance creation the cache is used
- `REQUEST` -> New instance of the provider is exclusively created for each incoming request
  - - <code>
      <!--* inside the song services  -->
      @Injectable({scope: Scope.Request})
      <!--* inside the songs.controller -->
      @Controller({
      path: 'songs',
      scope: Scope.REQUEST,
      }) </code>
  - run this and no previous requests data will be seen in the body of post || get request
- `TRANSIENT` -> are not shared across consumers . each consumer that injects a transient provider will receive a new, dedicated instance
  - - in our example it throws an error saying Cannot read properties of undefined (reading 'findAll') , because we are using the {scope: Scope.TRANSIENT} inside the [controller] which means every time the [controller] rans it receives new instance of the providers || services it receives from
  - - <code>
      <!--* inside the song services  -->
      @Injectable({scope: Scope.TRANSIENT})
      <!--* inside the songs.controller -->
      @Controller({
      path: 'songs',
      scope: Scope.TRANSIENT, <!--! ===> error --> 
      }) </code>

#
