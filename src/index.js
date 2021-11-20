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
  console.log('CATCH');
  listOfCountriesEl.innerHTML = '';
  Notify.failure('Oops, there is no country with that name')
  
}

function createMarkup(countries) {
  console.log(countries);
  // let markup = countriesList(countries);;
  // let markupDetails = countriesDetailList(countries);
  
  if (countries.length > 10) {
    return Notify.info('Too many matches found. Please enter a more specific name.')
  }
 
  if (countries.length > 1) {
    let markup = countriesList(countries);
    return listOfCountriesEl.innerHTML = markup;
  }

  if (countries.length === 1) {
    // const ru = countries.languages.reduce((acc, language, index) => {return index===0? acc +  language.name: acc +', '+  language.name;  } , '');
    // console.log(ru);
 

    let markupDetails = countriesDetailList(countries);
    // markup += markupDetails;
      return listOfCountriesEl.innerHTML = markupDetails;
  }
  
  // return listOfCountriesEl.innerHTML = markup;
  // return listOfCountriesEl.insertAdjacentHTML('beforeend',markup);
  }


// function createmarkup(countries) {

//   let markup = '';
//   console.log(...countries)
//   console.log(countries.length)

//   if (countries.length > 10) {
//     return Notify.info('Too many matches found. Please enter a more specific name.')
//   }
//   if (countries.length > 1) {
//     markup = [...countries].map(({ name, flags }) => {
//       return `
//    <img src =${ flags}/><h2>${name}</h2>
//   `
//     })
//   }
//   else {
//     markup = [...countries].map(({ flags, name, capital, population, languages }) => {
//       console.log(...languages)
//       return ` <img src =${ flags}/><h2>${name}</h2>
//   <ul>
//     <li> Capital: ${capital}</li>
//     <li> Population: ${population}</li>
//     <li> Languages: ${languages}</li>
//   </ul>
//   `
//     })
//   }
    
//   console.log(markup)
//   listOfCountriesEl.innerHTML = markup.join('');
   
//  }
