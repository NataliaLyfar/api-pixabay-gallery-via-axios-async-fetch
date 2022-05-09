import { refs } from './refs.js';
import {createGallery} from '../index.js';

export const observer = new IntersectionObserver((entries, observer) => {
    const { hits, totalHits } = refs.initialData;
    const lastCard = entries[0];
    if (!lastCard.isIntersecting || hits.length === totalHits) return;
    observer.unobserve(lastCard.target);
    refs.initialData.page++;
    createGallery();
  });