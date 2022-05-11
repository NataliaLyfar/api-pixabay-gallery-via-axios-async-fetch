import {createGallery, initialData} from '../index.js';
import {fetchPics, fetchPicsOptions} from './fetchpixabay';

export const observer = new IntersectionObserver((entries, observer) => {
    const { hits, totalHits} = initialData;
    const lastCard = entries[0];
    if (!lastCard.isIntersecting || hits.length === totalHits) return;
    observer.unobserve(lastCard.target);
    fetchPicsOptions.page++;
    createGallery();
  });