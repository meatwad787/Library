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
  // Targets class selectors since these buttons were dynamically created here 
  document.querySelectorAll('.remove-button').forEach(btn => {
  btn.disabled = true;
  btn.classList.add('no-hover');
});

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
  NewBookBtn.classList.remove('no-hover');
  // Targets class selectors since these buttons were dynamically created here 
  document.querySelectorAll('.remove-button').forEach(btn => {
  btn.disabled = false;
  btn.classList.remove('no-hover');
});

  // Creates the Book object 
  // Uses the form input values as key: values.
  const UUID = crypto.randomUUID();
      let Book = {
          id: UUID,
          title: document.querySelector('#title').value,
          author: document.querySelector('#author').value,
          pages: document.querySelector('#page-number').value,
          read: true
      };
        myLibrary.push(Book);

        Library.innerHTML = '';

      myLibrary.forEach(function(book) {
      let bookDiv = document.createElement('div');
      bookDiv.classList.add("book");
      bookDiv.setAttribute('data-id', book.id);
      let removeBtn = document.createElement('button');
      removeBtn.classList.add('remove-button');
      removeBtn.textContent = 'Delete';
      
      
      bookDiv.innerHTML = `
        <p>"${book.title}"</p>
        <p> by ${book.author}</p>
        <p>${book.pages} Page(s)</p>
      `;

       // This is chatgpt. I'm still figuring out how it works
      // Deletes books from the page and the local storage
      removeBtn.addEventListener('click', () => {
          let storedLibrary = JSON.parse(localStorage.getItem('MyBooks')) || [];
          storedLibrary = storedLibrary.filter(b => b.id !== book.id);
          localStorage.setItem('MyBooks', JSON.stringify(storedLibrary));
          location.reload(); // Force refresh after delete
        });


        let readOrNot = document.createElement('button');
      readOrNot.classList.add('remove-button');
      readOrNot.textContent = 'Read';
      readOrNot.textContent = book.read ? 'Read' : 'Not Read';


      readOrNot.addEventListener('click', ()=> {
        if (readOrNot.textContent === 'Read') {
          book.read = false;
          readOrNot.textContent = 'Not Read';
          localStorage.setItem('MyBooks', JSON.stringify(myLibrary));
        }
        else if (readOrNot.textContent === 'Not Read') {
          book.read = true;
          readOrNot.textContent = 'Read';
          localStorage.setItem('MyBooks', JSON.stringify(myLibrary));
        };
      });
      
      Library.appendChild(bookDiv);
      bookDiv.appendChild(removeBtn);
      bookDiv.appendChild(readOrNot);
      })
      Form.reset(); // Reset the form
      // console.table(myLibrary);

      // Locally Stores the objects in myLibrary as JSON string 
      localStorage.setItem('MyBooks', JSON.stringify(myLibrary))
      
})

}



  // Lets the browser re-create previous html and objects after refresh
  // Basically save the page/ Library so you can keep adding to it
document.addEventListener('DOMContentLoaded', () => {
  const storedLibrary = localStorage.getItem('MyBooks');
  if (storedLibrary) {
    const loadedBooks = JSON.parse(storedLibrary);
    myLibrary.push(...loadedBooks); // populate the main array

    loadedBooks.forEach(function(book) {
      let bookDiv = document.createElement('div');
      bookDiv.classList.add("book");
      bookDiv.setAttribute('data-id', book.id);
        let removeBtn = document.createElement('button');
      removeBtn.classList.add('remove-button');
      removeBtn.textContent = 'Delete';  

      bookDiv.innerHTML = `
        <p>"${book.title}"</p>
        <p> by ${book.author}</p>
        <p>${book.pages} Page(s)</p>
      `;

      // This is chatgpt. I'm still figuring out how it works
      // Deletes books from the page and the local storage
      removeBtn.addEventListener('click', () => {
          let storedLibrary = JSON.parse(localStorage.getItem('MyBooks')) || [];
          storedLibrary = storedLibrary.filter(b => b.id !== book.id);
          localStorage.setItem('MyBooks', JSON.stringify(storedLibrary));
          location.reload(); // Force refresh after delete
        });

        let readOrNot = document.createElement('button');
      readOrNot.classList.add('remove-button');
      readOrNot.textContent = 'Read';
      readOrNot.textContent = book.read ? 'Read' : 'Not Read';


      readOrNot.addEventListener('click', ()=> {
        if (readOrNot.textContent === 'Read') {
          book.read = false;
          readOrNot.textContent = 'Not Read';
          localStorage.setItem('MyBooks', JSON.stringify(myLibrary));
        }
        else if (readOrNot.textContent === 'Not Read') {
          book.read = true;
          readOrNot.textContent = 'Read';
          localStorage.setItem('MyBooks', JSON.stringify(myLibrary));
        };
      });
       console.log(bookDiv.dataset.id);
      Library.appendChild(bookDiv);
      bookDiv.appendChild(removeBtn);
      bookDiv.appendChild(readOrNot);
      
    });
  }

  addBook()
})

