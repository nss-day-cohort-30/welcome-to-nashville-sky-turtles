// api key: jPowzdHK080lNuuoMN0yMWol9

const feature = document.querySelector(".search--parks");
const featureButton = document.querySelector("#request--parks");

const findFeature = feature => {
    if (feature != "") {
        fetch("https://data.nashville.gov/resource/xbru-cfzi.json")
        .then(parks => parks.json())
        .then(parkListing => {
//            console.log(parkListing[0]);

            const parksWithFeature = [];
            parkListing.forEach(element => {
                const features = Object.keys(element);
                const result = features.find(
                    key => key.includes(feature)
                )
                console.log(`${element[result]}`);
                if (`${element[result]}` === "Yes") {
                    parksWithFeature.push(element);
                }
            });
            console.log(parksWithFeature);
        })
    }
}

featureButton.addEventListener("click", function () {
//    console.log(feature.value);
    findFeature(feature.value);
});