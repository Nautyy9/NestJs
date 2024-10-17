## Options
- Applications often run in different environments. Depending on the environment, different configuration settings should be used.
  -  For example, usually, the local environment relies on specific database credentials, valid only for the local DB instance. The production environment would use a separate set of DB credentials.
  -  Since configuration variables change, best practice is to store configuration variables in the environment.

- In Nest.js, configurations refer to the settings and parameters that define the behavior of your application.
  -  These configurations can include various aspects, such as server settings, database connections, API keys, logging options, and more.

- Nest.js provides a flexible way to manage configurations, allowing you to easily customize the behavior of your application based on different environments (e.g., development, production, testing) or specific deployment scenarios. By separating configuration settings from your code, you can make your application more portable and adaptable to different environments.

- Configurations in Nest.js typically consist of key-value pairs, where each key represents a specific setting and the corresponding value represents its configuration value. These configurations are often stored in environment variables or configuration files.
- By utilizing configurations, you can ensure that your application can be easily configured without modifying the code itself.
  -  This makes it simpler to deploy and maintain your application in different environments or when working with multiple teams.

- Nest.js provides various mechanisms to load and use configurations, including the popular dotenv package for loading environment variables from files, as well as custom configuration modules and services that encapsulate the configuration logic and provide access to the configuration values throughout your application.

- Overall, configurations in Nest.js help you manage the behavior of your application in a flexible and modular way, enabling you to adapt it to different environments and deployment scenarios without modifying the underlying code.