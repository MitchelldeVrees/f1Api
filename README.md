# f1Api

API calls that work in V2
- Fastest lap standing
- Team standing
- Driver standing
- Race standing
- current
- Race result

## Fastest lap standing
**url:**/fastestLapStanding

**Explanation:** 
/fastestLapStanding?year=2022&race=2&standing=4
- Year: which season
- Race: Which race in the season
- Standing: Standing in the fastest lap of that race
              
If query is not filled in these are the options that are selected
- Year: 2021
- Race: 1
- Standing: 1
              
**Example:**
            `[{"season":"2022","round":"2","url":"http://en.wikipedia.org/wiki/2022_Saudi_Arabian_Grand_Prix","raceName":"Saudi Arabian Grand Prix",
            "Circuit":{"circuitId":"jeddah","url":"http://en.wikipedia.org/wiki/Jeddah_Street_Circuit","circuitName":"Jeddah Corniche Circuit",
            "Location":{"lat":"21.6319","long":"39.1044","locality":"Jeddah","country":"Saudi Arabia"}},
            "date":"2022-03-27","time":"17:00:00Z",
            "Results":[{"number":"11","position":"4","positionText":"4","points":"12",
            "Driver":{"driverId":"perez","permanentNumber":"11","code":"PER","url":"http://en.wikipedia.org/wiki/Sergio_P%C3%A9rez","givenName":"Sergio","familyName":"Pérez","dateOfBirth":"1990-01-26","nationality":"Mexican"},
            "Constructor":{"constructorId":"red_bull","url":"http://en.wikipedia.org/wiki/Red_Bull_Racing","name":"Red Bull","nationality":"Austrian"},
            "grid":"1","laps":"50","status":"Finished","Time":{"millis":"5070093","time":"+10.800"},
            "FastestLap":{"rank":"4","lap":"46","Time":{"time":"1:32.042"},
            "AverageSpeed":{"units":"kph","speed":"241.481"}}}]}]`
            
            
## Team standing
**url:** /teamStanding
 
**Explanation:** 
/teamStanding?year=2020
- Year: which season

If query is not filled in these are the options that are selected
- Year: 2021
              
              
**Example:**
            `[{"POS":"1","Team":"Mercedes","PTS":"573"},
            {"POS":"2","Team":"Red Bull Racing Honda","PTS":"319"},
            {"POS":"3","Team":"McLaren Renault","PTS":"202"},
            {"POS":"4","Team":"Racing Point BWT Mercedes","PTS":"195"},
            {"POS":"5","Team":"Renault","PTS":"181"},
            {"POS":"6","Team":"Ferrari","PTS":"131"},
            {"POS":"7","Team":"AlphaTauri Honda","PTS":"107"},
            {"POS":"8","Team":"Alfa Romeo Racing Ferrari","PTS":"8"},
            {"POS":"9","Team":"Haas Ferrari","PTS":"3"},
            {"POS":"10","Team":"Williams Mercedes","PTS":"0"}]`
            
## Driver standing
**url:**/driverStanding
 
**Explanation:**
/driverStanding?year=2000
- Year: which season

If query is not filled in these are the options that are selected
- Year: 2021
              
              
**Example:**
            `[{"POS":"1","Name":"Michael","Country":"GER","Car":"Ferrari","PTS":"108"},
            {"POS":"2","Name":"Mika","Country":"FIN","Car":"McLaren Mercedes","PTS":"89"},
            {"POS":"3","Name":"David","Country":"GBR","Car":"McLaren Mercedes","PTS":"73"},
            {"POS":"4","Name":"Rubens","Country":"BRA","Car":"Ferrari","PTS":"62"},
            {"POS":"5","Name":"Ralf","Country":"GER","Car":"Williams BMW","PTS":"24"},
            {"POS":"6","Name":"Giancarlo","Country":"ITA","Car":"Benetton Playlife","PTS":"18"},
            {"POS":"7","Name":"Jacques","Country":"CAN","Car":"BAR Honda","PTS":"17"},
            {"POS":"8","Name":"Jenson","Country":"GBR","Car":"Williams BMW","PTS":"12"},
            {"POS":"9","Name":"Heinz-Harald","Country":"GER","Car":"Jordan Mugen Honda","PTS":"11"},
            {"POS":"10","Name":"Jarno","Country":"ITA","Car":"Jordan Mugen Honda","PTS":"6"},
            {"POS":"11","Name":"Mika","Country":"FIN","Car":"Sauber Petronas","PTS":"6"},
            {"POS":"12","Name":"Jos","Country":"NED","Car":"Arrows Supertec","PTS":"5"},
            {"POS":"13","Name":"Eddie","Country":"GBR","Car":"Jaguar Cosworth","PTS":"4"},
            {"POS":"14","Name":"Ricardo","Country":"BRA","Car":"BAR Honda","PTS":"3"},
            {"POS":"15","Name":"Alexander","Country":"AUT","Car":"Benetton Playlife","PTS":"2"},
            {"POS":"16","Name":"Pedro","Country":"ESP","Car":"Arrows Supertec","PTS":"2"},
            {"POS":"17","Name":"Pedro","Country":"BRA","Car":"Sauber Petronas","PTS":"0"},
            {"POS":"18","Name":"Johnny","Country":"GBR","Car":"Jaguar Cosworth","PTS":"0"},
            {"POS":"19","Name":"Marc","Country":"ESP","Car":"Minardi Fondmetal","PTS":"0"},
            {"POS":"20","Name":"Gaston","Country":"ARG","Car":"Minardi Fondmetal","PTS":"0"},
            {"POS":"21","Name":"Nick","Country":"GER","Car":"Prost Peugeot","PTS":"0"},
            {"POS":"22","Name":"Jean","Country":"FRA","Car":"Prost Peugeot","PTS":"0"},
            {"POS":"23","Name":"Luciano","Country":"BRA","Car":"Jaguar Cosworth","PTS":"0"}]`
