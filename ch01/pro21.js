//fetch API
import fetch from 'node-fetch';
globalThis.fetch = fetch;

async function getData() {
  let rawResponse = await fetch('https://jsonplaceholder.typicode.com/posts');
  let jsonResponse = await rawResponse.json();
  console.log(jsonResponse);
}

getData();
