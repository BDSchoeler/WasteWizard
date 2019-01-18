import { Pool } from 'pg';
import Item from '../models/item';

export default class ItemController {
  constructor(pool) {
    this.pool = pool || new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: 'postgres',
      port: 5432,
    });;
  }

  // Get Item by Keyword
  async getItems(searchKeyword) {
    const searchPattern = `%${searchKeyword}%`;
    const result = await this.pool.query(
      'SELECT DISTINCT items.id, items.title, items.description, items.favourite '
            + 'FROM items '
            + 'JOIN keywords '
            + 'ON items.id = keywords."itemId" '
            + 'WHERE keywords.keyword LIKE $1', [searchPattern]);
    const items = [];
    for (let i = 0; i < result.rows.length; i += 1) {
      const data = result.rows[i];
      items.push(new Item(data.id, data.title, data.description, data.favourite));
    }
    return items;
  }

  // Get Favourites
  async getFavourites() {
    const result = await this.pool.query(
      'SELECT items.id, items.title, items.description, items.favourite '
            + 'FROM items '
            + 'WHERE items.favourite = true');
    const items = [];
    for (let i = 0; i < result.rows.length; i += 1) {
      const data = result.rows[i];
      items.push(new Item(data.id, data.title, data.description, data.favourite));
    }
    return items;
  }

  // Update Item Favourite Status
  async updateItem(id, { favourite }) {
    console.log("updating item", id, favourite)
     return await this.pool.query('UPDATE items SET favourite = $1 WHERE id = $2', [favourite, id]);
  }
}