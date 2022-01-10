'use strict';

//token pour identifier chaque user
const TOKEN = 'sebastienklaus7@gmail.com';
const API = 'https://tools.sopress.net/iut/panier/api/';

(function() {
  


  let panier = (function() {
    return {
      modules : {}
    }
  })();

  panier.modules.actions = (function() {

    // utilisation de l'api pour construire la liste de produits avec l'appel de la fonction construireListeProduits()
    // produits sera donc la liste de produits retourné par l'api



    //fonctions concernant la liste des produits
    function construireListeProduits(lesProduits){
      let productsContainer = document.querySelector('#products');
      let html = [];

      // pour chaque produit, on l'ajoute dans le tableau html pour les afficher
      lesProduits.forEach(produit => {
        html.push(construireUnProduit(produit));       
      });
      productsContainer.innerHTML = html.join('');
    }

    function construireUnProduit(unProduit) {
      return `<div class='product'>
      <h2>${unProduit.nom}</h2>
      <img src='${unProduit.photo}'>
      <p>${unProduit.prix}</p>
      <p>${unProduit.description}</p>
      <button class="add-button" data-id="${unProduit.id}">Ajouter au panier</button>
      </div>`
    }

    //fonctions concernant le panier
    function construirePanier(contenuPanier){
      let panierContent = document.querySelector("#panier-content");
      let panierTotal = document.querySelector("#panier-total");

      let html = [];
      let total = 0;
      console.log(contenuPanier);
      // pour chaque produit, on l'ajoute dans le tableau html pour les afficher
      contenuPanier.forEach(produit => {
        html.push(construireLignePanier(produit));
        total += produit.prix;       
      });
      panierContent.innerHTML = html.join('');
      panierTotal.innerHTML = `<p>Prix total : ${total}</p>`;


      //bouton retirer element du panier
      document.querySelectorAll('.ligneProduit button').forEach(bouton =>{
        bouton.addEventListener('click', e => {
          let idElement = e.target.dataset.id;
          removeElementPanier(idElement);
        })
      })
    }

    function construireLignePanier(lignePanier) {
      return `<section class='ligneProduit' data-id="${lignePanier.id}">
      <p>Nom : ${lignePanier.nom} Qte : ${lignePanier.qte}</p>
      <p>Prix : ${lignePanier.prix}</p>
      <button data-id="${lignePanier.id}">Remove</button>
      </section>`
    }

    //fonction pour ajouter un produit au panier en construisant le panier
    function addToCart(id) {
      fetch(`${API}cart/${id}?token=${TOKEN}`,{method: "POST"}).then(function (response) {
        console.log(response.status);
        return response.json();
      }).then(function (contenuPanier) {
        construirePanier(contenuPanier);
      })
    }

    //fonction pour supprimer un élément du panier
    function removeElementPanier(id){
      fetch(`${API}/cart/${id}?token=${TOKEN}`,{method: "DELETE"}).then(function (response) {
        return response.json();
      }).then(function (contenuPanier) {
        construirePanier(contenuPanier);
      })
    }

    //fonction pour vider le produit au panier en construisant le nouveau panier
    function emptyCart() {
      fetch(`${API}cart?token=${TOKEN}`,{method: "DELETE"}).then(function (response) {
        return response.json();
      }).then(function (contenuPanier) {
        construirePanier(contenuPanier);
      })
    }

    //fonction pour commander le contenu du panier
   
    function orderCart(contenuPanier){
      console.warn("panier");
      console.log(contenuPanier);
      contenuPanier.forEach(lignePanier => {
        orderProduct(lignePanier.id, contenuPanier.length)
      })
    }

    
    function orderProduct(idProduct, nbrProducts) {
      fetch(`${API}/cart/${idProduct}/buy?token=${TOKEN}`,{method: "PUT"}).then(function (response) {
        return response.json();
      }).then(function (orderStatus) {
        let compteur = 0;

        if(orderStatus.success) {
          console.log(orderStatus);
          construireLigneProduitCommande(orderStatus.product);
          compteur++;
        }

        if(compteur === nbrProducts) {
          alert("=== Tous les produits sont commandés ===");
          compteur = 0;
        }
      }) 
    }

    function construireLigneProduitCommande(idProduitCommande) {
      let productInCart = document.querySelector(`section[data-id="${idProduitCommande}"]`);
      // data-id pas id. 
      productInCart.style.backgroundColor = "#70cf73";
    }

    return {
      construirePanier,
      construireListeProduits,
      addToCart,
      removeElementPanier,
      emptyCart,
      orderCart
    }
  })();

  panier.modules.app = (function() {
    return {
      start() {
          /***
         * Chercher le contenu du panier
         */
        fetch(`${API}/cart?token=${TOKEN}`).then(function (response) {
          return response.json();
        }).then(function (contenu) {
          panier.modules.actions.construirePanier(contenu);
        });

        /***
         * Chercher liste de produit
         */

        let page = 1;
        let btnPreview = document.querySelector("#prev-page");
        let btnNext = document.querySelector("#next-page");

        btnPreview.addEventListener('click', event => {
          page--;
          if (page == 1) {
            btnPreview.style.pointerEvents = "none";
          }
        })

        btnNext.addEventListener('click', event => {
          page++;
          console.log(page);
        })

        fetch(`${API}/products?page=${page}&token=${TOKEN}`).then(function (response) {
          return response.json();
        }).then(function (produits) {
          panier.modules.actions.construireListeProduits(produits);
          
          /***
           * Bouttons d'ajout
           */
          document.querySelectorAll('.add-button').forEach(bouton => {
            bouton.addEventListener('click', event => {
              let id = event.target.dataset.id; // dataset mieux, sécurité, gère data
              panier.modules.actions.addToCart(id);
            })
          })

          /***
           * Boutton vider le panier
           */
          let btnEmptyCart = document.querySelector('#empty');
          btnEmptyCart.addEventListener('click', event => {
            panier.modules.actions.emptyCart()
          })

          //Bouton Commander
          let btnBuy = document.querySelector('#buy');
          btnBuy.addEventListener('click', event => {

            // Checher contenu du panier, et l'envoie à la méthode commanderPanier
            fetch(`${API}/cart?token=${TOKEN}`).then(function (response) {
              return response.json();
            }).then(function (contenu) {
              panier.modules.actions.orderCart(contenu)
            });
          })
          
        })

      }
    }
  })();
  
  window.addEventListener("load", panier.modules.app.start)
})();