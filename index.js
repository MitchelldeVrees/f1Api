const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const PORT = process.env.PORT || 8000

const app = express()

let driversStanding = []
let teamsStanding = []
let fastestlapsStanding = []
let racesStanding = []
let racesResult = []


function fastestlapStanding(year, race, standing) {
    if (year === undefined) {
        year = 2021
    }

    if (race === undefined) {
        race = 1
    }

    if (standing === undefined) {
        standing = 1
    }

    url = "https://ergast.com/api/f1/" + year + "/ " + race + "/fastest/" + standing + "/results.json"
    axios.get(url).then(response => {
        
        response = response.data
        fastestlapsStanding = response.MRData.RaceTable.Races

    })
   
    return fastestlapsStanding
}



function teamStanding(year) {
//TODO MAKE IT SO A PERSON CAN CHOOSE A DIFFERENT YEAR
//TODO PUT THE FUNCTION IN A DRIVERSTANDING FILE SO IT IS CLEAN LOOKING
//TODO A PERSON CAN FILL IN 1 VALUE IN THE QUERY AND IT STILL WORKS EXAMPLE: http://localhost:8000/driverStandings/GBR/

    axios.get('https://www.formula1.com/en/results.html/' + year + '/team.html')
        .then((response => {
            const html = response.data
            const $ = cheerio.load(html);
            const element = 'body > div.site-wrapper > main > article > div > div.ResultArchiveContainer > div.resultsarchive-wrapper > div.resultsarchive-content > div > table > tbody > tr'

            const keys = [
                'POS',
                'Team',
                'PTS',

            ]
            $(element).each((parentIdx, parentElem) => {
                let keyIdx = 0
                const teamObj = {}

                $(parentElem).children().each((childIdx, childElem) => {
                    let tdValue = $(childElem).text()

                    if (tdValue) {
                        teamObj[keys[keyIdx]] = tdValue.trim()
                        keyIdx++
                    }
                })
                teamsStanding.push(teamObj)
            })
        }))
    return teamsStanding

}


function driverStanding(year, driver) {
// get the drivers standing of a 2021
//TODO A PERSON CAN FILL IN 1 VALUE IN THE QUERY AND IT STILL WORKS EXAMPLE: http://localhost:8000/driverStandings/GBR/

    if (driver === undefined) {
        driver = ""
    }
    if (year === undefined) {
        year = 2021
    }
    url = "https://www.formula1.com/en/results.html/" + year + "/drivers/" + driver + "01.html"
    axios.get(url)
        .then((response => {
            const html = response.data
            const $ = cheerio.load(html);
            const element = 'body > div.site-wrapper > main > article > div > div.ResultArchiveContainer > div.resultsarchive-wrapper > div.resultsarchive-content > div > table > tbody > tr'
            const header = 'body > div.site-wrapper > main > article > div > div.ResultArchiveContainer > div.resultsarchive-wrapper > div.resultsarchive-content-header > h1'
            const keys = [
                "POS",
                "Name",
                "Country",
                "Car",
                "PTS"
            ]
            const driverkey = [
                "Country",
                "Date",
                "Car",
                "POS",
                "PTS"
            ]
            $(element).each((parentIdx, parentElem) => {
                let keyIdx = 0
                let driverObj = {}

                $(parentElem).children().each((childIdx, childElem) => {
                    let tdValue = $(childElem).text()

                    if (driver === "") {
                        if (keyIdx === 1) {
                            tdValue = $('span:first-child', $(childElem).html()).text()
                        }
                    }
                    if (tdValue) {
                        if (driver === "") {
                            driverObj[keys[keyIdx]] = tdValue.trim()
                            keyIdx++
                        } else {
                            driverObj[driverkey[keyIdx]] = tdValue.trim()
                      
                            keyIdx++
                        }

                    }
                })
                driversStanding.push(driverObj)
                driverObj = {}
            })
        }))
    return driversStanding
}

function raceStanding(year, race, offset) {
//TODO A PERSON CAN FILL IN 1 VALUE IN THE QUERY AND IT STILL WORKS EXAMPLE: http://localhost:8000/driverStandings/GBR/

    if (race === undefined) {
        race = "1"
    }
    if (year === undefined) {
        year = "2021"
    }
    if (offset === undefined) {
        offset = "&offset=0"
    }else{
        offset = "&offset=" + offset
    }
    url = "http://ergast.com/api/f1/" + year + "/" + race + "/laps.json?limit=1000" + offset
    axios.get(url).then(response => {
        response = response.data
        data1 = response.MRData.RaceTable.Races
        racesStanding.push(data1)


        // total = (response.MRData.total)
        // if (total > 1000) {
        //     offset = total - 1000
        //     console.log(offset)
        //     url = "http://ergast.com/api/f1/" + year + "/" + race + "/laps.json?limit=1000" + offset
        //     axios.get(url).then(response => {
        //         response = response.data
        //         data2 = response.MRData.RaceTable.Races
        //         console.log(data2)
        //     })
        // }

    })

    return racesStanding
}

function current() {
//TODO A PERSON CAN FILL IN 1 VALUE IN THE QUERY AND IT STILL WORKS EXAMPLE: http://localhost:8000/driverStandings/GBR/

    url = "http://ergast.com/api/f1/current/last/results.json"
    axios.get(url).then(response => {
        response = response.data
        racesStanding = response.MRData.RaceTable.Races

    })

    return racesStanding
}

function raceResult(year, race) {
//EXAMPLE: http://localhost:8000/raceResult?year=2022&race=2
    if (year === undefined){
        year = 2021
    }
    if (race === undefined){
        race = 1
    }
    url = "http://ergast.com/api/f1/" + year + "/" + race +"/results.json"
    console.log(url)
    axios.get(url).then(response => {
        response = response.data
        racesResult = response.MRData.RaceTable.Races
        console.log(url)
        console.log(racesResult)
    })
    return racesResult
}


app.get('/', (req, res) => {
    res.json("Welcome to the F1 API")
})

app.get('/driverStanding', (req, res) => {
    let year = req.query.year
    res.json(driverStanding(year))
    driversStanding = []

})


app.get('/teamStanding', (req, res) => {
    let year = req.query.year


    if (year == undefined){
        year = 2021
    }
    res.json(teamStanding(year))
    teamsStanding = []

})


app.get('/fastestLapStanding', (req, res) => {
    let year = req.query.year
    let race = req.query.race
    let standing = req.query.standing

    res.json(fastestlapStanding(year,race,standing))
    fastestlapsStanding = []
})



app.get('/race', (req, res) => {
    let year = req.query.year
    let race = req.query.race
    let offset = req.query.offset
    if (year <= 1998) {
        res.send("This data does not exist choose a year equal too or above 1999")
    } else {
        res.json(raceStanding(year, race, offset))
    }
    racesStanding = []
})

app.get('/current', (req, res) => {

    res.json(current())

})

app.get('/raceResult', (req, res) => {
    let year = req.query.year
    let race = req.query.race


    res.json(raceResult(year, race))
    racesResult = []

})

app.listen(PORT, () => console.log('SERVER RUNNING'))