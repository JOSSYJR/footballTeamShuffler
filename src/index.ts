import express, { Application } from 'express'
import {botStart} from './bot';


const app: Application = express();
require('dotenv').config()


const port = 3000;



app.listen(port,async () => {

    botStart();

    console.log(`Listening on ${port}`)

});

process.on('SIGINT', () => {
    console.log('do SIGINT');
    process.exit();
});





/*


// @ts-ignore
var mixpanel = Mixpanel.init('87d3ae0567de42fc2ac62cd71d3fe195', {secret: "93006ae539eef6c5c88063c3dd13f305"});

// Assuming you have defined Status and ContractStatus enums somewhere in your code


// Function to generate and send user creation and update events
export async function generateUserEvents(date:number) {
        let random = generateRandomAmount(30,55)
        for (let i = 0; i < random; i++) {
            let id = faker.internet.mac();
            let firstName = faker.person.firstName();
            let lastName = faker.person.lastName();
            let userName = faker.internet.userName();

            mixpanel.people.set(id, {
                $first_name: firstName,
                $last_name: lastName,
                $created: date,
                userName: userName,
                status: Status.Verified
            });

            mixpanel.import("UserCreated", date, {
                distinct_id: id,
                userName: userName,
                firstName: firstName,
                lastName: lastName,
            });

            mixpanel.import("UserUpdated", date, {
                distinct_id: id,
                userName: userName,
                firstName: firstName,
                lastName: lastName,
            });

            await prisma.fakeUsers.create({
                data: {
                    id: id,
                    userName: userName,
                    firstName: firstName,
                    lastName: lastName,
                    status: Status.Active
                }
            });
        }
}

// Function to generate and send contract creation and update events
export function generateContractEvents(users:{ id: string; userName: string;contracts: { id: string, amount: number}[] }[], buyerCount:number, sellerCount:number, totalMoneyInEscrow:number, totalCompleteTransaction:number,date:number) {
    try {
        let moneyPerContract = totalMoneyInEscrow / (buyerCount + sellerCount);

        // Create contracts as buyers
        for (let i = 0; i < buyerCount; i++) {
            try {

                let user = users[i];
                let cid = faker.internet.mac();
                let buyerid = user.id;
                let sellerid = faker.helpers.arrayElement(users.filter(u => u.id !== buyerid)).id;
                let amount = moneyPerContract;
                let cname = faker.company.name();

                mixpanel.import("ContractCreated", date, {
                    distinct_id: cid,
                    userId: sellerid,
                    buyerId: buyerid,
                    sellerId: sellerid,
                    status: ContractStatus.Created,
                    amount: amount,
                    currency: "ETH",
                    fullyPaid: false,
                    name: cname,
                    contractCreationDate: date,
                    type: 'contract',
                });

                mixpanel.import("UserCreatedContract", date, {
                    distinct_id: buyerid,
                    contract_id: cid
                });

                users[i].contracts.push({ id: cid, amount: amount });
                console.log(users[i])
            }
            catch (e) {
                console.log("First For Loop")
                console.log(i)
                console.log(e)
            }
        }

        // Create contracts as sellers
        for (let i = 0; i < sellerCount; i++) {
            try {

                let user = users[buyerCount + i];
                let cid = faker.internet.mac();
                let sellerid = user.id;
                let buyerid = faker.helpers.arrayElement(users.filter(u => u.id !== sellerid)).id;
                let amount = moneyPerContract;
                let cname = faker.company.name();

                mixpanel.import("ContractCreated", date, {
                    distinct_id: cid,
                    userId: sellerid,
                    buyerId: buyerid,
                    sellerId: sellerid,
                    status: ContractStatus.Created,
                    amount: amount,
                    currency: "ETH",
                    fullyPaid: false,
                    name: cname,
                    contractCreationDate: date,
                    type: 'contract',
                });

                mixpanel.import("UserCreatedContract", date, {
                    distinct_id: buyerid,
                    contract_id: cid
                });

                users[i].contracts.push({ id: cid, amount: amount });
            }
            catch (e) {
                console.log("second For Loop")
                console.log(i)
                console.log(e)
            }
        }

        // Use contracts for total completed transactions
        for (let i = 0; i < totalCompleteTransaction; i++) {
            try {

                let user = users[i % users.length];
                let contract = faker.helpers.arrayElement(user.contracts);
                let cid = contract.id;
                let amount = contract.amount;

                mixpanel.import("ContractUpdated", date, {
                    distinct_id: cid,
                    userId: user.id,
                    buyerId: user.id,
                    sellerId: user.id,
                    status: ContractStatus.Approuved,
                    amount: amount,
                    currency: "ETH",
                    fullyPaid: true,
                    name: "Approved Transaction",
                    oldAmount: amount,
                    newAmount: amount,
                    contractCreationDate: date,
                    type: 'contract',
                });

                mixpanel.import("UserUpdatedContract", date, {
                    distinct_id: user.id,
                    contract_id: cid
                });
            }catch (e) {
                console.log("third For Loop")
                console.log(i)
                console.log(e)
                i+=10000000
            }
        }

        for (let i = 0; i < totalMoneyInEscrow;) {

            try {
                let user = users[i % users.length];
                let contract = faker.helpers.arrayElement(user.contracts);
                let cid = contract.id;
                let amount = contract.amount;

                mixpanel.import("ContractUpdated", date, {
                    distinct_id: cid,
                    userId: user.id,
                    buyerId: user.id,
                    sellerId: user.id,
                    status: ContractStatus.Paid,
                    amount: amount,
                    currency: "ETH",
                    fullyPaid: true,
                    name: "Paid Transaction",
                    oldAmount: amount,
                    newAmount: amount,
                    contractCreationDate: date,
                    type: 'contract',
                });

                i += amount

                mixpanel.import("UserUpdatedContract", date, {
                    distinct_id: user.id,
                    contract_id: cid
                });
            }catch (e) {
                console.log("Fourth For Loop")
                console.log(i)
                console.log(e)
                i+=100000
            }
        }
    }
    catch (e) {
        console.log(e)
    }
}


function generateRandomAmount(min:number, max:number) {
    // Generate a random amount within the specified range
    return Math.random() * (max - min) + min;
}

function createContractAsBuyer(min:number,max:number,date:number,buyerCount:number) {
    for (let i = 0; i < buyerCount; i++) {
        try {
            let id = faker.internet.mac();
            let firstName = faker.person.firstName();
            let lastName = faker.person.lastName();
            let userName = faker.internet.userName();

            let cid = faker.internet.mac();
            let buyerid = id;
            let sellerid = faker.internet.mac();
            let amount = generateRandomAmount(min,max);
            let cname = faker.company.name();

            mixpanel.import("ContractCreated", date, {
                distinct_id: cid,
                userId: sellerid,
                buyerId: buyerid,
                sellerId: sellerid,
                status: ContractStatus.Created,
                amount: amount,
                currency: "ETH",
                fullyPaid: false,
                name: cname,
                contractCreationDate: date,
                type: 'contract',
            });

            mixpanel.import("UserCreatedContract", date, {
                distinct_id: buyerid,
                contract_id: cid
            });

        } catch (e) {
            console.log("First For Loop")
            console.log(i)
            console.log(e)
        }
    }
}

function createContractAsSeller(min:number,max:number,date:number,sellerCount:number){
// Create contracts as sellers
    for (let i = 0; i < sellerCount; i++) {
        try {


            let cid = faker.internet.mac();
            let sellerid =  faker.internet.mac();
            let buyerid = faker.internet.mac();
            let amount = generateRandomAmount(min,max);
            let cname = faker.company.name();

            mixpanel.import("ContractCreated", date, {
                distinct_id: cid,
                userId: sellerid,
                buyerId: buyerid,
                sellerId: sellerid,
                status: ContractStatus.Created,
                amount: amount,
                currency: "ETH",
                fullyPaid: false,
                name: cname,
                contractCreationDate: date,
                type: 'contract',
            });

            mixpanel.import("UserCreatedContract", date, {
                distinct_id: buyerid,
                contract_id: cid
            });

        } catch (e) {
            console.log("second For Loop")
            console.log(i)
            console.log(e)
        }
    }
}

/!*
export function contractUpdatedApproved(min:number,max:number,date:number,totalCompleteTransaction:number,app:ContractStatus,adduser:boolean) {
// Use contracts for total completed transactions
    for (let i = 0; i < totalCompleteTransaction; i++) {
        try {

            let cid = !adduser ? "t" :  faker.internet.mac();
            let id =  !adduser ? "t" : faker.internet.mac();
            let amount = generateRandomAmount(min,max);

            mixpanel.import("ContractUpdated", date, {
                distinct_id: cid,
                userId: id,
                buyerId: id,
                sellerId: id,
                status: app,
                amount: amount,
                currency: "ETH",
                fullyPaid: true,
                name: "Approved Transaction",
                oldAmount: amount,
                newAmount: amount,
                contractCreationDate: date,
                type: 'contract',
            });

            mixpanel.import("UserUpdatedContract", date, {
                distinct_id: id,
                contract_id: cid
            });
        } catch (e) {
            console.log("third For Loop")
            console.log(i)
            console.log(e)
            i += 10000000
        }
    }
}
*!/


//Daily volume
async function contractCreateBuyr(min: number,date:number) {
    let buyer=0
        let random = min//generateRandomAmount(min, max)

        //buyer
        for (let i = 0; i < random;) {
            buyer++

            try {
                let id = faker.internet.mac();
                let cid = faker.internet.mac();
                let amount = generateRandomAmount(1000,3000);
                i += random
                console.log(i)

                let buyer = await getRandomUser()

                mixpanel.import("ContractCreated", date, {
                    distinct_id: cid,
                    userId: generateRandomAmount(0,1)==0 ? buyer.id : "t",
                    buyerId: buyer.id,
                    sellerId: "t",
                    status: ContractStatus.Created,
                    amount: random,
                    currency: "ETH",
                    fullyPaid: true,
                    name: "Unpaid Transaction",
                    contractCreationDate: date,
                    type: 'contract',
                });
                mixpanel.import("ContractUpdated", date, {
                    distinct_id: cid,
                    userId: generateRandomAmount(0,1)==0 ? buyer.id : "t",
                    buyerId: buyer.id,
                    sellerId: "t",
                    status: ContractStatus.Created,
                    amount: random,
                    currency: "ETH",
                    fullyPaid: true,
                    name: "Unpaid Transaction",
                    contractCreationDate: date,
                    type: 'contract',
                });

                mixpanel.import("UserCreatedContract", date, {
                    distinct_id: id,
                    contract_id: cid
                });


                await prisma.fakeContracts.create({
                    data:{
                        id: cid,
                        userId: generateRandomAmount(0,1)==0 ? buyer.id : "t",
                        buyerId: buyer.id,
                        sellerId: "t",
                        status: ContractStatus.Created,
                        amount: random,
                        currency: "ETH",
                        fullyPaid: true,
                        name: "Unpaid Transaction",
                        oldAmount: random,
                        newAmount: random,
                        contractCreationDate: date.toString(),
                        type: 'contract',
                    }
                })

            } catch (e) {
                console.log("Fourth For Loop")
                console.log(i)
                console.log(e)
                i += 100000
            }
        }
}

async function contractCreateSeller(min: number, max: number,date:number) {
    let seller=0,buyer=0
        let random = generateRandomAmount(min, max)

        //Seller
        for (let i = 0; i < random;) {
            seller++

            try {
                let id = faker.internet.mac();
                let cid = faker.internet.mac();
                let amount = generateRandomAmount(min, random);
                i+=random

                let seller = await getRandomUser()
                console.log(i)
                mixpanel.import("ContractCreated", date, {
                    distinct_id: cid,
                    userId: generateRandomAmount(0,1)==0 ? "t" : seller.id,
                    buyerId: "t",
                    sellerId: seller.id,
                    status: ContractStatus.Created,
                    amount: random,
                    currency: "ETH",
                    fullyPaid: true,
                    name: "Unpaid Transaction",
                    contractCreationDate: date,
                    type: 'contract',
                });
                mixpanel.import("ContractUpdated", date, {
                    distinct_id: cid,
                    userId: generateRandomAmount(0,1)==0 ? "t" : seller.id,
                    buyerId: "t",
                    sellerId: seller.id,
                    status: ContractStatus.Created,
                    amount: random,
                    currency: "ETH",
                    fullyPaid: true,
                    name: "Unpaid Transaction",
                    contractCreationDate: date,
                    type: 'contract',
                });

                mixpanel.import("UserCreatedContract", date, {
                    distinct_id: id,
                    contract_id: cid
                });


                await prisma.fakeContracts.create({
                    data:{
                        id: cid,
                        userId: generateRandomAmount(0,1)==0 ?  "t" : seller.id,
                        buyerId: "t",
                        sellerId: seller.id,
                        status: ContractStatus.Created,
                        amount: random,
                        currency: "ETH",
                        fullyPaid: true,
                        name: "Unpaid Transaction",
                        oldAmount: random,
                        newAmount: random,
                        contractCreationDate: date.toString(),
                        type: 'contract',
                    }
                })

            } catch (e) {
                console.log("Fourth For Loop")
                console.log(i)
                console.log(e)
                i += 100000
            }
        }
}


async function emptyContractCreateSeller(min: number,date:number) {
    let seller=0,buyer=0
        let random = min//generateRandomAmount(min, max)

        random = min//generateRandomAmount(min, max)
        //Seller
        for (let i = 0; i < random;) {
            seller++

            try {
                let id = faker.internet.mac();
                let cid = faker.internet.mac();
                let amount = generateRandomAmount(min, random);
                i++

                let seller = await getRandomUser()
                console.log(i)
                mixpanel.import("ContractCreated", date, {
                    distinct_id: cid,
                    userId: generateRandomAmount(0,1)==0 ? "t" : seller.id,
                    buyerId: "t",
                    sellerId: seller.id,
                    status: ContractStatus.Created,
                    amount: 0,
                    currency: "ETH",
                    fullyPaid: true,
                    name: "Unpaid Transaction",
                    contractCreationDate: date,
                    type: 'contract',
                });
                mixpanel.import("ContractUpdated", date, {
                    distinct_id: cid,
                    userId: generateRandomAmount(0,1)==0 ? "t" : seller.id,
                    buyerId: "t",
                    sellerId: seller.id,
                    status: ContractStatus.Created,
                    amount: 0,
                    currency: "ETH",
                    fullyPaid: true,
                    name: "Unpaid Transaction",
                    contractCreationDate: date,
                    type: 'contract',
                });

                mixpanel.import("UserCreatedContract", date, {
                    distinct_id: id,
                    contract_id: cid
                });


                await prisma.fakeContracts.create({
                    data:{
                        id: cid,
                        userId: generateRandomAmount(0,1)==0 ?  "t" : seller.id,
                        buyerId: "t",
                        sellerId: seller.id,
                        status: ContractStatus.Created,
                        amount: 0,
                        currency: "ETH",
                        fullyPaid: true,
                        name: "Unpaid Transaction",
                        oldAmount: 0,
                        newAmount: 0,
                        contractCreationDate: date.toString(),
                        type: 'contract',
                    }
                })

            } catch (e) {
                console.log("Fourth For Loop")
                console.log(i)
                console.log(e)
                i += 100000
            }
        }
}

async function emptyContractCreateBuyer(min: number, date: number) {
    let seller=0,buyer=0
        let random = min//generateRandomAmount(min, max)

        //buyer
        for (let i = 0; i < random;) {
            buyer++

            try {
                let id = faker.internet.mac();
                let cid = faker.internet.mac();
                let amount = generateRandomAmount(1000,3000);
                i ++
                console.log(i)

                let buyer = await getRandomUser()

                mixpanel.import("ContractCreated", date, {
                    distinct_id: cid,
                    userId: generateRandomAmount(0,1)==0 ? buyer.id : "t",
                    buyerId: buyer.id,
                    sellerId: "t",
                    status: ContractStatus.Created,
                    amount: 0,
                    currency: "ETH",
                    fullyPaid: true,
                    name: "Unpaid Transaction",
                    contractCreationDate: date,
                    type: 'contract',
                });
                mixpanel.import("ContractUpdated", date, {
                    distinct_id: cid,
                    userId: generateRandomAmount(0,1)==0 ? buyer.id : "t",
                    buyerId: buyer.id,
                    sellerId: "t",
                    status: ContractStatus.Created,
                    amount: 0,
                    currency: "ETH",
                    fullyPaid: true,
                    name: "Unpaid Transaction",
                    contractCreationDate: date,
                    type: 'contract',
                });

                mixpanel.import("UserCreatedContract", date, {
                    distinct_id: id,
                    contract_id: cid
                });


                await prisma.fakeContracts.create({
                    data:{
                        id: cid,
                        userId: generateRandomAmount(0,1)==0 ? buyer.id : "t",
                        buyerId: buyer.id,
                        sellerId: "t",
                        status: ContractStatus.Created,
                        amount: 0,
                        currency: "ETH",
                        fullyPaid: true,
                        name: "Unpaid Transaction",
                        oldAmount: 0,
                        newAmount: 0,
                        contractCreationDate: date.toString(),
                        type: 'contract',
                    }
                })

            } catch (e) {
                console.log("Fourth For Loop")
                console.log(i)
                console.log(e)
                i += 100000
            }
        }
}



async function contractUpdatedApproved(min: number, max: number,date:number) {
        let random = generateRandomAmount(min, max)
        console.log("if")
        //let random = generateRandomAmount(min, max)

        for (let i = 0; i < random;) {

            i++
            try {

                let contract = await getRandomContractIncomplete()
                //i+= contract.amount

                mixpanel.import("ContractUpdated", date, {
                    distinct_id: contract.id,
                    userId: generateRandomAmount(0,1)==0 ? contract.buyerId : contract.sellerId,
                    buyerId: contract.buyerId,
                    sellerId: contract.sellerId,
                    status: ContractStatus.Approuved,
                    amount: contract.amount,
                    currency: "ETH",
                    fullyPaid: true,
                    name: "Paid Transaction",
                    oldAmount: contract.amount,
                    newAmount: contract.amount,
                    contractCreationDate: date,
                    type: 'contract',
                });

                mixpanel.import("UserUpdatedContract", date, {
                    distinct_id: faker.internet.mac(),
                    contract_id: contract.id
                });


                await prisma.fakeContracts.update({
                    where:{
                        id:contract.id
                    },
                    data:{
                        id: contract.id,
                        userId: generateRandomAmount(0,1)==0 ? contract.buyerId : contract.sellerId,
                        buyerId: contract.buyerId,
                        sellerId: contract.sellerId,
                        status: ContractStatus.Approuved,
                        amount: contract.amount,
                        currency: "ETH",
                        fullyPaid: true,
                        name: "Paid Transaction",
                        oldAmount: contract.amount,
                        newAmount: contract.amount,
                        contractCreationDate: date.toString(),
                        type: 'contract',
                    }
                })
            }
            catch (e) {
                console.log("Fourth For Loop")
                console.log(i)
                console.log(e)
                i += 100000
            }
        }
}


async function contractUpdatedPaid(min: number, max: number,date:number) {
        let random = generateRandomAmount(min, max)
        console.log("ii")

        for (let i = 0; i < random;) {

            console.log("i")

            try {
                let contract = await getRandomContractIncomplete()
                contract.amount = random
                i+= contract.amount

                mixpanel.import("ContractUpdated", date, {
                    distinct_id: contract.id,
                    userId: generateRandomAmount(0,1)==0 ? contract.buyerId : contract.sellerId,
                    buyerId: contract.buyerId,
                    sellerId: contract.sellerId,
                    status: ContractStatus.Paid,
                    amount: contract.amount,
                    currency: "ETH",
                    fullyPaid: true,
                    name: "Paid Transaction",
                    oldAmount: contract.amount,
                    newAmount: contract.amount,
                    contractCreationDate: date,
                    type: 'contract',
                });

                mixpanel.import("UserUpdatedContract", date, {
                    distinct_id: faker.internet.mac(),
                    contract_id: contract.id
                });


                await prisma.fakeContracts.update({
                    where:{
                        id:contract.id
                    },
                    data:{
                        id: contract.id,
                        userId: generateRandomAmount(0,1)==0 ? contract.buyerId : contract.sellerId,
                        buyerId: contract.buyerId,
                        sellerId: contract.sellerId,
                        status: ContractStatus.Paid,
                        amount: contract.amount,
                        currency: "ETH",
                        fullyPaid: true,
                        name: "Paid Transaction",
                        oldAmount: contract.amount,
                        newAmount: contract.amount,
                        contractCreationDate: date.toString(),
                        type: 'contract',
                    }
                })

            } catch (e) {
                console.log("Fourth For Loop")
                console.log(i)
                console.log(e)
                i += 100000
            }
        }
}



async function getRandomUser() {
    let users = await prisma.fakeUsers.findMany()
    console.log(Math.floor(generateRandomAmount(0,users.length-1)))
    console.log(users[Math.floor(generateRandomAmount(0,users.length-1))])
    return users[Math.floor(generateRandomAmount(0,users.length-1))]
}
async function getRandomContract() {
    let range = await prisma.fakeContracts.count()
    let users = await prisma.fakeContracts.findMany()
    return users[generateRandomAmount(0,range)]
}
async function getRandomContractIncomplete() {
    let users = await prisma.fakeContracts.findMany({
        where:{
            NOT:{
                status: ContractStatus.Approuved
            },
        }
    })
    return users[Math.floor(generateRandomAmount(0,users.length-1))]
}*/
