fetch("https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=312&apikey=DW1OYVAwf6ati7WVNtEdLEku4AHB2pF0")
    .then(events => events.json())
    .then(parsedEvents => {
        // console.table(parsedEvents)
        console.log(parsedEvents._embedded.events)
        
        parsedEvents._embedded.events.forEach(events => {
            console.log(events.classifications[0].genre.name)
            const eventsonDOM = showEvent(events)
            addtoDOM(eventsonDOM)
        });
    })

const showEvent = events => {
    return `
         <div class="eventsContainer">
             <h2 class = "eventsName" >${events.name}</h2>
             <p class = "eventsGenre" >${events.classifications[0].genre.name} </p>
             <p class = "eventsVenueName" >${events._embedded.venues.name}</p>
             
         </div>
         `
}

const addtoDOM = eventsonDOM => {
    document.querySelector("#results--container").innerHTML += eventsonDOM
}



//  <p class = "eventsVenueName" >${events.venues.name}</p>
/* <p class = "eventsGenre" >${events.classifications.genre} </p> */