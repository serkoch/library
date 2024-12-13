const bookshelf = document.querySelector('.bookshelf');

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

function createBookCard(book) {
  const cardDiv = document.createElement('div');
  const cardTitle = document.createElement('p');
  cardTitle.innerText = book.title;
  const cardAuthor = document.createElement('p');
  cardAuthor.innerText = `by ${book.author}`;
  const cardPages = document.createElement('p');
  cardPages.innerText = `${book.pages} pages`;
  const cardRead = document.createElement('input');
  cardRead.type = 'checkbox';
  if (book.read) {
    cardRead.checked = true;
  }
  cardDiv.appendChild(cardTitle);
  cardDiv.appendChild(cardAuthor);
  cardDiv.appendChild(cardPages);
  cardDiv.appendChild(cardRead);
  bookshelf.appendChild(cardDiv);
  cardDiv.setAttribute('data-num', `${myLibrary.indexOf(book)}`);
}

function initialLib() {
  myLibrary.forEach((book) => {
    createBookCard(book);
  });
}

function addToLib() {
  createBookCard(myLibrary[myLibrary.length - 1]);
}

initialLib();

const showButton = document.getElementById('showDialog');
const favDialog = document.getElementById('favDialog');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const read = document.querySelector('#read');
const confirmBtn = favDialog.querySelector('#confirmBtn');

showButton.addEventListener('click', () => {
  favDialog.showModal();
});

favDialog.addEventListener('close', (e) => {
  e.preventDefault();
  favDialog.close();
});

function clearForm() {
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
}

confirmBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const addBook = new Book(title.value, author.value, pages.value, read.checked);
  myLibrary.push(addBook);
  addToLib();
  favDialog.close();
  clearForm();
});
