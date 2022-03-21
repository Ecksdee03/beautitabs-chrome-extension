const UNSPLASH_ACCESS_KEY = 'SS0kjGA_d4ajkXhFj6QITCyoObJ4fRaoY8fyQvbecBQ'

// Checks if API response has a status code of 200 OK
function checkError(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
}

//Fetches & receives the json file of Unsplash random photo
async function getRandomPhoto() {

  const endpoint = 'https://api.unsplash.com/photos/random?orientation=landscape';

  // Creates a new Headers object.
  const headers = new Headers();
  // Set the HTTP Authorization header for authorisation to the endpoints
  headers.append('Authorization', `Client-ID ${UNSPLASH_ACCESS_KEY}`);

  let response = await fetch(endpoint, { headers });
  const jsonResponse = await checkError(response).json();
    // Fetch the raw image data - base image URL which we can add parameters
    // q - compression quality
    // w - image width
  response = await fetch(jsonResponse.urls.raw + '&q=85&w=2000')
    //blob object represents the binary image data
  jsonResponse.blob = await checkError(response).blob();
  return jsonResponse;
  } 

async function nextImage() {
  try {
    const image = await getRandomPhoto();
    console.log(image);
    const fileReader = new FileReader();
    //converts image blob to encoded 64 string
    //so data fetched faster from local storage instead of from server 
    fileReader.readAsDataURL(image.blob);
    //load is activated when read is completed
    fileReader.addEventListener('load', event => {
      //result is the base64 string that is stored on image object's base64 property
      const {result} = event.target;
      image.base64 = result;
      chrome.storage.local.set({nextImage: image}, () => {
      if (chrome.runtime.error) {
        console.log('Error setting');
      }
    });
  });
  } catch (err) {
    console.log(err);
  }
}

// Execute function when the extension is installed
chrome.runtime.onInstalled.addListener(nextImage);
//communication from content to background scripts: to randomise images 
//each time new tab is loaded
chrome.runtime.onMessage.addListener((request) => {
  if (request.command === 'next-image') {
    nextImage();
  }
});