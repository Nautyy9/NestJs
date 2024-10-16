# What are migrations

- In TypeORM, migrations are a way to manage and apply changes to your database schema over time.
- A migration is a file that contains a set of instructions for creating, modifying, or deleting database tables, columns, constraints, and other schema elements.
- Migrations help you keep your database schema in sync with your application's models or entities.
- When you develop an application using TypeORM, your database schema evolves as you add new features, modify existing ones, or fix issues.
- Migrations provide a structured and controlled approach to apply these changes to your database without losing existing data.
- Here's a general workflow of how migrations work in TypeORM:
  - 1. Creating a Migration: When you make changes to your entities or models, you generate a migration file using TypeORM's CLI command or programmatically using the provided API.
    - The migration file contains both the "up" and "down" methods. The "up" method specifies how to apply the changes to the database, while the "down" method defines how to revert those changes.
  - 2. Applying Migrations: To apply a migration, you execute the migration runner provided by
    - TypeORM, either through the CLI or programmatically in your code. The runner reads the migration files and executes the "up" method, which performs the necessary changes to the database schema.
  - 3. Reverting Migrations: If you encounter issues or need to roll back changes, you can use the migration runner to revert migrations.
    - The runner executes the "down" method of the migration file, which undoes the changes made by the corresponding "up" method.
  - 4. Managing Migration History: TypeORM keeps track of the executed migrations in a table within your database.
    - This table records which migrations have been applied, allowing the runner to determine which migrations are pending or need to be reverted.
    - By using migrations, you can version control your database schema, collaborate with other developers effectively, and easily deploy schema changes across different environments.
    - Migrations provide a structured and reliable approach to evolving your database schema while preserving data integrity.

## What is Data Seeding

- Data seeding is the process of populating a database with an initial set of data.
- Applying seed data to a database refers to the process of inserting initial data into a database, usually when the database is first created.
- This data serves as a baseline and can be used for testing, and
  development, and to provide some context for the application that will be built on top of the database.

## Query Runner

1. A Query Runner can be used to manage and work with a single real database data source.
   Each new QueryRunner instance takes a single connection from the connection pool if
   RDBMS supports connection pooling. For databases not supporting connection pools, it uses
   the same connection across data source.
2. Use the connect method to actually obtain a connection from the connection pool.
3. QueryRunner provides a single database connection. Transactions are organized using
   query runners. Single transactions can only be established on a single query runner. You can
   manually create a query runner instance and use it to manually control transaction state.
4. Commit the Transaction
5. If we have errors let's rollback changes we made
6. Make sure to release it when it is not needed anymore to make it available to the connection
   pool again
