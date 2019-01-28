const meetupSearch = document.querySelector("#searchform--meetups")
const place4MeetupResults = document.querySelector("#meetupContainer")
let allEvents = []



document.querySelector("#request--meetups").addEventListener("click", function () {
    searchField = document.querySelector(".search--meetups").value
    console.log("i pushed a button")
    console.log("searchfield", searchField)


    document.querySelector("#concertContainer").innerHTML = ""
   document.querySelector("#restaurantContainer").innerHTML = ""
   document.querySelector("#meetupContainer").innerHTML = ""
   document.querySelector("#parksContainer").innerHTML = ""
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

let counter = 1
const meetupBuilder = event => {
    counter++
    return `
    <section name="meetup--section" id="meetup--article_${counter}"> 
    <p>${event.name.text} </p> 
    
    <button id="${event.id}">Save to itinerary</button>
    
    </section>
    `
}


addToDom = (meetupsToDom) => {
    document.querySelector("#meetupContainer").innerHTML += meetupsToDom;


}



document.querySelector("#meetupContainer").addEventListener("click", function () {
    let meetNameId = event.target.id
    let buttonType = meetNameId.split("_");



    const fetchSpecific = (nameEventID) => {

        fetch(`https://www.eventbriteapi.com/v3/events/${nameEventID}/?token=OEA3462VUJJRZA57Z7GC`, {
            headers: {
                "Authorization": "Bearer OEA3462VUJJRZA57Z7GC",
                "Accept": "application/json"
            }
        }).then(event => event.json()
            .then(event => {

                const somethingToSave = saveToItinerary(event)
                anotherThingToDom(somethingToSave)
            })
        )
        const anotherThingToDom = somethingToSave => {

            document.querySelector("#meetupItinerary").innerHTML=" "
            document.querySelector("#meetupItinerary").innerHTML += somethingToSave;
        }

        // debugger 

        const saveToItinerary = (event) => {
            console.log("event:", event)
            return `
            <section name="meetup--section" id="meetup--article"> 
            <p>${event.name.text} </p> 
            </section>
            `
        }

    }
    fetchSpecific(meetNameId)

    console.log("meetNameId: ", meetNameId)
    // console.log("event id:", event.id)

})

    // const theSelectedBtn = document.querySelector(`#btn-${event.id}`)
    // console.log("selected btn:", theSelectedBtn)

    // theSelectedBtn.addEventListener("click", saveToItinerary)


    // document.querySelector("#meetupItinerary").innerHTML = ""
    // if (theSelectedBtn.split("-")[1] === event.id)
    // selectedMeetupBuilder(this.event)
