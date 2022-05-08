import { refs } from './refs.js';
const rootElement = document.documentElement;

export const onScroll = () => {
    const { height: cardHeight } = refs.gallery.firstElementChild.getBoundingClientRect();
  
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  };
  const toggleBtnAction = () => {
    const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  if (rootElement.scrollTop / scrollTotal > 0) {
    // Show button
    scrolltop.classList.add("showBtn");
  } else {
    // Hide button
    scrolltop.classList.remove("showBtn");
  }
  };
  
  window.addEventListener('scroll', toggleBtnAction);
  
  export const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

