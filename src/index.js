import './sass/main.scss';
import {Notify} from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import "regenerator-runtime/runtime.js";

import { refs } from './js/refs.js';
import { fetchPics } from './js/fetchpixabay.js';
import {observer}  from './js/observer.js';
import { scrollToTop, toggleBtnAction } from './js/onScroll.js';
import picCardTpl from './partials/picCard.hbs';

const galleryLigthbox = new SimpleLightbox(".gallery a", {captionDelay: 200});

const renderGallery = hits => {
refs.gallery.insertAdjacentHTML('beforeend', picCardTpl(hits));
galleryLigthbox.refresh();
};

export const createGallery = async () => {
  const { query, page, } = refs.initialData;
  await fetchPics(query, page)
  .then((res) => {
    const { data } = res;
    if(data.hits.length){
      if(page===1){
      Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
   refs.initialData.hits = data.hits;
   renderGallery(data.hits);
   observer.observe(document.querySelector(".photo-card:last-child"));
    }
    else {Notify.failure("Sorry, there are no images matching your search query. Please try again.");}
  })
};

const onSearch = (e) => {
  e.preventDefault();
  const {elements: { searchQuery }} = e.currentTarget;
  refs.initialData.query = searchQuery.value.toLowerCase().trim();
  if (refs.initialData.query === '') {
    Notify.failure('There is nothing to search!');
    refs.gallery.innerHTML = "";
  }
  if(refs.initialData.query.length){
    refs.gallery.innerHTML = '';
    refs.initialData.page = 1;
    createGallery();
  }
};

refs.searchForm.addEventListener('submit', onSearch);
toggleBtnAction();
scrollToTop();
