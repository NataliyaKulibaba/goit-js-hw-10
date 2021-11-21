'use strict'
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import NewsApiService from './fetchCountries';
import countriesList from './countries-list.hbs';
import countriesDetailList from './countries-detail-list.hbs';
let debounce = require('lodash.debounce');


const searchFormEl = document.getElementById('search-box');
const listOfCountriesEl = document.querySelector('.country-list');

const newsApiService = new NewsApiService();
const DEBOUNCE_DELAY = 300;


searchFormEl.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY));


function searchCountries(evt) {
  evt.preventDefault();
  
  newsApiService.name = searchFormEl.value.trim();
  console.log(newsApiService.name);

  newsApiService.fetchCountries() 
    .then(createMarkup)
    .catch(onFetchError)
}


function onFetchError(error) {
  listOfCountriesEl.innerHTML = '';
  Notify.failure('Oops, there is no country with that name')
}


function createMarkup(countries) {
  
  if (countries.length > 10) {
    return Notify.info('Too many matches found. Please enter a more specific name.')
  }
 
  if (countries.length > 1) {
    let markup = countriesList(countries);
    return listOfCountriesEl.innerHTML = markup;
  }

  if (countries.length === 1) {
    let markupDetails = countriesDetailList(countries);
    return listOfCountriesEl.innerHTML = markupDetails;
  }
  }
  

