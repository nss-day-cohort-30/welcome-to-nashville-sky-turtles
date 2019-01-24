// api key: jPowzdHK080lNuuoMN0yMWol9

const feature = document.querySelector(".search--parks");
const featureButton = document.querySelector


fetch("https://data.nashville.gov/resource/xbru-cfzi.json")
    .then(parks => parks.json())
    .then(parkListing => {
        console.log(parkListing[0]);
    })

const findFeature = feature => {
    parkListing.forEach(element => {
        const features = Object.keys(element);
        const result = features.find(
            key => key.includes(feature)
        )
        console.log(result);
    });
}