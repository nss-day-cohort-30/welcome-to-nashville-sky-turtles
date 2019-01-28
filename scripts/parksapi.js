// api key: jPowzdHK080lNuuoMN0yMWol9

//store my queryselector locations in variables to make later changes easier
const feature = document.querySelector(".search--parks");
const featureButton = document.querySelector("#request--parks");
const resultsGoHere = document.querySelector("#parksContainer");

const findFeature = feature => {
  //fetch the whole list of parks since it's short
  fetch("https://data.nashville.gov/resource/xbru-cfzi.json")
    .then(parks => parks.json())
    .then(parkListing => {
      // an empty array to put the parks with the requested feature in
      const parksWithFeature = [];
      // an empty variable to do string transforms on
      let strResult = "";
      parkListing.forEach(element => {
        // my loop says 
          // put underscores instead of spaces
        const strFeature = feature.replace(/ /i, "_");
          // pull all the keys out of one park-object into an array
        const features = Object.keys(element);
          // search that array for the requested feature
        result = features.find(key => key.includes(strFeature));
        if (result === undefined) {
            // if there's no matches return a blank result
          strResult = "";
        } else if (`${element[result]}` === "Yes") {
            // if there is a match, use that to find all the parks with that feature and add them to our blank array
          parksWithFeature.push(element);
            // put spaces instead of underscores on the key we used
          strResult = result.replace(/_/i, " ");
        }
      });
      // spit the array and the key result into our html factory
      makeparksHTML(parksWithFeature, strResult);
      // spit the array into the listener factory
      listenFactory(parksWithFeature);
    });
};

// this is the html factory
const makeparksHTML = (featureParksArray, result) => {
  // make a blank variable for our string
  let HTMLsquirt = "";
  // initiate the counter in order to have unique ids
  let idCounter = 0;
  // if the passed result is empty, add an error notice to the string
  if (result === "") {
    HTMLsquirt += "<h4>No results found 🤷</h4>";
  } else {
    // otherwise, make a header string with the key, then loop
    HTMLsquirt += `<h4>These parks have ${result} available.</h4>`;
    featureParksArray.forEach(element => {
      // for each park-object in the array, make a string with the name and location and add it to the string
      HTMLsquirt += `<p class="park--card">${element.park_name}<br />${element.mapped_location_address} <br /><button id="${idCounter}_park">Save To Itinerary</button></p>`;
      // then increment the counter
      idCounter++;
    });
  }
  // James' function to clear out all the results containers
    clearDivs();
  // then use the variable from up top and our string variable to put our results on the page
    resultsGoHere.innerHTML = HTMLsquirt;
};

// this is the listener factory
const listenFactory = featureParksArray => {
  // listen for clicks on the whole container
  resultsGoHere.addEventListener("click", function() {
    // get the id of the place we clicked
    const clickID = event.target.id;
    // split on any underscores
    const buttonType = clickID.split("_");
    // if the location id contains the string 'park' then
    if (buttonType[1] === "park") {
      // use the unique id to pull the matching park-object out of the array
      const element = featureParksArray[buttonType[0]];
      const chosenPark = element.park_name;
      // turn the needed info into a string
      let parkDom = `<p>Park: ${chosenPark}</p>`;
      // and put it on the dom
      document.querySelector("#parksItinerary").innerHTML = parkDom;
    }
  });
};

// https://data.nashville.gov/resource/xbru-cfzi.json?park_name=${chosenPark}

// this gets the string the user input in the search field and passes it to the correct function to kick all this off!
featureButton.addEventListener("click", function() {
  findFeature(feature.value);
});