document.querySelector("#concertButton").addEventListener("click", function () {
    pingAPI()
}) 




function pingAPI()  {
    
    fetch("https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=312&apikey=DW1OYVAwf6ati7WVNtEdLEku4AHB2pF0")
    .then(events => events.json())
    .then(parsedEvents => {
        // console.table(parsedEvents)
        console.log(parsedEvents._embedded.events)

        parsedEvents._embedded.events.forEach(events => {
            console.log(events.classifications[0].genre.name)
            console.log(events._embedded.venues[0].name)
            const eventsonDOM = showEvent(events)
            addtoDOM(eventsonDOM)
        });
    })

const showEvent = events => {
    return `
         <div class="eventsContainer">
             <h2 class = "eventsName">${events.name}</h2>
             <p class = "eventsGenre">  Music Genre: ${events.classifications[0].genre.name} </p>
             <p class = "eventsVenueName"> Event Date: ${events.dates.start.localDate}</p>
              <p class = "eventsVenueName"> Event Venue: ${events._embedded.venues[0].name}</p>
         </div>
         `
}

const addtoDOM = eventsonDOM => {
    document.querySelector("#results--container").innerHTML += eventsonDOM
}
}


