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
