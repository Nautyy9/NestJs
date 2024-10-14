# Error in resolvement

- if everything is correctly resolved like path etc. then the only thing that can cause an error is the module , in general case it would be app module else if it is the service or provide[error_cause] then it would always be their respective module file

- like in our case it is songs module not having

  - <code>imports: [TypeOrmModule.forFeature([Song])]</code>

- we did the same thing but it was for the db connection
  - <code> imports: [TypeOrmModule.forRoot({...})] </code>

## DTO VS ENTITY

- Beside entity being used as repository within @InjectRepository   it is also used as infered type within the Promise boundary  i.e, ⇒ Promise<Entity>
- DTO is used as Type for the parameters of functions  of http request methods i.e, ⇒

```jsx
create(songs : createSongDTO) :Promise<Song> {}
```

- Here the createSongDTO is DTO and the Song is entity


## @InjectRepository

- A **repository** in TypeORM provides methods for database operations, such as queries, inserts, updates, and deletes, for a given entity.

### **When to Use `@InjectRepository()`?**

1. **Injecting Repositories in Services:**
    
    To inject the repository for an entity into a service class to perform database operations on that entity.
    
2. **Accessing Custom Queries:**
    
    If you need custom queries or logic specific to one entity, a repository provides the necessary methods.
    
3. **Handling Entity Relationships:**
    
    Repositories allow you to efficiently query and manage relationships (e.g., `one-to-many` or `many-to-many`) using ORM methods.
    

The entity needs to be registered within the module using

```tsx
 @Module({
 imports: [TypeOrmModule.forFeature([User])]
 })
```

### **Use Case with a Custom Repository**

If you have complex logic, you can extend the **`Repository`** class and inject the custom repository.

```tsx
// src/user/user.repository.ts
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }
}
```

Then, inject it similarly with `@InjectRepository(UserRepository)`.

- This would help in actual making use of decorator where we can extract one method → perform some operations and then send back as @InjectRepository