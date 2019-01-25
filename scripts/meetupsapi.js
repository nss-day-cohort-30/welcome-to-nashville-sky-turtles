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
              const listEvent = `<li>${event.name.text}</li>`
                place4MeetupResults.innerHTML += listEvent
          });
        // place4MeetupResults.innerHTML += `
            // <p>See this?  it got THIS far.</p>
            // <p>${allEvents}[1].[name]</p>
        // `

        }

    // events.name.text
    // events.description.text
    // events.resource_uri
    // events.start.local



    })
