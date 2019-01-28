let containerEl = document.querySelector("#restaurantContainer")
let allRestaurants = null
let restaurantItineraryName = ""
const foodApiKey = config.foodKey



//FETCH on request
document.getElementById("request--food").addEventListener("click", function () {
    containerEl.innerHTML = ""
    search = document.querySelector(".search--food").value
    fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=${search}&sort=rating&apikey=${foodApiKey}`)
        .then(restaurants => restaurants.json())
        .then(parsedRestaurants => {
            allRestaurants = parsedRestaurants
            if (allRestaurants.restaurants.length > 0) {
                allRestaurants.restaurants.forEach(restaurant => {
                    let htmlElement = htmlFactory(restaurant)
                    postToResultsDom(htmlElement)

                })
            } else {
                containerEl.innerHTML += "<p>No results found 🤷‍♀️</p>"
            }
        })
    })

//HTML factory for search results
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
        <button class="save__button" id="${id}">Save To Itinerary</button>
        </div>
        `

}
//HTML factory for itinerary HTML
let itineraryHTML = (name) => {
    return `Restaurant: ${name}`
}

//post to results DOM
let postToResultsDom = (htmlElement) => {
    containerEl.innerHTML += htmlElement
}

// post to itinerary DOM
postToItineraryDom = (itineraryHTML) => {
    let itineraryContainerEL = document.getElementById("restaurantItinerary")
    itineraryContainerEL.innerHTML = itineraryHTML
}

//Save button
    document.querySelector("#results--container").addEventListener("click", function () {
        if (event.target.classList.contains("save__button")) {
            let clickID = event.target.id
            fetch(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${clickID}&apikey=${foodApiKey}`)
                .then(restaurant => restaurant.json())
                .then(parsedRestaurant => {
                    let restaurantItineraryName = parsedRestaurant.name
                    console.log(restaurantItineraryName)
                    let itinerary = itineraryHTML(restaurantItineraryName)
                    postToItineraryDom(itinerary)
                })
        }
    })
