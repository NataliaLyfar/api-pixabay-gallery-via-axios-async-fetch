import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27183497-70bd3599297502793f5a9350a';
const url = `${BASE_URL}?key=${API_KEY}`;

export const fetchPicsOptions = {
        q: '',
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 40,
};

export const fetchPics = async(params) => await axios.get(url, {params}).catch((e)=>console.error(e))



  
 