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
  const cardTitle = document.createElement('h3');
  cardTitle.innerText = book.title;

  const cardAuthor = document.createElement('p');
  cardAuthor.innerText = `by ${book.author}`;

  const cardPages = document.createElement('p');
  if (parseInt(book.pages) === 1) {
    cardPages.innerText = `${book.pages} page`;
  } else {
    cardPages.innerText = `${book.pages} pages`;
  }
  cardPages.classList.add('pages');

  const cardRead = document.createElement('input');
  cardRead.type = 'checkbox';
  cardRead.name = 'read';
  cardRead.id = `card-read-${index}`;
  cardRead.checked = book.read;

  const cardReadLabel = document.createElement('label');
  cardReadLabel.htmlFor = `card-read-${index}`;
  cardReadLabel.classList.add('read-toggle');

  cardDiv.classList.add('book-card');

  cardDiv.appendChild(cardTitle);
  cardDiv.appendChild(cardAuthor);
  cardDiv.appendChild(cardPages);
  cardDiv.appendChild(cardRead);
  cardDiv.appendChild(cardReadLabel);

  cardDiv.setAttribute('data-num', index);

  const deleteBtn = document.createElement('button');
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
const bookAdd = document.querySelector('#bookAdd');
const closeDialog = document.querySelector('#close');

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

bookAdd.addEventListener('submit', (e) => {
  e.preventDefault();
  const book = new Book(title.value, author.value, pages.value, read.checked);
  myLibrary.push(book);
  displayLib();
  favDialog.close();
  clearForm();
});

closeDialog.addEventListener('click', (e) => {
  e.preventDefault();
  favDialog.close();
  clearForm();
});

displayLib();
