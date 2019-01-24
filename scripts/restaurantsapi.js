let containerEl = document.querySelector("#results--container")

document.getElementById("request--food").addEventListener("click", function () {
    containerEl.innerHTML = ""
    search = document.querySelector(".search--food").value
    fetch("https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=" + `${search}` + "&apikey=32e7ff95eabcfcc0019eb633902941bc")
        .then(restaurants => restaurants.json())
        .then(parsedRestaurants => {
            parsedRestaurants.restaurants.forEach(restaurant => {
                let htmlElement = htmlFactory(restaurant)
                postToDom(htmlElement)
            });
        })
})

let htmlFactory = (restaurant) => {
    let name = restaurant.restaurant.name
    let cuisines = restaurant.restaurant.cuisines
    let address = restaurant.restaurant.location.address
    let rating = restaurant.restaurant.user_rating.aggregate_rating

    return `
    <div>    
        <h3>${name}</h3>
        <p>Rating: ${rating}</p>
        <p>Cuisine: ${cuisines}</p>
        <p>Address: ${address}</p>
    </div>
    `
}

let postToDom = (htmlElement) => {
    containerEl.innerHTML += htmlElement
}

