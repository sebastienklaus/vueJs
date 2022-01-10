const TOKEN = 'sebastienklaus7@gmail.com';
const API = 'https://tools.sopress.net/iut/panier/api/';


var app = new Vue({
    el :'#app',
    created(){
        //exécute quand l'instance de Vue est prête
        console.log('vue js');

        this.chargerProduits();
        this.chargerPanier();

    },
    watch : {
        field(){
            this.chargerProduits();
        },
        sort(){
            this.chargerProduits();
        },
        page(){
            this.chargerProduits();
        }

    },
    data : {
        field: "nom",
        page: 1,
        sort: 'asc',
        listeProduits : [],
        contenuPanier : [],

    },
    methods : { 
        chargerProduits(){
            fetch(`${API}/products?token=${TOKEN}`).then( (response) => {
                return response.json();
              }).then((data) => {
                this.listeProduits = data;
                });
        },
        chargerPanier(){
            fetch(`${API}/cart?token=${TOKEN}`).then( (response) => {
                return response.json();
              }).then((data) => {
                this.contenuPanier = data
                console.log(data);
            });
        },
        ajouterAuPanier(id) {
            fetch(`${API}cart/${id}?token=${TOKEN}`,{method: "POST"}).then( (response) => {
                return response.json();
              }).then( (contenuPanier) => {
                this.contenuPanier = contenuPanier;
              })
        },
        removeElementPanier(id){
            fetch(`${API}/cart/${id}?token=${TOKEN}`,{method: "DELETE"}).then((response) => {
              return response.json();
            }).then((contenuPanier) => {
                this.contenuPanier = contenuPanier;
            })
        },
        viderPanier() {
            fetch(`${API}cart?token=${TOKEN}`,{method: "DELETE"});
            this.contenuPanier = [];
        },
        commander(){
            let compteur = 0;
            this.contenuPanier.forEach(lignePanier => {
                fetch(`${API}/cart/${lignePanier.id}/buy?token=${TOKEN}`,{method: "PUT"}).then(function (response) {
                    return response.json();
                  }).then( (data) => {
                      if(data.success){
                          lignePanier.ok = true;
                          compteur++;
                      }
                      else{
                          el = lignePanier.id;
                          console.log(`The product ${lignePanier.id} is not order`);
                      }

                      if(compteur == this.contenuPanier.length){
                          setTimeout(() => {
                              console.log('toutes');
                          }, 1000);
                      }
                  })
            });
            
        }

        
    },
    computed : {
        
    }
});
