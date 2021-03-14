import './styles.css';
const debounce = require('lodash.debounce');

import { notice, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import fetchCountries from './js/fetchCountries.js';
import coutryEl from './templates/countryTemp.hbs';

const innerCountry = document.querySelector('.inner_country');
const input = document.querySelector('#input');
const listCountries = document.querySelector('.list_countries');

function createCountry(e) {
  listCountries.innerHTML = '';
  innerCountry.innerHTML = '';

  function makeMarkup() {
    fetchCountries(e.target.value)
      .then(data => {
        data.forEach(el => {
          if (data.length > 1) {
            let liEl = '';
            liEl += `<li class="item_countries">${el.name}</li>`;
            listCountries.insertAdjacentHTML('beforeend', liEl);

            innerCountry.innerHTML = '';

            listCountries.addEventListener('click', e => {
              console.log(e.target.textContent);
              if (e.target.textContent === el.name) {
                innerCountry.innerHTML = coutryEl(el);
                listCountries.innerHTML = '';
              }
            });
          } else if (data.length) {
            data.forEach(el => {
              innerCountry.innerHTML = coutryEl(el);
            });
          }
        });
      })
      .catch(errorMessae);
  }

  function notification() {
    notice({
      text: ' Введите больше символов',
      delay: 2000,
    });
  }

  function errorMessae() {
    error({
      text: 'Такой страны не существует',
      delay: 2000,
    });
    input.value = '';
  }

  fetchCountries(e.target.value).then(data => {
    if (data.length !== 0 && data.length > 10) {
      notification();
    } else {
      makeMarkup();
    }
  });
}

input.addEventListener('input', debounce(createCountry, 500));
