import './sass/main.scss';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchPixabay } from './js/fetchpixabay.js';
import { refs } from './js/refs.js'

const onSearch = e => {
    e.preventDefault;
   const searchQuery = e.currentTarget.value;
   
    fetchPixabay(searchQuery)
    .then(renderCountryCard)
    .catch(onFetchError);
}
  
// fetchPixabay('cat')
refs.searchBtn.addEventListener('submit', onSearch);
