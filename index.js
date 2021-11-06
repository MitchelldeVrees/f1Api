const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

let driversStanding = []
let teamsStanding = []
let fastestlapsStanding = []
let racesStanding = []


function fastestlapStanding(year) {
//TODO A PERSON CAN FILL IN 1 VALUE IN THE QUERY AND IT STILL WORKS EXAMPLE: http://localhost:8000/driverStandings/GBR/

    if (year === undefined) {
        year = 2021
    }
    url = "https://www.formula1.com/en/results.html/" + year + "/fastest-laps.html"
    axios.get(url)
        .then((response => {
            const html = response.data
            const $ = cheerio.load(html);
            const element = 'body > div.site-wrapper > main > article > div > div.ResultArchiveContainer > div.resultsarchive-wrapper > div.resultsarchive-content > div > table > tbody > tr'

            const keys = [
                'GrandPrix',
                'Driver',
                'Team',
                'Time'

            ]
            $(element).each((parentIdx, parentElem) => {
                let keyIdx = 0
                const lapObj = {}

                $(parentElem).children().each((childIdx, childElem) => {
                    let tdValue = $(childElem).text()

                    if (tdValue) {
                        lapObj[keys[keyIdx]] = tdValue
                        keyIdx++
                    }
                })
                fastestlapsStanding.push(lapObj)
            })
        }))
    return fastestlapsStanding
}

function teamStanding() {
//TODO MAKE IT SO A PERSON CAN CHOOSE A DIFFERENT YEAR
//TODO PUT THE FUNCTION IN A DRIVERSTANDING FILE SO IT IS CLEAN LOOKING
//TODO A PERSON CAN FILL IN 1 VALUE IN THE QUERY AND IT STILL WORKS EXAMPLE: http://localhost:8000/driverStandings/GBR/

    axios.get('https://www.formula1.com/en/results.html/2021/team.html')
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


app.get('/', (req, res) => {
    res.json("Welcome to the F1 API")
})

app.get('/driverStanding', (req, res) => {
    let year = req.query.year
    let driver = req.query.driver
    res.json(driverStanding(year, driver))
    driversStanding = []

})


app.get('/teamStanding', (req, res) => {
    let POS = req.query.pos
    let team = req.query.team
    let pts = req.query.pts

    if (POS || team || pts != undefined){

    }
    res.json(teamStanding())
    teamsStanding = []

})

app.get('/teamStanding/:POS/:Team/:PTS', async (req, res) => {

    teamStanding()
    var team = teamsStanding.find(teamsStanding => teamsStanding.POS === req.params.POS || teamsStanding.Team === req.params.Team || teamsStanding.PTS === req.params.PTS)
    if (!team) res.status(404).send("the team with the given query was not found");
    res.send(team)
    teamsStanding = []

})

app.get('/fastestLapStanding', (req, res) => {
    let year = req.query.year
    res.json(fastestlapStanding(year))
    fastestlapsStanding = []
})

app.get('/fastestLapStanding/:GrandPrix/:Driver/:Team', async (req, res) => {
    let year = req.query.year
    fastestlapStanding(year)
    var lap = fastestlapsStanding.find(fastestlapsStanding => fastestlapsStanding.Grandprix === req.params.Grandprix || fastestlapsStanding.Driver === req.params.Driver || fastestlapsStanding.Team === req.params.Team)
    if (!lap) res.status(404).send("the lap with the given query was not found");
    res.send(lap)

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

app.listen(PORT, () => console.log('SERVER RUNNING'))