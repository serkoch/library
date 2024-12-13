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

function createBookCard(book, index) {
  const cardDiv = document.createElement('div');
  const cardTitle = document.createElement('p');
  cardTitle.innerText = book.title;

  const cardAuthor = document.createElement('p');
  cardAuthor.innerText = `by ${book.author}`;

  const cardPages = document.createElement('p');
  cardPages.innerText = `${book.pages} pages`;

  const cardRead = document.createElement('input');
  cardRead.type = 'checkbox';
  cardRead.checked = book.read;

  cardDiv.appendChild(cardTitle);
  cardDiv.appendChild(cardAuthor);
  cardDiv.appendChild(cardPages);
  cardDiv.appendChild(cardRead);

  cardDiv.setAttribute('data-num', index);

  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';
  deleteBtn.classList.add('deleteBook');
  deleteBtn.setAttribute('data-num', index);
  cardDiv.appendChild(deleteBtn);

  bookshelf.appendChild(cardDiv);
}

function displayLib() {
  clearLib();
  myLibrary.forEach((book, index) => {
    createBookCard(book, index);
  });
  attachDeleteListeners();
}

function attachDeleteListeners() {
  const deleteBtns = document.querySelectorAll('.deleteBook');
  deleteBtns.forEach((button) => {
    button.removeEventListener('click', deleteBook);
    button.addEventListener('click', deleteBook);
  });
}

function deleteBook(event) {
  let num = Number(event.target.getAttribute('data-num'));
  myLibrary.splice(num, 1);
  displayLib();
}

function clearLib() {
  while (bookshelf.firstChild) {
    bookshelf.removeChild(bookshelf.lastChild);
  }
}

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
  displayLib();
  favDialog.close();
  clearForm();
});

displayLib();
