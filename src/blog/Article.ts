export class Article {
  title: string;
  content: string;
  date: Date;
  name: string;
  preview: string;

  constructor(
    title: string,
    content: string,
    date: Date,
    name: string,
    preview: string
  ) {
    this.title = title;
    this.content = content;
    this.date = date;
    this.name = name;
    this.preview = preview;
  }
}
