import { Injectable } from '@angular/core';
import {Product} from 'src/app/models/product.model'
import { NbToastrService } from '@nebular/theme';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  
  // la carte est égale aux produits présent dans le local storage
     cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]'  );
  // cart counter initialize to 0
  cartCounter = 0;


  constructor(
    private sn: NbToastrService
  ) { 

    // mettre à jour dynamiquement le compteur
    if (localStorage.getItem('cart') != null ) {
      for (let c of this.cart) {
        this.cartCounter += c.quantity;


      }
    }

   
  }

  
  
  /**
   *  ajouter au panier en cliquant sur l'un des produits
   * @param {Product} product  ===> correspond au produit cliqué
   * @returns {number} ===> retourne le compteur
   */

  addToCart(product) {


    /**
     * le panier récupère le contenu du localStorage 
     * le localStoarge peut retourner une chaine ou une valeur or , 
     * le json.parse()  a besoin d'une chaîne 
     */

    this.cart = JSON.parse(localStorage.getItem("cart") || '{}'  );

    
    //tableau qui permet d'ajouter des produits dans le local storage temporairement
    let localProducts:Product[] = []; 

    
    

      /**
       *  si les produits présents dans le localStorage sont nuls
       * alors on ajoute le produit cliqué dans le LS
       * on sauvegarde aussi le produit ajouté dans le LS
       * et ensuite on rafraîchit notre cart
       */

    // 
    if (localStorage.getItem('cart') === null ) {

      localProducts.push(product); 

      localStorage.setItem("cart", JSON.stringify(localProducts));
      this.cart = JSON.parse(localStorage.getItem("cart") || '{}' );


    }
    

      /**
       *Sinon s'il y'a des produits dans le local Storage alors
       * j'itère une boucle et je vérifie si le produit n'est pas déjà
       * dans la cart alors la j'incrémente de un sa quantity puis je
       *rafraîchit dans le LS et je retoure la cart
       */
    
    else {

      /**
       * @var {number} index
       */ 
      let index = -1;
    
      for (let c of this.cart) { 

    

          /**
           * si le produit est présent dans le panier alors
           * incrémenter la quantité du produi
           */
     

        if (c.id === product.id) {

        

          c.quantity += 1;
         

          localStorage.setItem("cart", JSON.stringify(this.cart) );
          index = c.id;


          break;
        }
      }


       /**
         * Sinon si c'est un nouveau produit alors je l'ajoute dans ma cart
         * et j'enregistre le produit dans le LS 
         */

      if (index == -1) {
       
        this.cart.push(product);
        localStorage.setItem("cart", JSON.stringify(this.cart));
      }

    }

    this.sn.show('Produit ajouté au panier', `${product.quantity} x ${product.name}`, {status: 'success'})
    this.cartCounter += 1;


    return this.cartCounter;
  }



  // retourner le prix total
  getSubtotal(): number {
    let subtotal:number = 0;

    if (localStorage.getItem('cart') != null) {
      for (let c of this.cart) {
        subtotal += c.price * c.quantity;
      }

    }
    return subtotal;

  }

  // supprimer le panier
  removeCart() {
    this.cartCounter = 0;
    localStorage.clear();

    return (this.cart = []);
  }


  /**
   * 
   * @param  {Product} product ===> correspond au produit cliqué et permet de retourner sa quantité afin de mettre à jour le compteur
   * @param  {number} index ===> correspond à l'index de l'élément dans le panier
   * @returns {Product[]}  ===> me retourne mon panier afin de l'ajouter en statique à la page
   */


  // supprimer un produit du panier
  removeCartProduct(product, index){

    this.cartCounter = this.cartCounter - product.quantity
    this.cart.splice(index, 1) //je supprime l'élement correspondant à l'index
    localStorage.setItem("cart", JSON.stringify(this.cart));

    return this.cart;
  
  }

  /**
   * 
   * @param c ===> increase and decrease cart product 
   */



  increaseProduct(c){

    c.quantity+=1
    // this.cartCounter+=1
    localStorage.setItem('cart' , JSON.stringify(this.cart))
  }

  decreaseProduct(c){

    --c.quantity
    // --this.cartCounter
    
    localStorage.setItem('cart', JSON.stringify(this.cart))
  }


  // empty cart 
  emptyCart() {
    this.cart = []
    this.cartCounter= 0
    return localStorage.removeItem('cart')
  }





}
