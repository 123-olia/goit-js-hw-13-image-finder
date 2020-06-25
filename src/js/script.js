import apiService from './apiService';
import imageTemplate from '../templates/image-card.hbs';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('#gallery'),
  button: document.querySelector('#load-more'),
};

refs.form.addEventListener('submit', searchForm);
refs.button.addEventListener('click', loadMore);
// refs.button.addEventListener('click', scrollTo);

function searchForm(e) {
  e.preventDefault();
  clearListItems();
  apiService.resetPage();

  const inputValue = e.currentTarget.elements.query.value;
  console.log(inputValue);
  apiService.searchQuery = inputValue;
  console.log(apiService.query);

  apiService.fetchImages().then(images => buildListItems(images));
}

function buildListItems(images) {
  const markup = images.map(image => imageTemplate(image)).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function loadMore(e) {
  apiService.fetchImages().then(images => buildListItems(images));
  scrollTo();
}

function clearListItems() {
  refs.gallery.innerHTML = '';
}

function scrollTo() {
  window.scrollTo({
    top: 100,
    left: 100,
    behavior: 'smooth',
  });
}
