import './sass/main.scss';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchPixabay } from './js/fetchpixabay.js';
import { refs } from './js/refs.js'

const state = {
    query: null,
    totalHits: 0,
    page: 1,
    hits: [],
  };

const createCountryList = countries => countries.map(country => countryListTpl(country)).join('');
const renderCountryCard = (countries) => {
    const countriesQuantity = countries.length;
    if(countriesQuantity > 10){
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = '';
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
    }
    else if(countriesQuantity > 1 && countriesQuantity <= 10){
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML  = createCountryList(countries);
    } 
    else if(countriesQuantity === 1){
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = countryCardTpl(countries[0]);
    }
        };
const onFetchError = () => {
    Notiflix.Notify.failure('Oops! There is no country with that name!');
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
};
const clearInput = () => refs.countryInfo.innerHTML = '';
const onSearch = e => {
    e.preventDefault;
    const searchQuery = e.currentTarget;
    state.query = searchQuery.value.trim();
    // if (state.query.length) {
    //     galleryBox.innerHTML = "";
    //     state.page = 1;
    //     renderGallery();
    //   }
   if(state.query.length){

    fetchPixabay(e.target.value.trim())
    .then(renderCountryCard)
    .catch(onFetchError);
}
    clearInput();
};
refs.searchIBtn.addEventListener('submit', onSearch);
