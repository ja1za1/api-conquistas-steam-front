import { COUNTRY_COLORS } from "./country-colors.js"

const API_URL_INFO = 'http://localhost:8080/api/info/'
const API_URL_ACHIEVEMENTS = 'http://localhost:8080/api/achievements/'
const API_COUNTRY_URL = 'https://restcountries.com/v3.1/alpha/'

const ALL_GAMES = [
    "Borderlands 2",
    "GTA V",
    "GTA IV",
    "Dark Souls III",
    "Dark Souls II",
    "Sekiro",
    "Elden Ring",
    "Terraria",
    "Fallout 4",
    "Red Dead Redemption 2",
    "Left 4 Dead 2",
    "Team Fortress 2",
    "PUBG",
    "Cyberpunk 2077",
    "God of War"
];

const GAMES_IMAGES = {
    "Borderlands 2" : 'assets/game-cover-wide/borderlands2.jpg',
    "GTA V" : "assets/game-cover-wide/gtav.jpg",
    "GTA IV" : "assets/game-cover-wide/gtaiv.jpg",
    "Dark Souls III" : "assets/game-cover-wide/darksoulsiii.jpg",
    "Dark Souls II" : "assets/game-cover-wide/darksoulsii.jpg",
    "Sekiro" : "assets/game-cover-wide/sekiro.jpg",
    "Elden Ring" : "assets/game-cover-wide/eldenring.jpg",
    "Terraria" : "assets/game-cover-wide/terraria.jpg",
    "Fallout 4" : "assets/game-cover-wide/fallout4.jpg",
    "Red Dead Redemption 2" : "assets/game-cover-wide/reddeadredemptionii.jpg",
    "Left 4 Dead 2" : "assets/game-cover-wide/left4dead2.jpg",
    "Team Fortress 2" : "assets/game-cover-wide/tf2.jpg",
    "PUBG" : "assets/game-cover-wide/pubg.jpg",
    "Cyberpunk 2077" : "assets/game-cover-wide/cyberpunk.jpg",
    "God of War" : "assets/game-cover-wide/gow.jpg"
}

const GAMES_BACKGROUND = {
    "Borderlands 2" : 'assets/background-games/borderlands2.jpg',
    "GTA V" : "assets/background-games/gtav.jpg",
    "GTA IV" : "assets/background-games/gtaiv.jpg",
    "Dark Souls III" : "assets/background-games/darksoulsiii.jpg",
    "Dark Souls II" : "assets/background-games/darksoulsii.jpg",
    "Sekiro" : "assets/background-games/sekiro.jpg",
    "Elden Ring" : "assets/background-games/eldenring.jpg",
    "Terraria" : "assets/background-games/terraria.jpg",
    "Fallout 4" : "assets/background-games/fallout4.jpg",
    "Red Dead Redemption 2" : "assets/background-games/reddeadredemptionii.jpg",
    "Left 4 Dead 2" : "assets/background-games/left4dead2.jpg",
    "Team Fortress 2" : "assets/background-games/tf2.jpg",
    "PUBG" : "assets/background-games/pubg.jpg",
    "Cyberpunk 2077" : "assets/background-games/cyberpunk.jpg",
    "God of War" : "assets/background-games/gow.jpg"
}

const GAMES_APPID = {
    "Borderlands 2" : 49520,
    "GTA V" : 271590,
    "GTA IV" : 12210,
    "Dark Souls III" : 374320,
    "Dark Souls II" : 236430,
    "Sekiro" : 814380,
    "Elden Ring" : 1245620,
    "Terraria" : 105600,
    "Fallout 4" : 377160,
    "Red Dead Redemption 2" : 1174180,
    "Left 4 Dead 2" : 550,
    "Team Fortress 2" : 440,
    "PUBG" : 578080,
    "Cyberpunk 2077" : 1091500,
    "God of War" : 1593500
}

const GAMES_COVER = {
    "Borderlands 2" : 'assets/game-cover/borderlands2.jpg',
    "GTA V" : "assets/game-cover/gtav.jpg",
    "GTA IV" : "assets/game-cover/gtaiv.jpg",
    "Dark Souls III" : "assets/game-cover/darksoulsiii.jpg",
    "Dark Souls II" : "assets/game-cover/darksoulsii.jpg",
    "Sekiro" : "assets/game-cover/sekiro.jpg",
    "Elden Ring" : "assets/game-cover/eldenring.jpg",
    "Terraria" : "assets/game-cover/terraria.jpg",
    "Fallout 4" : "assets/game-cover/fallout4.jpg",
    "Red Dead Redemption 2" : "assets/game-cover/reddeadredemptionii.jpg",
    "Left 4 Dead 2" : "assets/game-cover/left4dead2.jpg",
    "Team Fortress 2" : "assets/game-cover/tf2.jpg",
    "PUBG" : "assets/game-cover/pubg.jpg",
    "Cyberpunk 2077" : "assets/game-cover/cyberpunk.jpg",
    "God of War" : "assets/game-cover/gow.jpg"
}

let globalCountriesAchievementData = []
let globalChart

document.getElementById('input-jogo').addEventListener('input', showSuggestions);
document.getElementById('form-jogo').addEventListener('submit', function(event) {
    event.preventDefault();
    const nomeJogo = document.getElementById('input-jogo').value
    showChart(capitalizeString(nomeJogo))
});

const filtroGrafico = document.getElementById('filtroGrafico');
filtroGrafico.addEventListener('change', function() {
  updateChart(this);
});

function capitalizeString(string){
    const arr = string.split(" ");

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }

    return arr.join(" ");
}


function showSuggestions() {
    const input = document.getElementById("input-jogo");
    const suggestionsDiv = document.getElementById("suggestions");
    const userInput = input.value.toLowerCase();
    suggestionsDiv.innerHTML = ''

        const filteredSuggestions = ALL_GAMES.filter(suggestion => suggestion.toLowerCase().includes(userInput));

        if(filteredSuggestions.length > 0){
            if(suggestionsDiv.classList.contains('invisible')){
                suggestionsDiv.classList.remove('invisible')
            }
            showGamesSuggestions(filteredSuggestions)
        } else{
            hideSuggestions()
        }
}

function showGamesSuggestions(suggestions) {
    const input = document.getElementById("input-jogo");
    const suggestionsDiv = document.getElementById("suggestions");
    suggestions.forEach(suggestion => {

        const suggestionItem = document.createElement("div");
        suggestionItem.classList.add('suggestion-item')
        suggestionItem.style.minWidth = '600px'

        const imageDiv = document.createElement('div')
        imageDiv.classList.add('d-flex', 'flex-row', 'p-2')

        const gameImage = document.createElement('img')
        gameImage.setAttribute('src', GAMES_IMAGES[suggestion])
        gameImage.classList.add('suggestion-game-image')
        
        imageDiv.appendChild(gameImage)
        suggestionItem.appendChild(imageDiv)
        
        const gameName = document.createElement('h3')
        gameName.style.margin = '0px';
        gameName.style.marginLeft = '1rem';
        gameName.textContent = suggestion

        suggestionItem.appendChild(gameName)

        suggestionItem.addEventListener("click", () => {
            showChart(suggestion)
        });

        suggestionsDiv.appendChild(suggestionItem);

       
    });
}

async function showChart(suggestion){
    const erro = document.getElementById('jogo-nao-encontrado')
    if(suggestion in GAMES_APPID){
        document.getElementById('grafico').style.display = 'none'
        document.querySelector(".loader").style.display = "block";
        erro.classList.add('invisible')
        const input = document.getElementById("input-jogo");
        const suggestionsDiv = document.getElementById("suggestions");
        input.value = suggestion;
        suggestionsDiv.innerHTML = '';

        let filter = document.getElementById('filtroGrafico').value
        hideSuggestions()
        globalCountriesAchievementData = await requestData(suggestion)
        generateChart(globalCountriesAchievementData, filter)

        document.querySelector(".loader").style.display = "none";
        document.getElementById('grafico').style.display = 'flex'
    }
    else{
        erro.classList.remove('invisible')
        document.getElementById('background-game').style.display = 'none'
        document.getElementById('grafico').style.display = 'none'
    }
}
    

async function generateData(countriesAchievementData){
    let labels = []
    let promises = countriesAchievementData.map(async countryAchievementData => {
        const response = await fetch(API_COUNTRY_URL + countryAchievementData.country);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        const countryData = await response.json();
        labels.push({
            "enName" : countryData[0]['name']['common'],
            "name" : countryData[0]['translations']['por']['common'],
            "flag" : countryData[0]['flags']['svg'],
            "percentages" : countryAchievementData.achievementsInfo.achievementsPercentage
        })
    })
    await Promise.all(promises)

    return labels
}



function updateChart(option){
    generateChart(globalCountriesAchievementData, option.value)
}

async function generateChart(countriesAchievementData, percentageAmount){
    
    let data = await generateData(countriesAchievementData)
    data = data.sort((a, b) => a['percentages'][percentageAmount] - b['percentages'][percentageAmount])

    let flags = data.map(data => {
        const imageFlag = new Image()
        imageFlag.src = data.flag
        imageFlag.classList.add('flags')
        return imageFlag
    })
    
    let colors = []
    data.map(data => {
        const flagName = data['enName']
        COUNTRY_COLORS.map(country => {
            if (country.name === flagName){
                for (let i = 0; i < country.colors.length; i++){
                    if (!colors.includes(country.colors[i])){
                        colors.push(country.colors[i])
                        return
                    }
                }

            }
        })
    })

    const imageItems = {
        id: 'imageItems',
        afterDatasetDraw(chart, args, options){
            const { 
                ctx,
                chartArea: {
                    top, bottom, left, right, width, height
                },
                scales: {x, y}
            } = chart;

            ctx.save();

            for (let i = 0; i <= data.length-1; i++){
                ctx.drawImage(flags[i], x.getPixelForValue(i) - (40/2), y.getPixelForValue(data[i]['percentages'][percentageAmount]) - 40, 40, 30)
            }
        }
    }

    const chartData = {
        datasets: [{
            label: 'Quantidade de usúarios',
            data: data,
            borderWidth: 1,
            backgroundColor: colors,
        }]
    }

    const config = {
        type: 'bar',
        data: chartData,
        options: {
            parsing: {
                xAxisKey: "name",
                yAxisKey: `percentages.${percentageAmount}`
            },
            responsive : true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: 'Conquistas por país',
                    fullsize: true,
                    font: {
                        size: 46,
                    },
                    color : '#ffffff'
                },
                subtitle: {
                    display: true,
                    text: 'Quantidade de usuários que possuem determinada % de conquistas por país',
                    font: {
                        size: 24
                    },
                    padding: {
                        bottom: 50
                    },
                    color : '#cccccc'
                },
            },
            scales: {
                y: {
                    border: {
                        color: 'black'
                    },
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font: {
                            size: 16
                        },
                        color: '#cccccc'
                    }
                },
                x: {
                    border: {
                        color: 'black'
                    },
                    grid: {
                        display: false,
                    },
                    ticks: {
                        font: {
                            size: 14
                        },
                        color: '#cccccc'
                    }
                }
            }
        },
        plugins : [imageItems]
    }
    if(globalChart == null){
        globalChart = new Chart(document.getElementById('graficoConquistasPais'), config);
    }
    else{
        globalChart.destroy()
        globalChart = new Chart(document.getElementById('graficoConquistasPais'), config);
    }
    
}

async function requestData(suggestion){
    const gameAppId = GAMES_APPID[suggestion]
    requestGameData(suggestion)

    const fetchCountries = requestTopTenCountries(gameAppId)
    
    let countriesAchievementsData = []
    let countries = await fetchCountries

    let promises = countries.map(async country => {
        let countryAchievementsInfo = await requestCountryAchievementsInfo(gameAppId, country)
        countriesAchievementsData.push(countryAchievementsInfo)
    })
    await Promise.all(promises)

    return countriesAchievementsData
}

function requestGameData(suggestion){
    fetch(API_URL_INFO + GAMES_APPID[suggestion])
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        return response.json();
    })
    .then(gameData => generateBackground(gameData, suggestion))
    .catch(error => {
        console.error('Erro durante a requisição:', error);
    });
}

async function requestTopTenCountries(gameAppId){
   const response = await fetch(API_URL_ACHIEVEMENTS + gameAppId + "/top10countries");
    if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
    }
    const countriesAchievementData = await response.json();
    return getTopTenCountries(countriesAchievementData);
}

async function requestCountryAchievementsInfo(gameAppId, country){
    const response = await fetch(API_URL_ACHIEVEMENTS + gameAppId + "/" + country);
    if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
    }
    return await response.json();
 }

function getTopTenCountries(countriesInfo) {
    let countries = []
    countriesInfo['amountUserAchievementsByCountry'].forEach(countryInfo => {
        countries.push(countryInfo['country'])
    })
    return countries
}


function generateBackground(gameData, gameSuggestion){
    const backgroundGame = document.getElementById("background-game")
    if(backgroundGame.classList.contains('invisible')){
        backgroundGame.classList.remove('invisible')
    }
    const gameCover = document.getElementById("game-cover")
    const gameTitle = document.getElementById("game-title")
    const gameDescription = document.getElementById('game-description')
    const achievementsAmount = document.getElementById("achievements-amount")

    gameCover.innerHTML = ''
    gameTitle.innerHTML = gameData['game']['name']
    gameDescription.innerHTML = gameData['game']['description']
    achievementsAmount.innerHTML = gameData['game']['achievementsAmount']
    
    const gameCoverImage = document.createElement('img')
    gameCoverImage.setAttribute('src', GAMES_COVER[gameSuggestion])

    gameCover.appendChild(gameCoverImage)
    backgroundGame.style.backgroundImage = `url(${GAMES_BACKGROUND[gameSuggestion]})`

    document.getElementById('background-game').style.display = 'flex'
    
}

function hideSuggestions() {
    const suggestionsDiv = document.getElementById("suggestions");
    if(!suggestionsDiv.classList.contains('invisible')){
        suggestionsDiv.classList.add('invisible')
        suggestionsDiv.innerHTML = ''
    }
}