// api key: jPowzdHK080lNuuoMN0yMWol9

const feature = document.querySelector(".search--parks");
const featureButton = document.querySelector("#request--parks");
const resultsGoHere = document.querySelector("#parksContainer");

const findFeature = feature => {
  fetch("https://data.nashville.gov/resource/xbru-cfzi.json")
    .then(parks => parks.json())
    .then(parkListing => {
      const parksWithFeature = [];
      let strResult = "";
      parkListing.forEach(element => {
        const strFeature = feature.replace(/ /i, "_");
        const features = Object.keys(element);
        result = features.find(key => key.includes(strFeature));
        if (result === undefined) {
          strResult = "";
        } else if (`${element[result]}` === "Yes") {
          parksWithFeature.push(element);
          strResult = result.replace(/_/i, " ");
        }
      });
      makeparksHTML(parksWithFeature, strResult);
      listenFactory(parksWithFeature);
    });
};

const makeparksHTML = (featureParksArray, result) => {
  let HTMLsquirt = "";
  let idCounter = 0;
  if (result === "") {
    HTMLsquirt += "<p>No results found 🤷</p>";
  } else {
    HTMLsquirt += `<h4>These parks have ${result} available.</h4>`;
    featureParksArray.forEach(element => {
      HTMLsquirt += `<p>${element.park_name}</br>${
        element.mapped_location_address
      } <button id="${idCounter}_park">Save To Itinerary</button></p>`;
      idCounter++;
    });
  }
    resultsGoHere.innerHTML = HTMLsquirt;
    document.querySelector("#restaurantContainer").innerHTML = "";
    document.querySelector("#meetupContainer").innerHTML = "";
    document.querySelector("#concertContainer").innerHTML = "";
};

const listenFactory = featureParksArray => {
  resultsGoHere.addEventListener("click", function() {
    const clickID = event.target.id;
    const buttonType = clickID.split("_");
    if (buttonType[1] === "park") {
      const element = featureParksArray[buttonType[0]];
      const chosenPark = element.park_name;
      console.log(chosenPark);
      let parkDom = `<p>Park: ${chosenPark}</p>`;
      document.querySelector("#parksItinerary").innerHTML = parkDom;
    }
  });
};

// https://data.nashville.gov/resource/xbru-cfzi.json?park_name=${chosenPark}

featureButton.addEventListener("click", function() {
  findFeature(feature.value);
});
