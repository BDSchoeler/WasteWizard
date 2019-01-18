module.exports = class Item {
  constructor(id, title, description, favourite) {
    this.id = id;
    this.title = title;
    // this.category = category;
    this.description = description;
    this.favourite = favourite;
  }
};
