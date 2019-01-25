let containerEl = document.querySelector("#results--container")

document.getElementById("request--food").addEventListener("click", function () {
    containerEl.innerHTML = ""
    search = document.querySelector(".search--food").value
    fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=${search}&sort=rating&apikey=32e7ff95eabcfcc0019eb633902941bc`)
        .then(restaurants => restaurants.json())
        .then(parsedRestaurants => {
            if (parsedRestaurants.restaurants.length > 0) {
            parsedRestaurants.restaurants.forEach(restaurant => {
                let htmlElement = htmlFactory(restaurant)
                postToResultsDom(htmlElement)
            });
        } else {
            containerEl.innerHTML += "<h2><em>No results found</em> 🤷‍♀️</h2>"
        }
        })
})

let htmlFactory = (restaurant) => {
    let id = restaurant.restaurant.id
    let name = restaurant.restaurant.name
    let cuisines = restaurant.restaurant.cuisines
    let address = restaurant.restaurant.location.address
    let rating = restaurant.restaurant.user_rating.aggregate_rating

    return `
    <div class="restaurant--results--card">    
        <h3>${name}</h3>
        <p>Rating: ${rating}</p>
        <p>Cuisine: ${cuisines}</p>
        <p>Address: ${address}</p>
        <button id="${id}">SAVE</button>
    </div>
    `
}

let itineraryHTML = () => {
    return `<div class="restaurant--itinerary--card">Restaurant: ${name}</div>`
}

let postToResultsDom = (htmlElement) => {
    containerEl.innerHTML += htmlElement
}

