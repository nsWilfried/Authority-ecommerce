const express = require('express')
const stripe = require('stripe')('sk_test_51Imr5SDTXvZFtH7OQuaKJsx1adAGgebmhO8K9TjQhG2TkhhAJTtMLitibUY0kXyBRf4iBnR55fZV0MBSFFSXwkgS00clrI8hLS')
const app = express()
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
 
let data = [
  {
    price: 500, 
    name: 'black', 
    quantity: 4
  }, 
  {
    price: 5000, 
    name: 'white', 
    quantity: 6 
  }
]

app.post('/create-checkout-session',  async(req, res) => {

 let line = []
  for(let product of data){
    line.push({
        price_data: {
          currency: 'xof',
          product_data: {
            name: product.name,
          },
          unit_amount: product.price,
        },
        quantity: product.quantity,
     
    })
  }
    const session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:4200/thankyou',
      cancel_url: 'http://localhost:4200/',
      payment_method_types: ['card'],
      mode: 'payment',
      line_items:line
    })
    res.json({ id: session.id });
    res.redirect(303, session.url)
})
app.listen(4242, () => console.log('Running on port 4242'));
