import { Telegraf,Context } from 'telegraf'
enum Position {


    pos1 = "pos1",
    pos2 = "pos2",
    pos3 = "pos3",
    pos4 = "pos4",
    pos5 = "pos5",
    pos6 = "pos6",
}

type Person = {
    name:string,
    skill:number,
    position:Position,
}

let Players:Person[] = [
    {name:"Solomon Niguse",position:Position.pos1,skill:92,},
    {name:"Jossy Tesfaye",position:Position.pos1,skill:82,},
    {name:"Befkadu Feleke",position:Position.pos1,skill:81,},

    {name:"Ahmed Abubeker",position:Position.pos2,skill:85,},
    {name:"Surafel Zelke",position:Position.pos2,skill:80,},
    {name:"Robel Ephrem",position:Position.pos2,skill:85,},

    {name:"Mike Lema",position:Position.pos3,skill:82,},
    {name:"Yordanos ",position:Position.pos3,skill:78,},
    {name:"Nathnal Almaw",position:Position.pos3,skill:80,},

    {name:"Bamlak Amare",position:Position.pos4,skill:75,},
    {name:"Natnal Bassa",position:Position.pos4,skill:72,},
    {name:"Salih Mohammed",position:Position.pos4,skill:68,},

    {name:"Mesele",position:Position.pos5,skill:65,},
    {name:"Zein",position:Position.pos5,skill:62,},
    {name:"Mike Firew",position:Position.pos5,skill:58,},

    {name:"Nuredin Ibrahim",position:Position.pos6,skill:50,},
    {name:"Eyuel Solomon",position:Position.pos6,skill:55,},
    {name:"Mika Lemlemu",position:Position.pos6,skill:45,}
]
function shuffleAndTeamPlayers(players: Person[]): { team1: Person[], team2: Person[], team3: Person[] } {
    let shuffledPlayers: Person[], team1: Person[] = [], team2: Person[] = [], team3: Person[] = [];

    // Group players by position
    let playersByPosition: { [key: string]: Person[] } = {};
    for (let player of players) {
        if (!playersByPosition[player.position]) {
            playersByPosition[player.position] = [];
        }
        playersByPosition[player.position].push(player);
    }

    // Shuffle each position group
    for (let position in playersByPosition) {
        let group = playersByPosition[position];
        for (let i = group.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [group[i], group[j]] = [group[j], group[i]];
        }
    }

    // Distribute players to teams
    let teamIndex = 0;
    for (let position in playersByPosition) {
        let group = playersByPosition[position];
        for (let player of group) {
            if (teamIndex % 3 === 0) {
                team1.push(player);
            } else if (teamIndex % 3 === 1) {
                team2.push(player);
            } else {
                team3.push(player);
            }
            teamIndex++;
        }
    }
    console.log("Total skill of Team 1:", sumSkill(team1));
    console.log("Total skill of Team 2:", sumSkill(team2));
    console.log("Total skill of Team 3:", sumSkill(team3));
    return { team1, team2, team3 };

}
function sumSkill(team: Person[]): number {
    return team.reduce((sum, player) => sum + player.skill, 0);
}

interface BotContext extends Context {
    myProp?: string
    myOtherProp?: number
}
const bot = new Telegraf<BotContext>(process.env.BOT_TOKEN??"")

export function botStart() {
    bot.start((ctx: BotContext) => {
        ctx.reply('')
    })


    bot.command('/shuffle', (ctx: BotContext) => {

        let {team1, team2, team3} = shuffleAndTeamPlayers(Players);

        console.log("Team 1:", team1);
        console.log("Team 2:", team2);
        console.log("Team 3:", team3);

        ctx.reply("Team 1: " + team1.map(player => player.name).join(", "));
        ctx.reply("Team 2: " + team2.map(player => player.name).join(", "));
        ctx.reply("Team 3: " + team3.map(player => player.name).join(", "));
    })
    bot.launch()

}
