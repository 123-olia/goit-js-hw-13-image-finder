import apiService from './apiService';
import imageTemplate from '../templates/image-card.hbs';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('#gallery'),
  button: document.querySelector('#load-more'),
};

refs.form.addEventListener('submit', searchForm);
refs.button.addEventListener('click', loadMore);

function searchForm(e) {
  e.preventDefault();
  clearListItems();
  apiService.resetPage();

  const inputValue = e.currentTarget.elements.query.value;
  console.log(inputValue);
  apiService.searchQuery = inputValue;
  console.log(apiService.query);

  apiService.fetchImages().then(images => buildListItems(images));
  // const builder = async () => {
  //   try {
  //     const getImage = await apiService.fetchImages();
  //     const buildList = await buildListItems(getImage);
  //     // return buildList;
  //   } catch (error) {
  //     console.log('Error in function searchForm');
  //   }
  // };
  // builder();
}

function buildListItems(images) {
  const markup = imageTemplate(images);
  console.log(imageTemplate(images));
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function loadMore(e) {
  apiService.fetchImages().then(images => buildListItems(images));
}

function clearListItems() {
  refs.gallery.innerHTML = '';
}
