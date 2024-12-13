// const cardAuthor = document.querySelector('.card-author');
// const cardTitle = document.querySelector('.card-title');
// const cardPages = document.querySelector('.card-pages');
// const cardRead = document.querySelector('.card-read');
const bookshelf = document.querySelector('.library');
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

function displayBook() {
  myLibrary.forEach(book => {
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
  })
}


displayBook();

const showButton = document.getElementById("showDialog");
const favDialog = document.getElementById("favDialog");
const outputBox = document.querySelector("output");
const title = favDialog.querySelector("title");
const confirmBtn = favDialog.querySelector("#confirmBtn");

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
  favDialog.showModal();
});

// "Cancel" button closes the dialog without submitting because of [formmethod="dialog"], triggering a close event.
favDialog.addEventListener("close", (e) => {
  outputBox.value =
    favDialog.returnValue === "default"
      ? "No return value."
      : `ReturnValue: ${favDialog.returnValue}.`; // Have to check for "default" rather than empty string
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  favDialog.close(title.value); // Have to send the select box value here.
});
