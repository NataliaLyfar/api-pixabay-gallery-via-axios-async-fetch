import './sass/main.scss';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchPixabay } from './js/fetchpixabay.js';
import photoCardTpl from './partials/photocard.hbs';
import { refs } from './js/refs.js';

const galleryLigthbox = new SimpleLightbox(".gallery a", {
    captionDelay: 250,
  });

const initialData = {
    query: null,
    totalHits: 0,
    page: 1,
    hits: [],
  };
const dataCard = {
    previewURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  };

const renderCards = cards =>{
    cards.map((...dataCard) => photoCardTpl(...dataCard)).join('');
    galleryLigthbox.refresh();
}
// const renderCountryCard = (countries) => {
//     const countriesQuantity = countries.length;
//     if(countriesQuantity > 10){
//         refs.countryInfo.innerHTML = '';
//         refs.countryList.innerHTML = '';
//         Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
//     }
//     else if(countriesQuantity > 1 && countriesQuantity <= 10){
//         refs.countryInfo.innerHTML = '';
//         refs.countryList.innerHTML  = createCountryList(countries);
//     } 
//     else if(countriesQuantity === 1){
//         refs.countryList.innerHTML = '';
//         refs.countryInfo.innerHTML = countryCardTpl(countries[0]);
//     }
//         };
// const onFetchError = () => {
//     Notiflix.Notify.failure('Oops! There is no country with that name!');
//     refs.countryInfo.innerHTML = '';
//     refs.countryList.innerHTML = '';
// };
// const clearInput = () => refs.countryInfo.innerHTML = '';

const onSearch = e => {
    e.preventDefault;
    const {
        elements: { searchQuery }
    } = e.currentTarget;
    initialData.query = searchQuery.value.toLowerCase().trim();
    const {query} = initialData;
    renderGallery();
   
//    if(query.length){
//    refs.gallery.innerHTML = "";
//     page = 1;
//     renderGallery();

// }
};
refs.searchBtn.addEventListener('submit', onSearch);
