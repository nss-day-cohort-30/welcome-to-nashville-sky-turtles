// api key: jPowzdHK080lNuuoMN0yMWol9

const feature = document.querySelector(".search--parks").textContent;
const featureButton = document.querySelector("#request--parks");

console.log(feature);
const findFeature = feature => {
    if (feature != "") {
        fetch("https://data.nashville.gov/resource/xbru-cfzi.json")
        .then(parks => parks.json())
        .then(parkListing => {
            console.log(parkListing[0]);

            const parksWithFeature = [];
            parkListing.forEach(element => {
                const features = Object.keys(element);
                const result = features.find(
                    key => key.includes(feature)
                )
                if (`element.${result}` === "Yes") {
                    parksWithFeature.push(element);
                }
                console.log(result);
                console.log(parksWithFeature);
            });
        })
    }
}

featureButton.addEventListener("click", findFeature(feature));