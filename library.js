const myLibrary = [];


 // the "Book" constructor
function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

// take params, create a book then store it in the array
function addBookToLibrary(title, author, pages) {
 const newBook = new Book(title, author, pages);
  myLibrary.push(newBook);
  console.log(newBook)
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
  
console.table(myLibrary);