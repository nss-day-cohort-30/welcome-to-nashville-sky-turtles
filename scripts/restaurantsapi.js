fetch("https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=nashville&apikey=32e7ff95eabcfcc0019eb633902941bc")
.then(restaurants => restaurants.json())
.then(parsedRestaurants => {
    parsedRestaurants.restaurants.forEach(restaurant => {
        console.log(restaurant.restaurant.name)
        console.log(restaurant.restaurant.cuisines)
    });
})

document.getElementById("searchform--food").addEventListener("click", )