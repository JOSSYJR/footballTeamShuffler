import { Telegraf,Context } from 'telegraf'
import * as cron from 'node-cron';
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
    {name:"Solomon Niguse",position:Position.pos1,skill:95,},
    {name:"Jossy Tesfaye",position:Position.pos1,skill:82,},
    {name:"Ahmed Abubeker",position:Position.pos1,skill:85,},

    {name:"Befkadu Feleke",position:Position.pos2,skill:81,},
    {name:"Surafel Zelke",position:Position.pos2,skill:80,},
    {name:"Robel Ephrem",position:Position.pos2,skill:85,},

    {name:"Mike Lema",position:Position.pos3,skill:85,},
    {name:"Yordanos ",position:Position.pos3,skill:78,},
    {name:"Nathnal Almaw",position:Position.pos3,skill:80,},

    {name:"Bamlak Amare",position:Position.pos4,skill:75,},
    {name:"Natnal Bassa",position:Position.pos4,skill:72,},
    {name:"Salih Mohammed",position:Position.pos4,skill:68,},

    {name:"Misle",position:Position.pos5,skill:65,},
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

    let isFair = false;
    while (!isFair) {
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

        isFair = isFairDistribution(team1, team2, team3);
        if (!isFair) {
            // Reset teams for reshuffling
            team1 = [];
            team2 = [];
            team3 = [];
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
function isFairDistribution(team1: Person[], team2: Person[], team3: Person[]): boolean {
    const skill1 = sumSkill(team1);
    const skill2 = sumSkill(team2);
    const skill3 = sumSkill(team3);

    return Math.abs(skill1 - skill2) <= 5 && Math.abs(skill1 - skill3) <= 5 && Math.abs(skill2 - skill3) <= 5;
}
interface BotContext extends Context {
    myProp?: string
    myOtherProp?: number
}
const bot = new Telegraf<BotContext>("6556597198:AAFwMfLfidqewE0oZdDHf7ypvMw9A5AjhVI")

let adminID = ['331951134','419296454','878661162']
export async function botStart() {
    bot.use((ctx, next) => {
        const chatType = ctx.chat?.id;

        // Check if the message or event is from a group chat
        if (chatType && chatType > 0) {
            return next();
        }
        else if (
            ctx.message &&
            "text" in ctx.message &&
            ctx.message.text &&
            ctx.message.text.startsWith("/")
        ) {
            return next();
        } else if (ctx.callbackQuery) {
            return next();
        }
        return;
    });
    await bot.telegram.setMyCommands([
        {
            command: "/test",
            description: "test command",
        },
        {
            command: "/shuffle",
            description: "new shuffled teams",
        },
        {
            command: "/attendance",
            description: "Attendance for the week",
        },
    ]);

    bot.command('test', (ctx: BotContext) => {
        ctx.sendDice()
    })

    bot.command('attendance', (ctx: BotContext) => {
    if(adminID.includes(ctx.message!.from.id.toString())){
        bot.telegram.sendPoll(Number(process.env.GroupID), "Are you gonna come this week?", ["Yes", "No"], { is_anonymous: false });
    }
    else {
        console.log("Ignored")
    }
})
    bot.command('shuffle', (ctx: BotContext) => {

        if(adminID.includes(ctx.message!.from.id.toString())){
            let {team1, team2, team3} = shuffleAndTeamPlayers(Players);

            console.log("Team 1:", team1);
            console.log("Team 2:", team2);
            console.log("Team 3:", team3);


            ctx.reply("Team 1: " + team1.map(player => player.name).join(", "));
            ctx.reply("Team 2: " + team2.map(player => player.name).join(", "));
            ctx.reply("Team 3: " + team3.map(player => player.name).join(", "));


        }
        else {
            console.log("Ignored")
        }
    })


    cron.schedule('0 6 * * 4', () => {
        bot.telegram.sendPoll(Number(process.env.GroupID), "Are you gonna come this week?", ["Yes", "No"], { is_anonymous: false });
    });


    cron.schedule('0 6 * * 5', () => {
        let {team1, team2, team3} = shuffleAndTeamPlayers(Players);

        bot.telegram.sendMessage(Number(process.env.GroupID), "Team 1: " + team1.map(player => player.name).join(", "));
        bot.telegram.sendMessage(Number(process.env.GroupID), "Team 2: " + team2.map(player => player.name).join(", "));
        bot.telegram.sendMessage(Number(process.env.GroupID), "Team 3: " + team3.map(player => player.name).join(", "));
    });
    bot.launch()

}