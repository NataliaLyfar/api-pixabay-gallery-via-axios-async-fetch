import './sass/main.scss';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import "regenerator-runtime/runtime.js";

import { fetchPics } from './js/fetchpixabay.js';
import photoCardTpl from './partials/photocard.hbs';
import { onScroll } from './js/onScroll.js';
import { refs } from './js/refs.js';

const galleryLigthbox = new SimpleLightbox(".gallery a", {
  captionsData: 'alt',
  captionType: 'alt',
  captionDelay: 200,
});

const initialData = {
  query: null,
  totalHits: 0,
  page: 1,
  hits: [],
};
const createGallery = hits => {
refs.gallery.insertAdjacentHTML('beforeend', photoCardTpl(hits));
galleryLigthbox.refresh();
};
const renderGallery = async () => {
  const { query, page } = initialData;

  await fetchPics(query, page)
    .then((res) => {
      const { data } = res;
      if (data.hits.length) {
        if (page === 1) {
          initialData.totalHits = data.totalHits;
          Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        }
        createGallery(data.hits);
        observer.observe(document.querySelector(".photo-card:last-child"));
        onScroll();
      } else
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    })
    .catch((e) => console.error(e));
};
const observer = new IntersectionObserver((entries, observer) => {
  const { hits, totalHits } = initialData;
  const lastCard = entries[0];
  if (!lastCard.isIntersecting || hits.length === totalHits) return;

  observer.unobserve(lastCard.target);

  initialData.page++;
  renderGallery();
});

const onSearch = (e) => {
  e.preventDefault();

  const {
    elements: { searchQuery },
  } = e.currentTarget;

  initialData.query = searchQuery.value.trim();
  if (initialData.query === '') {
    return  Notiflix.Notify.failure('There is nothing to search!');
  }
  
    refs.gallery.innerHTML = "";
    initialData.page = 1;
    renderGallery();
};


refs.searchForm.addEventListener('submit', onSearch);

