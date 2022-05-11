import './sass/main.scss';
import {Notify} from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import "regenerator-runtime/runtime.js";

import { refs } from './js/refs.js';
import { fetchPics, fetchPicsOptions } from './js/fetchpixabay.js';
import {observer}  from './js/observer.js';
import onScroll from './js/onScroll.js';
import picCardTpl from './template/picCard.hbs';

export const initialData = {
  totalHits: 0,
  hits: [],
};

const galleryLigthbox = new SimpleLightbox(".gallery a", {captionDelay: 200});
const renderGallery = hits => {
refs.gallery.insertAdjacentHTML('beforeend', picCardTpl(hits));
galleryLigthbox.refresh();
};

export const createGallery = async() => {
await fetchPics(fetchPicsOptions)
.then(({data}) => {
  const {totalHits, hits} = data;
  if(totalHits || hits.length){
    if(fetchPicsOptions.page===1){
    Notify.success(`Hooray! We found ${totalHits} images.`);
  }
  initialData.hits = hits;
  renderGallery(hits);
  observer.observe(document.querySelector(".gallery-item:last-child"));
  }
  else {Notify.info("Sorry, there are no images matching your search query. Please try again.");}
})
};

const onSearch = (e) => {
  e.preventDefault();
  
  const {elements: { searchQuery }} = e.currentTarget;
  fetchPicsOptions.q = searchQuery.value.toLowerCase().trim();
  if (fetchPicsOptions.q === '') {
    refs.gallery.innerHTML = "";
    Notify.failure('There is nothing to search!');
  }
  if(fetchPicsOptions.q.length){
    refs.gallery.innerHTML = "";
    fetchPicsOptions.page = 1;
    createGallery();
  }
};

refs.searchForm.addEventListener('submit', onSearch);

