const meetupSearch = document.querySelector("#searchform--meetups")
const place4MeetupResults = document.querySelector("#results--container")
let allEvents = []
fetch(`https://www.eventbriteapi.com/v3/events/search/?q=meetup_nashville&token=OEA3462VUJJRZA57Z7GC`, {
    headers: {
        "Authorization": "Bearer OEA3462VUJJRZA57Z7GC",
        "Accept": "application/json"
    },
})
.then(events => events.json())
.then(parsedEvents => {
    
    parsedEvents.events.forEach(event => {
        console.log(event.name)
        
        /// variable to list meetups to DOM
        const meetupsToDom = meetupBuilder(event)
        addToDom(meetupsToDom)
        
    });
    
    
})

const meetupBuilder = event => {
    return `
        <section name="meetup--section" id="meetup--article"> 
        <p>${event.name.text} </p> 
        
        <button id="${event.id}">Save to itinerary</button>
       
        </section>
        `
}

addToDom = (meetupsToDom) => {
    document.querySelector("#results--container").innerHTML += meetupsToDom;

}

