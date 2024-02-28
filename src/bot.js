var Position;
(function (Position) {
    Position["pos1"] = "pos1";
    Position["pos2"] = "pos2";
    Position["pos3"] = "pos3";
    Position["pos4"] = "pos4";
    Position["pos5"] = "pos5";
    Position["pos6"] = "pos6";
})(Position || (Position = {}));
var Players = [
    { name: "Solomon Niguse", position: Position.pos1, skill: 92, },
    { name: "Jossy Tesfaye", position: Position.pos1, skill: 82, },
    { name: "Befkadu Feleke", position: Position.pos1, skill: 81, },
    { name: "Ahmed Abubeker", position: Position.pos2, skill: 85, },
    { name: "Surafel Zelke", position: Position.pos2, skill: 80, },
    { name: "Robel Ephrem", position: Position.pos2, skill: 85, },
    { name: "Mike Lema", position: Position.pos3, skill: 82, },
    { name: "Yordanos ", position: Position.pos3, skill: 78, },
    { name: "Nathnal Almaw", position: Position.pos3, skill: 80, },
    { name: "Bamlak Amare", position: Position.pos4, skill: 75, },
    { name: "Natnal Bassa", position: Position.pos4, skill: 72, },
    { name: "Salih Mohammed", position: Position.pos4, skill: 68, },
    { name: "Mesele", position: Position.pos5, skill: 65, },
    { name: "Zein", position: Position.pos5, skill: 62, },
    { name: "Mike Firew", position: Position.pos5, skill: 58, },
    { name: "Nuredin Ibrahim", position: Position.pos6, skill: 50, },
    { name: "Eyuel Solomon", position: Position.pos6, skill: 55, },
    { name: "Mika Lemlemu", position: Position.pos6, skill: 45, }
];
function shuffleAndTeamPlayers(players) {
    var _a;
    var shuffledPlayers, team1 = [], team2 = [], team3 = [];
    // Group players by position
    var playersByPosition = {};
    for (var _i = 0, players_1 = players; _i < players_1.length; _i++) {
        var player = players_1[_i];
        if (!playersByPosition[player.position]) {
            playersByPosition[player.position] = [];
        }
        playersByPosition[player.position].push(player);
    }
    // Shuffle each position group
    for (var position in playersByPosition) {
        var group = playersByPosition[position];
        for (var i = group.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [group[j], group[i]], group[i] = _a[0], group[j] = _a[1];
        }
    }
    // Distribute players to teams
    var teamIndex = 0;
    for (var position in playersByPosition) {
        var group = playersByPosition[position];
        for (var _b = 0, group_1 = group; _b < group_1.length; _b++) {
            var player = group_1[_b];
            if (teamIndex % 3 === 0) {
                team1.push(player);
            }
            else if (teamIndex % 3 === 1) {
                team2.push(player);
            }
            else {
                team3.push(player);
            }
            teamIndex++;
        }
    }
    console.log("Total skill of Team 1:", sumSkill(team1));
    console.log("Total skill of Team 2:", sumSkill(team2));
    console.log("Total skill of Team 3:", sumSkill(team3));
    return { team1: team1, team2: team2, team3: team3 };
}
function sumSkill(team) {
    return team.reduce(function (sum, player) { return sum + player.skill; }, 0);
}
/*
function shuffleAndTeamPlayers(players: Person[]): { team1: Person[], team2: Person[], team3: Person[] } {
    let playersByPosition = players.reduce((acc: { [key: string]: Person[] }, player: Person) => {
        (acc[player.position] = acc[player.position] || []).push(player);
        return acc;
    }, {});

    for (let position in playersByPosition) {
        playersByPosition[position].sort((a: Person, b: Person) => b.skill - a.skill);
    }

    let team1: Person[] = [], team2: Person[] = [], team3: Person[] = [];
    for (let position in playersByPosition) {
        let playersInPosition = playersByPosition[position];
        for (let i = 0; i < playersInPosition.length; i++) {
            if (i % 3 === 0) {
                team1.push(playersInPosition[i]);
            } else if (i % 3 === 1) {
                team2.push(playersInPosition[i]);
            } else {
                team3.push(playersInPosition[i]);
            }
        }
    }

    return { team1, team2, team3 };
}
*/
var _a = shuffleAndTeamPlayers(Players), team1 = _a.team1, team2 = _a.team2, team3 = _a.team3;
console.log("Team 1:", team1);
console.log("Team 2:", team2);
console.log("Team 3:", team3);
/*

import { Telegraf,Context } from 'telegraf'


interface BotContext extends Context {
    myProp?: string
    myOtherProp?: number
}

enum Position {
    pos1,
    pos2,
    pos3,
    pos4,
    pos5,
    pos6
}

type Person = {
    name:string,
    skill:number,
    position:Position,
}


let Players:Person[] = [
    {name:"Solomon Niguse",position:Position.pos1,skill:95,},
    {name:"Jossy Tesfaye",position:Position.pos1,skill:82,},
    {name:"Befkadu Feleke",position:Position.pos1,skill:80,},

    {name:"Ahmed Abubeker",position:Position.pos2,skill:84,},
    {name:"Surafel Zelke",position:Position.pos2,skill:82,},
    {name:"Robel Ephrem",position:Position.pos2,skill:90,},

    {name:"Mike Lema",position:Position.pos3,skill:85,},
    {name:"Yordanos ",position:Position.pos3,skill:80,},
    {name:"Nathnal Almaw",position:Position.pos3,skill:82,},

    {name:"Bamlak Amare",position:Position.pos4,skill:78,},
    {name:"Natnal Bassa",position:Position.pos4,skill:76,},
    {name:"Salih Mohammed",position:Position.pos4,skill:75,},

    {name:"Mesele",position:Position.pos5,skill:72,},
    {name:"Zein",position:Position.pos5,skill:75,},
    {name:"Mike Firew",position:Position.pos5,skill:70,},

    {name:"Nuredin Ibrahim",position:Position.pos6,skill:71,},
    {name:"Eyuel Solomon",position:Position.pos6,skill:70,},
    {name:"Mika Lemlemu",position:Position.pos6,skill:65,}
]



let team1 : Person[];
let team2 : Person[];
let team3 : Person[];


const bot = new Telegraf<BotContext>(process.env.BOT_TOKEN??"")

bot.start((ctx:BotContext) => {
    ctx.reply('')
})


bot.command('/shuffle',(ctx:BotContext)=>{
    shuffle()

})



function shuffle() {
    let shuffleConter = 3
    Players.forEach((p)=>{
        let index = randomIntFromInterval(1,shuffleConter)

        switch (index) {
            case 1:
                team1.push(p)
                break;
            case 2:
                team2.push(p)
                break;
            case 3:
                team3.push(p)
                break;
            default:
                break;
        }
        if(shuffleConter==1){
            shuffleConter = 3
        }
        else {
            shuffleConter--
        }
    })
}

function randomIntFromInterval(min:number, max:number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}












bot.launch()
*/
