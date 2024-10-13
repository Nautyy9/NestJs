# Error in resolvement

- if everything is correctly resolved like path etc. then the only thing that can cause an error is the module , in general case it would be app module else if it is the service or provide[error_cause] then it would always be their respective module file

- like in our case it is songs module not having

  - <code>imports: [TypeOrmModule.forFeature([Song])]</code>

- we did the same thing but it was for the db connection
  - <code> imports: [TypeOrmModule.forRoot({...})] </code>
