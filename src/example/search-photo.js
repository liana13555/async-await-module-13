import pictureCard from './templates/picture.hbs';
import PhotoApiService from './api-service';
import getRefs from './get-refs';
import LoadMoreBtn from './components/load-more-btn';
import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
// import '../../node_modules/simplelightbox/src/simple-lightbox.scss'


const photoApiService = new PhotoApiService();
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});
const refs = getRefs();
const lightbox = new SimpleLightbox('.photo-card a');

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', loadMore);

function onSearch(e) {
    e.preventDefault();
    photoApiService.query = e.currentTarget.elements.searchQuery.value;

    if (photoApiService.query === '') {
        return onFetchError();
    }

    loadMoreBtn.show();
    photoApiService.resetPage();
    clearPhotoContainer();
    fetchPhotos();
}

async function fetchPhotos() {
    loadMoreBtn.disable();
    try {
        const response = await photoApiService.fetchPictures().then(data => {
            renderPhotoCard(data.hits);
            if (data.hits.length === 0) {
                loadMoreBtn.hide();
                return onFetchError();
            } else {
                Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
                loadMoreBtn.enable();
            }
        });
    } catch (error) {
        console.log(error);
    }
}

async function loadMore() {
    loadMoreBtn.disable();
    try {
        const response = await photoApiService.fetchPictures().then(data => {
            renderPhotoCard(data.hits);
            loadMoreBtn.enable();

            const totalPicturesOnPage = refs.photoContainer.querySelectorAll('.photo-card').length;
            // console.log(totalPicturesOnPage);
            if (data.totalHits <= totalPicturesOnPage) {
                Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
                loadMoreBtn.hide();
            }
        });

    } catch (error) {
        console.log(error);
    }

    const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}

function renderPhotoCard(pictures) {
    refs.photoContainer.insertAdjacentHTML('beforeend', pictureCard(pictures));
    lightbox.refresh();
}

function clearPhotoContainer() {
    refs.photoContainer.innerHTML = '';
}

function onFetchError(error) {
    Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}

