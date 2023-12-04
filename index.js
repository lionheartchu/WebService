//import the express library and assign it to a variable
import express from 'express'
import emoji from 'random-food-emoji'

import cors from 'cors'

//create an instance of an express application
const app=express()
app.use(express.json())

app.use(cors({
    origin: '*'
}));

const port=process.env.PORT || 3001

app.get('/food',(req,res)=>{
    const randomFood= emoji()
    console.log('Random Food:', randomFood)
    res.type('text/plain').json(randomFood)
})

// const foodEmoji = emoji()
// console.log(foodEmoji)

/* 
query params
www.google.com/?name=Gloria
req.query

url params (good for indentifying results)
www.google.com/name/:Gloria
req.params
*/

//use query params to sort resources
let names=['White tea','Yellow tea','Green tea','Oolong tea','Pu-erh tea/Fermented tea','Black tea']
let teaCaffined ={
    "White":{
        ChineseName:"白茶",
        procession: "wilted and unoxidized",
        color: "pale yellow to light green",
        taste:" delicate, light, slightly sweet",
        pairings: [' salads',' fruit',' delicate pastries'],
        normal:"white",
    },
    "Yellow":{
        ChineseName:"黄茶",
        procession: "unwilted and unoxidized but allowed to yellow",
        color: "pale yellow",
        taste:" delicate, sweet, smooth",
        pairings: [' light pastries', ' seafood', ' fresh fruit'],
        normal:"yellow",
    },
    "Green":{
        ChineseName:"绿茶",
        procession: "unwilted and unoxidized",
        color: "light green to yellow",
        taste:" fresh, grassy, slightly astringent",
        pairings: [' sushi', ' salads', ' seafood'],
        normal:"green",
    },
    "Oolong":{
        ChineseName:"乌龙茶",
        procession: "wilted, bruised, and partially oxidized",
        color: "green to dark brown, depending on oxidation level",
        taste:" ranges from light and floral to dark and roasted",
        pairings: [' Chinese cuisine',' seafood', ' stir-fries'],
        normal:"oolong",
    },
    "Pu-erh":{
        ChineseName:"普洱茶",
        procession: "fermented/composted green tea",
        color: "dark brown to black",
        taste:" earthy, rich, sometimes sweet",
        pairings: [' dim sum', ' hearty stews', ' strong-flavored dishes'],
        normal:"pu-erh",
    },
    "Black":{
        ChineseName:"红茶",
        procession: "wilted, sometimes crushed, and fully oxidized",
        color: "dark amber to reddish-brown",
        taste:" bold, robust, malty/fruity",
        pairings: [' grilled meats', ' spicy dishes', ' desserts'],
        normal:"black",
    },
}
let teaDecaffined ={
    "Lavender Chamomile":{
        ingredients:"chamomile flowers, lavender buds",
        taste:" Delightfully floral with distinct lavender notes",
        benefits:[' stress relief', ' supports sleeping', ' digesttion help'],
        normal:"lavender chamomile",
    },
    "Blood Orange":{
        ingredients:" apple, rosehips, hibiscus, beet root, orange peel, natural orange flavor, marigold, safflowers",
        taste:" fresh citrus character with a delicate sweetness reminiscent of freshly squeezed oranges",
        benefits:[' rich in antioxidants', ' heart health', ' digesttion help'],
        normal:"blood orange",
    },
}

///127.0.0.1:3001?name=white
app.get('/',(req,res)=>{
    let teaNames=[]
    if(req.query.name=="white"){
        names.forEach(name =>{
            if(name.toLowerCase().includes("white")){
                console.log(name)
                teaNames.push(names[0])
                teaNames.push('Chinese name: '+teaCaffined["White"].ChineseName)
            }
        })
    }
    if(req.query.name=="yellow"){
        names.forEach(name =>{
            if(name.toLowerCase().includes("yellow")){
                console.log(name)
                teaNames.push(names[1])
                teaNames.push('Chinese name: '+teaCaffined["Yellow"].ChineseName)
            }
        })  
    }
    if(req.query.name=="green"){
        names.forEach(name =>{
            if(name.toLowerCase().includes("green")){
                console.log(name)
                teaNames.push(names[2])
                teaNames.push('Chinese name: '+teaCaffined["Green"].ChineseName)
            }
        })
    }
    if(req.query.name=="oolong"){
        names.forEach(name =>{
            if(name.toLowerCase().includes("oolong")){
                console.log(name)
                teaNames.push(names[3])
                teaNames.push('Chinese name: '+teaCaffined["Oolong"].ChineseName)
            }
        })
    }
    if(req.query.name=="fermented"||req.query.name=="pu-erh"){
        names.forEach(name =>{
            if(name.toLowerCase().includes("fermented")||name.toLowerCase().includes("pu-erh")){
                console.log(name)
                teaNames.push(names[4])
                teaNames.push('Chinese name: '+teaCaffined["Pu-erh"].ChineseName)
            }
        })
        
    }
    if(req.query.name=="black"){
        names.forEach(name =>{
            if(name.toLowerCase().includes("black")){
                console.log(name)
                teaNames.push(names[5])
                teaNames.push('Chinese name: '+teaCaffined["Black"].ChineseName)
            }
        })
    }
    //res.send(teaNames)
    const singleString=teaNames.join(', ')
    res.json(singleString)
})


///127.0.0.1:3001/name/black/pairing
app.get('/name/:nameInput/procession', (req, res) => {
    const requestedName = req.params.nameInput
    const matchingTea = Object.values(teaCaffined).find(tea => tea.normal ===requestedName)

    if (matchingTea){
        const teaProcession = matchingTea.procession
        res.json('The processing method of '+`${requestedName}`+' tea is: '+teaProcession)
    }else{
        res.json("Tea not found with the specified name")
    }
})
app.get('/name/:nameInput/color', (req, res) => {
    const requestedName = req.params.nameInput
    const matchingTea = Object.values(teaCaffined).find(tea => tea.normal ===requestedName)

    if (matchingTea){
        const teaColor = matchingTea.color
        res.json('The tea leaves color of '+`${requestedName}`+' tea is: '+teaColor)
    }else{
        res.json("Tea not found with the specified name")
    }
})
app.get('/name/:nameInput/taste', (req, res) => {
    const requestedName = req.params.nameInput
    const matchingTea = Object.values(teaCaffined).find(tea => tea.normal ===requestedName)

    if (matchingTea){
        const teaTaste = matchingTea.taste
        res.json('The taste of '+`${requestedName}`+' tea is: '+teaTaste)
    }else{
        res.json("Tea not found with the specified name")
    }
})
app.get('/name/:nameInput/pairing', (req, res) => {
    const requestedName = req.params.nameInput
    const matchingTea = Object.values(teaCaffined).find(tea => tea.normal ===requestedName)

    if (matchingTea){
        const teaPairing = matchingTea.pairings
        res.json('The recommended pairing of '+`${requestedName}`+' tea is: '+teaPairing)
    }else{
        res.json("Tea not found with the specified name")
    }
})

//for decaffined tea
app.get('/:teaInput/taste', (req, res) => {
    const requestedName = req.params.teaInput
    const matchingTea = Object.values(teaDecaffined).find(tea => tea.normal ===requestedName)

    if (matchingTea){
        const teaTaste= matchingTea.taste
        res.json('The taste of '+`${requestedName}`+' tea is: '+teaTaste)
    }else{
        res.json("Tea not found with the specified name")
    }
})
app.get('/:teaInput/ingredients', (req, res) => {
    const requestedName = req.params.teaInput
    const matchingTea = Object.values(teaDecaffined).find(tea => tea.normal ===requestedName)

    if (matchingTea){
        const teaIngredients= matchingTea.ingredients
        res.json('The ingredients of '+`${requestedName}`+' tea are: '+teaIngredients)
    }else{
        res.json("Tea not found with the specified name")
    }
})
app.get('/:teaInput/benefits', (req, res) => {
    const requestedName = req.params.teaInput
    const matchingTea = Object.values(teaDecaffined).find(tea => tea.normal ===requestedName)

    if (matchingTea){
        const teaBenefits= matchingTea.benefits
        res.json('The benefits of '+`${requestedName}`+' tea are: '+teaBenefits)
    }else{
        res.json("Tea not found with the specified name")
    }
})

//set up the application to listen on the specified port
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})