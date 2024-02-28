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
    {name:"Solomon Niguse",position:Position.pos1,skill:0,},
    {name:"Jossy Tesfaye",position:Position.pos1,skill:0,},
    {name:"Befkadu Feleke",position:Position.pos1,skill:0,},

    {name:"Ahmed Abubeker",position:Position.pos2,skill:0,},
    {name:"Surafel Zelke",position:Position.pos2,skill:0,},
    {name:"Robel Ephrem",position:Position.pos2,skill:0,},

    {name:"Mike Lema",position:Position.pos3,skill:0,},
    {name:"Yordanos ",position:Position.pos3,skill:0,},
    {name:"Nathnal Almaw",position:Position.pos3,skill:0,},

    {name:"Bamlak Amare",position:Position.pos4,skill:0,},
    {name:"Natnal Bassa",position:Position.pos4,skill:0,},
    {name:"Salih Mohammed",position:Position.pos4,skill:0,},

    {name:"Mesele",position:Position.pos5,skill:0,},
    {name:"Zein",position:Position.pos5,skill:0,},
    {name:"Mike Firew",position:Position.pos5,skill:0,},

    {name:"Nuredin Ibrahim",position:Position.pos6,skill:0,},
    {name:"Eyuel Solomon",position:Position.pos6,skill:0,},
    {name:"Mika Lemlemu",position:Position.pos6,skill:0,}
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
