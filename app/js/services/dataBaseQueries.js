"use strickt";

async function postData(urlPath, json) {
  let result = await fetch(urlPath, {
    method: "POST",
    body: json,
    headers: { "Accept": "application/json", "Content-Type": "application/json;charset=utf-8" }
  });
  return await result.json();
}

async function getData(urlPath) {
  let result = await fetch(urlPath);
  return await result.json();
}

export {postData};
export {getData};
