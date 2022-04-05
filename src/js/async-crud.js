const BASE_URL = 'http://localhost:4040';

async function addBook(book) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  };

  const response = await fetch(`${BASE_URL}/books`, options);
  const newBook = await response.json();

  return newBook;     // или просто return await response.json(); 
}


// Ошибку в async будем обрабатывать во внешнем коде try...catch

async function addBookAndUpdateUI() {
  try {
    const book = await addBook({});
    console.log(book);
  } catch (error) {
    console.log(error);
  }
}

addBookAndUpdateUI();
//----------------------------------------------------------------------
// addBook(book).then().catch(); 
// Если addBook(book) вызываем сами по себе, то она возвращает промис и тогда исп-ть then() и catch()

// Вне тела ф-ии исп-ем then() и catch(), а внутри ф-ии - сделаем async и исп-ся try...catch
async function fetchBooks() {
  const response = await fetch(`${BASE_URL}/books`)

  const books = await response.json()
  return books;
}

async function fetchBookById(bookId) {
  const response = await fetch(`${BASE_URL}/books/${bookId}`);
  const book = await response.json();
  return book;
}


async function removeBook(bookId) {
  const url = `${BASE_URL}/books/${bookId}`;
  const options = {
    method: 'DELETE',
  };

  const response = await fetch(url, options);
  return book;
}


async function updateBookById(update, bookId) {
  const options = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(update),
  };

  const response = await fetch(`${BASE_URL}/books/${bookId}`, options);
  const book = response.json();
  return book;
}
