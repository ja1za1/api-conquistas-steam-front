const API_URL_INFO = 'http://localhost:8080/api/info/'

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

let gameDivs = document.getElementsByClassName('game-div')

document.getElementById('dropdown-btn').addEventListener('click', () => {
    const SIDEBAR = document.getElementById('sidebar-menu')

    if(SIDEBAR.classList.contains('hidden')){
        SIDEBAR.classList.remove('hidden')
        SIDEBAR.classList.add('sidebar')
    }
    else{
        SIDEBAR.classList.remove('sidebar')
        SIDEBAR.classList.add('hidden')
    }
})

for(let gameDiv of gameDivs) {
    const GAME_NAME = gameDiv.children[1].children[0].innerHTML
    const GAME_APPID = GAMES_APPID[GAME_NAME]

    gameDiv.addEventListener('click', () => {
        fetch(API_URL_INFO + GAME_APPID)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
            return response.json();
        })
        .then(gameData => generateTable(gameData))
        .catch(error => {
            console.error('Erro durante a requisição:', error);
        });
    })
}

function generateTable(gameData){
    let tableBody = document.getElementById('table-body')
    tableBody.innerHTML = ''
    gameData.game.achievements.forEach(achievement => {
        let tableRow = document.createElement('tr')

        let achievementIcon = document.createElement('td')
        let achievementIconImage = document.createElement('img')
        achievementIconImage.src = achievement.icon
        achievementIconImage.width = 64
        achievementIconImage.height = 64
        achievementIcon.appendChild(achievementIconImage)

        tableRow.appendChild(achievementIcon)

        let achievementName = document.createElement('td')
        achievementName.innerHTML = achievement.name

        tableRow.appendChild(achievementName)

        let achievementDisplayName = document.createElement('td')
        achievementDisplayName.innerHTML = achievement.displayName

        tableRow.appendChild(achievementDisplayName)

        let achievementDescription = document.createElement('td')
        if(achievement.description){
            achievementDescription.innerHTML = achievement.description
        }
        else{
            achievementDescription.innerHTML = '<i class="fa-regular fa-eye-slash"></i> Hidden'
        }

        tableRow.appendChild(achievementDescription)

        let achievementHidden = document.createElement('td')
        achievementHidden.innerHTML = achievement.hidden

        tableRow.appendChild(achievementHidden)

        tableBody.appendChild(tableRow)
    })
}