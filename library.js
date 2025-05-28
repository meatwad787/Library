const Library = document.querySelector('#library');
const FormConainer = document.querySelector('#form-container')
const Form = document.querySelector('#form');
const NewBookBtn = document.querySelector('#new-book');
const Container = document.querySelector('#container');
const SubmitBtn = document.querySelector('#submit');



// This makes the form "appear" as a popup 
// and blurs the background when the form is on-screen
//and switches the z-index of the form-container from -1 to 1;
NewBookBtn.addEventListener('click', ()=> {
  Form.style.display = 'flex';
  FormConainer.classList.add('z-index')
  Container.classList.add('blur')
})

//Prevents the form from trying to send data 
//removes the blur from the page and 
//resets the form-container's z-index to -1
SubmitBtn.addEventListener('click', (event)=> {
  event.preventDefault();
  Container.classList.remove('blur')
  Form.style.display = 'none';
  FormConainer.classList.remove('z-index')
  
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
  
  //Loops through objects in booksToAdd and 
  //runs them through addBookToLibrary...
  //which then stores them in the 
  // myLibrary  array (to be displayed later)
  for (let book of booksToAdd) {
    addBookToLibrary(book.title, book.author, book.pages);
  }
  // Clears the Library container and 
  // creates a div to hold each book in booksToAdd
  Library.innerHTML = '';
  myLibrary.forEach(book => {
    // Create a div for each book
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    // Fill the div with book info
    bookDiv.innerHTML = `
      <p>Title: ${book.title}</p>
      <p>Author: ${book.author}</p>
      <p>Pages: ${book.pages}</p>
    `+ '<br/>';

    // Add it to the page
    Library.appendChild(bookDiv);
  });
console.table(myLibrary);