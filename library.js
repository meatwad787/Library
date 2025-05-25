const Library = document.querySelector('#library')
const Form = document.querySelector('#form');
const NewBook = document.querySelector('#new-book')


NewBook.addEventListener('click', ()=> {
  Form.style.display = 'flex';
})
const myLibrary = [];


 // the "Book" constructor
function Book(title, author, pages) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
}

// take params, create a book then store it in the array
function addBookToLibrary(title, author, pages) {
 const newBook = new Book(title, author, pages);
  myLibrary.push(newBook);
}
 
// A place to list the new book objects
// Has to be here. Don't know why
const booksToAdd = [
    { title: "1984", author: "George Orwell", pages: 328 },
    { title: "The Hobbit", author: "J.R.R. Tolkien", pages: 310 },
    { title: "To Kill a Mockingbird", author: "Harper Lee", pages: 281 }
  ];
  
  // A Loop that looks through and adds each object to addBookToLibrary()
  // Has to be here. Don't know why
  for (let book of booksToAdd) {
    addBookToLibrary(book.title, book.author, book.pages);
  }
  // !!! Figure out how to first display array to the page !!! 
  Library.innerHTML = '';
  myLibrary.forEach(book => {
    // Create a div for each book
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    // Fill the div with book info
    bookDiv.innerHTML = `
      <p><strong>Title:</strong> ${book.title}</p>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
    `+ '<br/>';

    // Add it to the page
    Library.appendChild(bookDiv);
  });
console.table(myLibrary);