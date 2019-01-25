fetch(`https://www.eventbriteapi.com/v3/events/search/?q=nashville&token=OEA3462VUJJRZA57Z7GC`, {
    headers: {
        "Authorization": "Bearer OEA3462VUJJRZA57Z7GC",
        "Accept": "application/json"
    },
})
    .then(events => events.json())
    .then(parsedEvents => {
        console.log(parsedEvents)
    })
    .catch(err => console.error("Error: ", err))

    // const meetupSearch = document.querySelector("#searchform--meetups")

    // const meetupResults = document.querySelector("#results--container")

