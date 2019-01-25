// api key: jPowzdHK080lNuuoMN0yMWol9

const feature = document.querySelector(".search--parks");
const featureButton = document.querySelector("#request--parks");
const resultsGoHere = document.querySelector("#results--container");

const findFeature = feature => {
    fetch("https://data.nashville.gov/resource/xbru-cfzi.json")
        .then(parks => parks.json())
        .then(parkListing => {
            const parksWithFeature = [];
            parkListing.forEach(element => {
                const features = Object.keys(element);
                const result = features.find(key => key.includes(feature));
                if (`${element[result]}` === "Yes") {
                    parksWithFeature.push(element);
                }
            });
            makeparksHTML(parksWithFeature);
        });
};

const makeparksHTML = featureParksArray => {
    let HTMLsquirt = "";
    featureParksArray.forEach(element => {
        HTMLsquirt += `<p>${element.park_name}</p>`
    });
    resultsGoHere.innerHTML = HTMLsquirt;
}

featureButton.addEventListener("click", function() {
    findFeature(feature.value);
});
