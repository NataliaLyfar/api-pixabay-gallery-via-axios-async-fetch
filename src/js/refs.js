export const refs = {
   searchForm: document.querySelector('.search-form'),
   searchBtn: document.querySelector('button'),
   gallery: document.querySelector('.gallery'),
   body: document.querySelector('body'),

   initialData: {
      query: null,
      totalHits: 0,
      page: 1,
      hits: [],
    }
};
