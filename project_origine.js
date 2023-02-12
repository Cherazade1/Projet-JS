// === constant ===

const MAX_QTY = 9; // Quantité maximale de produits
const productIdKey = "product"; // identifiants des produits
const orderIdKey = "order"; // ordre des identifiants
const inputIdKey = "qte"; // insertion des identifiants

// === global variables  ===
// the total cost of selected products 
var total = 0; // affiche le total du panier

// function called when page is loaded, it performs initializations 
function init() {
    createShop(); // appeler la variable createshop
}
window.addEventListener("load", init); // charge le code quand la page s'ouvre

// usefull functions
/*
 * create and add all the div.produit elements to the div#boutique element
 * according to the product objects that exist in 'catalog' variable
 */
function createShop() {
    var shop = document.getElementById("boutique"); // sélectionner l'Id boutique
    var elements = []; 
    for(var i = 0; i < catalog.length; i++) {
        shop.appendChild(createProduct(catalog[i], i));
        elements[i]=catalog[i].name;
    }

    var filter = document.getElementById("filter");
    console.log ("filter = "+filter);
    filter.addEventListener ('keyup', function() {
    })

    const searchinput = document.getElementById ("filter");

    searchinput.addEventListener("keyup",function() {
        let input = filter.value;

        let x = elements.filter(element => !element.includes(input) );

        for(i=0; i<x.length; i++) {
            let toFilterName = x[i];

            console.log(toFilterName);

            for(j=0; j < elements.length; j++) {
                if (toFilterName == elements[j]) {
                    let item = document.getElementById(j + "-product");
                    item.style.display = "none";
                }
                
                
            }
        }
    })

}

/*
 * create the div.produit elment corresponding to the given product
 * The created element receives the id "index-product" where index is replaced by param's value
 * @param product (product object) = the product for which the element is created
 * @param index (int) = the index of the product in catalog, used to set the id of the created element
 */
var createProduct = function(product, index) { // créer la div product
    var block = document.createElement("div"); // créer la variable block, puis avec la méthode createElement pour créer une div
    block.className = "produit";// afficher le produit
    
    block.id = index + "-" + productIdKey; // concaténer  index avec les identifiants de produits
    block.appendChild(createBlock("h4", product.name)); // mettre en forme le titre des noms des produits
 
    block.appendChild(createFigureBlock(product.image)); // renvoyer à la variable createFigureBlock qui permet d'afficher les images

    block.appendChild(createBlock("div", product.description, "description")); //créer et fabriquer la div description et ajouter la description.
    
    block.appendChild(createBlock("div", product.price, "prix")); // créer et fabriquer la div price et ajouter le prix

    block.appendChild(createOrderControlBlock(index));
    return block; // créer le bloc de contrôle index et fermer le bloc
}


/* return a new element of tag 'tag' with content 'content' and class 'cssClass'
 * @param tag (string) = the type of the created element (example : "p")
 * @param content (string) = the html wontent of the created element (example : "bla bla")
 * @param cssClass (string) (optional) = the value of the 'class' attribute for the created element
 */
var createBlock = function(tag, content, cssClass) //créer des élements différents avec tag, content et cssClass
{
    var element = document.createElement(tag);
    if (cssClass != undefined) {
        element.className = cssClass; // si cssClass est non-défini element.className est égal à cssClass
    }
    element.innerHTML = content; // écrire dans le html le contenu content
    return element; // fermer et renvoyer element
}

/*
 * builds the control element (div.controle) for a product
 * @param index = the index of the considered product
 *
 * TODO : add the event handling, 
 *   /!\  in this version button and input do nothing  /!\  
 */
var createOrderControlBlock = function(index) {
    var control = document.createElement("div"); // créer la div controle
    control.className = "controle";

    
    var input = document.createElement("input"); // créer l'élément input
    input.id = index + '-' + inputIdKey; // identifiant de input = index + clé de l'identifiant
    input.type = "number"; // type de l'input = nombre
    input.value = "0"; // valeur de l'input = "0"

    control.appendChild(input); // ajouter input comme enfant à control


    var button = document.createElement("button"); // créer l'élément bouton
    button.className = 'commander'; // étiquette du bouton = commander
    button.id = index + "-" + orderIdKey; // identifiant du bouton = index + ordre des identifiants
    control.appendChild(button); // ajouter button comme enfant à control
    return control; // fermer et renvoyer control
}


/*
 * create and return the figure block for this product
 * see the static version of the project to know what the <figure> should be
 * @param product (product object) = the product for which the figure block is created
 *
 * TODO : write the correct code
 */
var createFigureBlock = function(image) {
    var content = "<img src='./" + image + "'>"; // la variable content à partir d'un chemin relatif affiche l'image liée au produit

    return createBlock("figure", content); // fermer et renvoyer createBlock
}
