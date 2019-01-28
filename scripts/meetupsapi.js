const meetupSearch = document.querySelector("#searchform--meetups")
const place4MeetupResults = document.querySelector("#results--container")
let allEvents = []

const meetupBuilder = event => {
    return `
    <section name="meetup--section" id="meetup--article"> 
    <p>${event.name.text} </p> 
    
    <button id="btn-${event.id}">Save to itinerary</button>
    
    </section>
    `
}

addToDom = (meetupsToDom) => {
    document.querySelector("#results--container").innerHTML += meetupsToDom;
    
}


document.querySelector("#request--meetups").addEventListener("click", function(){
    searchField = document.querySelector(".search--meetups").value 
    console.log("i pushed a button")
    console.log("searchfield", searchField)


    document.querySelector("#results--container").innerHTML = ""
    fetch(`https://www.eventbriteapi.com/v3/events/search/?q=nashville_${searchField}&token=OEA3462VUJJRZA57Z7GC`, {
        headers: {
            "Authorization": "Bearer OEA3462VUJJRZA57Z7GC",
            "Accept": "application/json"
        }
    })
    .then(events => events.json())
    .then(parsedEvents => {
        console.log(parsedEvents)
        
        parsedEvents.events.forEach(event => {
            
            /// variable to list meetups to DOM
            const meetupsToDom = meetupBuilder(event)
            addToDom(meetupsToDom)
            
        });
        
        
    })
    
})
