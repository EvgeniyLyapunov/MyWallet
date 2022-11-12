"use strickt";

import {postData} from "./../../services/dataBaseQueries";

function regSubmit(formSelector, btnSelector, urlPath) {
  const form = document.querySelector(formSelector),
        submit = document.querySelector(btnSelector);
  
  submit.addEventListener("click", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const json = JSON.stringify(Object.fromEntries(formData.entries()));

    //console.log(Object.fromEntries(formData.entries()));

    // let answer = await postData(urlPath, json);

  })
}

export default regSubmit;