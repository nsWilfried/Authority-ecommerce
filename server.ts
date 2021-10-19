import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import 'localstorage-polyfill'
// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  global['localStorage'] = localStorage
  const bodyParser = require('body-parser'); 
  const domino = require('domino') ;
  const server = express();
  const stripe = require('stripe')('sk_test_51Imr5SDTXvZFtH7OQuaKJsx1adAGgebmhO8K9TjQhG2TkhhAJTtMLitibUY0kXyBRf4iBnR55fZV0MBSFFSXwkgS00clrI8hLS')
  const distFolder = join(process.cwd(), 'dist/Bricia/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
  
  const window = domino.createWindow(distFolder); // create object Window
  global['window'] = window;
  global['document'] = window.document
  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));
  server.set('view engine', 'html');
  server.set('views', distFolder);
  // Prise en charge du JSON.  
  server.use(bodyParser.json());  
    
  // Prise en charge des formulaires HTML.  
  server.use(bodyParser.urlencoded());  

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

 
  server.post('/webhooks/paygate', (req, res) => {
    console.log(req.body)
  })

  server.post('/create-checkout-session',  async(req, res) => {
    let data:any = [
    ]

    for(let p of req.body.data ){
      data.push({
        price: p.price, 
        name:p.name, 
        quantity: p.quantity
      })
    }

    let line: any= []
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
         shipping_rates: ['shr_1Jl1LADTXvZFtH7OyF00Urs7'], 
         mode: 'payment',
         line_items:line
       })
       res.json({ id: session.id });
       res.redirect(303, session.url)
   })

  
  
  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
