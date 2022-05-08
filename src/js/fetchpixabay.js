import axios from "axios";
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27183497-70bd3599297502793f5a9350a';
const options = {
        "image_type": "photo",
        "orientation": "horizontal",
        "safesearch": true,
        "per_page": 20, 
}
const initialData = {
  query: null,
  totalHits: 0,
  page: 1,
  hits: [],
};
export const fetchPics = async(query) => {
  const { hits } = initialData;
  const arrayOfPromises = hits.map(async (hit) => {
  const response = await axios.get(BASE_URL,{
      params: {
        "key": API_KEY,
        "q": query,
        "page": page,
        ...options
      } 
    });
    return response.json();
  });
  page +=1;
  const pics = await Promise.all(arrayOfPromises);
  return pics;
  }
  
 