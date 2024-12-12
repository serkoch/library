const myLibrary = [
  { title: 'Divine Comedy', author: 'Dante Alighieri', pages: 350, read: false },
  { title: 'Harry Potter', author: 'J.K. Rowling', pages: 300, read: true },
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {}
