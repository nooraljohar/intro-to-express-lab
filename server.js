//import Express
const express = require('express');

//invoke express
const app = express();

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

//1. Be Polite, Greet the User
app.get('/greetings/:username',(req,res)=> {
    console.log(req.params.username);

    res.send(`<h1> Hello there, ${ req.params.username}! </h1>`);
})

//2. Rolling the Dice
app.get('/roll/:number', (req, res) => {
    
    const number = req.params.number;
    console.log(number);  
    if(isNaN(number)){
        return res.send('You must specify a number.');
    }

    const maxNumber = parseInt(number, 10);

    const rollResult = Math.floor(Math.random() * (maxNumber + 1));

    res.send(`You rolled a ${rollResult}.`);
});

//3. I Want THAT One!
app.get('/collectibles/:index',(req,res)=> {

const index = req.params.index;
console.log(req.params.index);

if (isNaN(index) || index < 0 || index >= collectibles.length) {
    return res.send('This item is not yet in stock. Check back soon!');
}
const item = collectibles[index];
 res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
})

//4. Filter Shoes by Query Parameters
app.get('/shoes',(req,res)=> {
    const { 'min-price': minPrice, 'max-price': maxPrice, type } = req.query;
    let filteredShoes = shoes;

    if(minPrice){
    filteredShoes.filter( shoe => shoe.price >= parseFloat(minPrice))
    }

    if(maxPrice){
        filteredShoes.filter( shoe => shoe.price <= parseFloat(maxPrice))
        }
    
    if(type){
            filteredShoes.filter( shoe => shoe.type.toLocaleLowerCase() === type.toLocaleLowerCase())
            }

    res.json(filteredShoes);
})

// Listen for requests on port 3000
app.listen(3000, () => {
    console.log('Listening on port 3000')
  })