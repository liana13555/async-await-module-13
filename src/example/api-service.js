import axios from 'axios';

// axios.defaults.baseUrl = 'https://pixabay.com/api/';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22568340-3d930d703d1ad37110880a9ab';

export default class PhotoApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 10;
    }

    async fetchPictures() {
        const url = `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&page=${this.page}&per_page=${this.per_page}`;

        const response = await axios.get(url);
        this.incrementPage()
        return response.data;

        // return fetch(url)
        // .then(response => response.json())
        // .then((data) => {
        //     this.incrementPage();
        //     return data;
        // });
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}