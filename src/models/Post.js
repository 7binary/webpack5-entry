export default class Post {
  constructor(title, imgAsset) {
    this.title = title;
    this.date = new Date();
    this.imgAsset = imgAsset;
  }

  toString() {
    return JSON.stringify({
      title: this.title,
      date: this.date.toLocaleDateString(),
      imgAsset: this.imgAsset,
    }, null, 2);
  }

  get uppercaseTitle() {
    return this.title.toUpperCase();
  }
}
