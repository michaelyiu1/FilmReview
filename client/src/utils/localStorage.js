export const getSavedFilm = () => {
  const savedFilm = localStorage.getItem('saved_film')
    ? JSON.parse(localStorage.getItem('saved_film'))
    : [];

    console.log(savedFilm + 'local storage here');

  return savedFilm;
};

export const saveFilm = (film) => {
  if (film) {
    localStorage.setItem('saved_film', JSON.stringify(film));
    console.log('saving film');
  } else {
    localStorage.removeItem('saved_film');
  }
};

export const removeBookId = (bookId) => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null;

  if (!savedBookIds) {
    return false;
  }

  const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

  return true;
};
