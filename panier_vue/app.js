const TOKEN = 'sebastienklaus7@gmail.com';
const API = 'https://tools.sopress.net/iut/panier/api/';


var app = new Vue({
    el :'#app',
    created(){
        console.log('vue js');

        this.chargerProduits();
        this.chargerPanier();


    },
    data : {
        listeProduits : [],
        contenuPanier : [],

    },
    methods : { 
        chargerProduits(){
            fetch(`${API}/products?token=${TOKEN}`).then( (response) => {
                return response.json();
              }).then((data) => {
                //panier.modules.actions.construireListeProduits(produits);
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

        }

        
    },
    computed : {
        
    }
});
