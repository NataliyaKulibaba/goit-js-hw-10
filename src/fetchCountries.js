export default class NewsApiService {
  constructor() {
    this.searchCountry = '';
    
  }
  fetchCountries() {
    const BASE_URL = 'https://restcountries.com/v2';
    return fetch(`${BASE_URL}/name/${this.searchCountry}?fields=name,capital,population,flags,languages`)
      .then(response => {
        if (!response.ok) {
          console.log(response)
          throw new Error(response.status);
        }
        return response.json();
      });
  }
  
  get name() {
    return this.searchCountry;
  }

  set name(newName) {
    return this.searchCountry = newName;
  }
}










// export default { fetchCountries };

// const BASE_URL = 'https://restcountries.com/v2';
// // let flags = "https://restcountries.com/data/per.svg",



// function fetchCountries(name) {

    
//     console.log(name)
//   // return fetch(`${BASE_URL}/name/${name}`)
//     return fetch(`${BASE_URL}/name/${name}?fields=name,capital,population,flags,languages`)
//       //  fetch(`${BASE_URL}/name/${name}?fields ={name},{capital},{population},{languages},{flags.svg}`)
//     .then(response => {
//       return response.json();
    
//   })
// }
  