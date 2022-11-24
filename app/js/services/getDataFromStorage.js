'use strict';

function getDataFromStorage() {
  let data = [];

  if(localStorage.getItem('userData')) {
    if(localStorage.getItem('balanceData')) {
      data =JSON.parse(localStorage.getItem('balanceData'));
    } else {
      data = [];
    }
  } else if(sessionStorage.getItem('userData')) {
    if(sessionStorage.getItem('balanceData')) {
      data =JSON.parse(sessionStorage.getItem('balanceData'));
    } else {
      data = [];
    }
  }

  return data;
}

export default getDataFromStorage;