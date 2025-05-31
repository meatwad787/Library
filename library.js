const Library = document.querySelector('#library');
const FormConainer = document.querySelector('#form-container')
const Form = document.querySelector('#form');
const NewBookBtn = document.querySelector('#new-book');
const ClearAllBtn = document.querySelector('#clear-all-button')
const Container = document.querySelector('#container');
const SubmitBtn = document.querySelector('#submit');


const myLibrary = [];

function addBook () {
// This makes the form "appear" as a popup 
NewBookBtn.addEventListener('click', ()=> {
  Form.style.display = 'flex';
  FormConainer.classList.add('z-index') // switches the z-index of the form-container from -1 to 1;
  Container.classList.add('blur') // blurs the background when the form is on-screen
  ClearAllBtn.disabled = true;
  ClearAllBtn.classList.add('no-hover');
  NewBookBtn.disabled = true;
  NewBookBtn.classList.add('no-hover');

})

ClearAllBtn.addEventListener('click', ()=> {
  localStorage.removeItem('MyBooks')
  window.location.reload();
})

SubmitBtn.addEventListener('click', (event)=> {
  event.preventDefault(); // Prevents the form from trying to send data   
  Container.classList.remove('blur')  // removes the blur from the page and 
  Form.style.display = 'none';
  FormConainer.classList.remove('z-index'); // resets the form-container's z-index to -1  

  ClearAllBtn.disabled = false;
  ClearAllBtn.classList.remove('no-hover');
  NewBookBtn.disabled = false;
  NewBookBtn.classList.remove('no-hover')

  // Creates the Book object 
  // Uses the form input values as key: values.
      let Book = {
          id: crypto.randomUUID(),
          title: document.querySelector('#title').value,
          author: document.querySelector('#author').value,
          pages: document.querySelector('#page-number').value
      };
        myLibrary.push(Book);

        Library.innerHTML = '';

      myLibrary.forEach(function(book) {
      let bookDiv = document.createElement('div');
      bookDiv.classList.add("book");
      let removeBtn = document.createElement('button');
      removeBtn.classList.add('remove-button');
      removeBtn.textContent = 'Delete'
      

      bookDiv.innerHTML = `
        <p><i>"${book.title}"<i/></p>
        <p> by ${book.author}</p>
        <p>${book.pages} Pages</p>
      `;

      Library.appendChild(bookDiv);
      bookDiv.appendChild(removeBtn);
      })
      Form.reset(); // Reset the form
      console.table(myLibrary);

      // Locally Stores the objects in myLibrary as JSON string 
      localStorage.setItem('MyBooks', JSON.stringify(myLibrary))
})

}



  // Lets the browser re-creates previous html and objects after refresh
  // Basically save the page/ Library so you can keep adding to it
document.addEventListener('DOMContentLoaded', () => {
  const storedLibrary = localStorage.getItem('MyBooks');
  if (storedLibrary) {
    const loadedBooks = JSON.parse(storedLibrary);
    myLibrary.push(...loadedBooks); // populate the main array

    loadedBooks.forEach(function(book) {
      let bookDiv = document.createElement('div');
      bookDiv.classList.add("book");
        let removeBtn = document.createElement('button');
      removeBtn.classList.add('remove-button');
      removeBtn.textContent = 'Delete'

      bookDiv.innerHTML = `
        <p>Title: ${book.title}</p>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
      `;

      Library.appendChild(bookDiv);
      bookDiv.appendChild(removeBtn);
    });
  }

  addBook()
})

