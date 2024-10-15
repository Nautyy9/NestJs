## One-Many vs Many-Many

- **one-to-many** and **many-to-one** relationships are defined between `Playlist` and `Song`.
- if a `Song` entity has a **foreign key pointing to one `Playlist`**, assigning that song to a new playlist will reassign it to the new one, breaking its previous relationship.
- A many-to-many relationship ensures that a song can belong to multiple playlists without overwriting its previous associations.

```jsx
// Playlist.entity.ts

@ManyToMany(() => Song, (song) => song.playlists)
@JoinTable() // Specifies the owner of the relationship
songs: Song[];
```

```jsx
//song.entity.ts

@ManyToMany(() => Playlist, (playlist) => playlist.songs)
playlists: Playlist[];
```

- **`@JoinTable()`**: Specifies that the `Playlist` entity owns the many-to-many relationship.

## Sorting the connected table with QueryBuilder

```jsx
//wrong way
findAll(): Promise<Playlist[]> {
    return this.playlistRepository.find({
      relations: ['user', 'songs'],
      order: { songs: 'ASC', user: 'DESC' },
    });
  }

```

- TypeORM does not directly support ordering relations (`songs` or `user`)
- **Use `QueryBuilder`** for more control over relations and ordering.
- **Apply `order`** within the main table or via joined relations through `LEFT JOIN`.

```jsx
async findAll(): Promise<Playlist[]> {
  return this.playlistRepository
    .createQueryBuilder('playlist')
    .leftJoinAndSelect('playlist.songs', 'song')
    .leftJoinAndSelect('playlist.user', 'user')
    .orderBy("playlist.id" , 'ASC')
    .addOrderBy('song.title', 'ASC') // Order songs by title
    .addOrderBy('user.email', 'DESC') // Order users by email
    .getMany();
}
```

- **`createQueryBuilder`**: Allows more control over the query, including ordering related entities.
- **`leftJoinAndSelect`**: Joins the related entities (`songs` and `user`) and selects them to be included in the result.
- **`orderBy` & `addOrderBy`**: Orders the songs by `title` in ascending order and users by `email` in descending order.

## Update vs Create

- Well we generally use the create method to create the properties and methods and then save them with repo.save()
  ```tsx
  repo.save();
  ```
- With update we update the values of the fields after getting the respective data from the id||other then we use the repo.update() method to update the record passing the id and the currently updating entity. This works with Non-connected Tables or if we do have connected tables but we don't want to update the connected Table

  ```tsx
  repo.update();
  ```

- But if we want to update the other connected Table we have to use the repo.save() method because we create a new record when we want to update other Tables since we can't update other Tables from selected Tabls `**Not without QueryBuilders**` hence we need to overwrite the current record.
  ```tsx
  repo.save();
  ```
