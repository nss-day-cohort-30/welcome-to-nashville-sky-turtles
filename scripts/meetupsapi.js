const meetupSearch = document.querySelector("#searchform--meetups")
const place4MeetupResults = document.querySelector("#results--container")
let allEvents=[]
fetch(`https://www.eventbriteapi.com/v3/events/search/?q=nashville&token=OEA3462VUJJRZA57Z7GC`, {
    headers: {
        "Authorization": "Bearer OEA3462VUJJRZA57Z7GC",
        "Accept": "application/json"
    },
})
.then(events => events.json())
.then(parsedEvents => {
    console.log(parsedEvents)
    allEvents = parsedEvents

         if(parsedEvents.events !== null || parsedEvents.events !== undefined){
          allEvents.events.forEach(event => {
              const listEvent = `<li>${event.name.text} :
               ${event.description.text}</li>
                              When: ${event.start.local}`
                place4MeetupResults.innerHTML += listEvent
          });
        }

    })
let showEventFactory = (event) =>{
    let id = event.id
    let name = event.name.text
    let desc = event.description.text
    let page = event.resource_uri
}