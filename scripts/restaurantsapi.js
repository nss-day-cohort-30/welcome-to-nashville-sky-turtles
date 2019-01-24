fetch("https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=nashville&apikey=32e7ff95eabcfcc0019eb633902941bc")
    .then(restaurants => restaurants.json())
    .then(parsedRestaurants => {
        parsedRestaurants.restaurants.forEach(restaurant => {
            let name = restaurant.restaurant.name
            let cuisines = restaurant.restaurant.cuisines
            let address = restaurant.restaurant.location.address
            let rating = restaurant.restaurant.user_rating.aggregate_rating
            console.log(`Name: ${name} Rating: ${rating} Cuisines: ${cuisines} Address: ${address}`)
        });
    })

let htmlFactory = () => {
    return `
    <div>    
        <h3>${name}</h3>
        <p>${rating}</p>
        <p>${cuisines}</p>
        <p>${address}</p>
    </div>
    `
}

document.getElementById("request--food").addEventListener("click", function () {
    searchRequest = document.querySelector(".search--food").value
    console.log(searchRequest)
})