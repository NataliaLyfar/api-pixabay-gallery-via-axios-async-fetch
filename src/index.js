import './sass/main.scss';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import "regenerator-runtime/runtime.js";

import { fetchPics } from './js/fetchpixabay.js';
import photoCardTpl from './partials/photocard.hbs';
import { refs } from './js/refs.js';

const galleryLigthbox = new SimpleLightbox(".gallery a", {
    captionDelay: 250,
  });

// const initialData = {
//     query: null,
//     totalHits: 0,
//     page: 1,
//     hits: [],
//   };
// // const dataCard = {
// //     previewURL,
// //     largeImageURL,
// //     tags,
// //     likes,
// //     views,
// //     comments,
// //     downloads,
// //   };

// const renderCards = dataCard =>{
//     dataCard.map(({
//       previewURL,
//       largeImageURL,
//       tags,
//       likes,
//       views,
//       comments,
//       downloads,
//     }) => photoCardTpl(data)).join('');
//     galleryLigthbox.refresh();
// }
  const renderPic = (pics) => pics.map((pic) => photoCardTpl(pic))
const renderGallery = () => {
  const markup = pics
    .map(
      (pic) => renderPic(pic)
    )
    .join("");
 refs.gallery.innerHTML = markup;
}



// const renderGallery = async () => {
//   const { query, page } = initialData;

//   await fetchPixabay(query, page)
//     .then((res) => {
//       const { data } = res;

//       if (data.hits.length) {
//         if (page === 1) {
//           initialData.totalHits = data.totalHits;
//           initialData.hits = [];
//           Notify.success(`Hooray! We found ${data.totalHits} images.`);
//         }

//         initialData.hits = initialData.hits.concat(data.hits);
//         renderCards(data.hits);

//         observer.observe(document.querySelector(".photo-card:last-child"));
//       } else
//         Notify.failure(
//           "Sorry, there are no images matching your search query. Please try again."
//         );
//     })
//     .catch((e) => console.error(e));
// };

const onFetchError = () => {
  Notiflix.Notify.failure('Oops! There is no country with that name!');
  // refs.countryInfo.innerHTML = '';
  // refs.countryList.innerHTML = '';
};
const onSearch = async(e) => {
    e.preventDefault;
    const {
        elements: { searchQuery }
    } = e.currentTarget;
    initialData.query = searchQuery.value.toLowerCase().trim();
    const { query } = initialData;
    if (query.length) {
      try {
        const pics = await fetchPics(query);
        renderGallery(pics);
      } catch (error) {
        onFetchError()
      }
    }
}
refs.searchForm.addEventListener('submit', onSearch);

