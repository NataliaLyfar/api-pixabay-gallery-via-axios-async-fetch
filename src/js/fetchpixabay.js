import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '27183497-70bd3599297502793f5a9350a';
const options = {
        "image_type": "photo",
        "orientation": "horizontal",
        "safesearch": true,
        "per_page": 20,
        
}

export async function fetchPixabay(value) {
    try {
      const response = await axios.get(BASE_URL,{
          params: {
            "key": API_KEY,
            "q": value,
            "page": 1,
            ...options
          } 
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }