document.querySelector("#concertButton").addEventListener("click", function () {
    genre = document.querySelector(".SearchByGenre").value 
    pingAPI(genre)
}) 




function pingAPI(genre)  {
    
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=312&apikey=DW1OYVAwf6ati7WVNtEdLEku4AHB2pF0&classificationName=${genre}`)
    .then(events => events.json())
    .then(parsedEvents => {
        // console.table(parsedEvents)
        console.log(parsedEvents._embedded.events)

        parsedEvents._embedded.events.forEach(events => {
            console.log(events.classifications[0].genre.name)
            console.log(events._embedded.venues[0].name)
            console.log(events.id)
            const eventsonDOM = showEvent(events)
            addtoDOM(eventsonDOM) 
            
        });
        buttonsaveFunction()
    })

const showEvent = events => {
    
    return `
         <div  class="eventsContainer">
             <h2 class = "eventsName">${events.name}</h2>
             <Li class = "eventsGenre">  Music Genre: ${events.classifications[0].genre.name} </Li>
             <Li class = "eventsVenueName"> Event Date: ${events.dates.start.localDate}</Li>
              <Li class = "eventsVenueName"> Event Venue: ${events._embedded.venues[0].name}</Li>
              <button class = "saveButton" id = "${events.id}" >Save To Itinerary</button>

         </div>
         `
}

const addtoDOM = eventsonDOM => {
    document.querySelector("#results--container").innerHTML += eventsonDOM
}
}


const buttonsaveFunction = () => {
    document.querySelector("#results--container").addEventListener("click", function() {
        let clickID = event.target.id;
        let buttonType = clickID.split("_");
        if (buttonType[1] === "event") {
           
        }
    })
    // fetch(
        
    // )
    
}





