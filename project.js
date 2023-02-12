// === constants ===
const MAX_QTY = 9;
const productIdKey = "product";
const orderIdKey = "order";
const inputIdKey = "qte";

// function called when page is loaded, it performs initializations 
let init = () => {
	createShop();
}
window.addEventListener("load", init);

// ajout
// on modifie createShop en lui ajoutant un paramètre optionnel contenant 
//les index des produits que l'on veut afficher
let createShop = (archedProducts = null) => { 
	let shop = document.getElementById("boutique");
	let filter = document.getElementById("filter");
	let elements  = [];

	for(let i = 0; i < catalog.length; i++) {
		shop.appendChild(createProduct(catalog[i], i));
		elements[i] = catalog[i].name;
	}

	filter.addEventListener('keyup', function(){
		let filtered = elements.filter(element => !element.includes(filter.value));

		for(let i = 0; i < catalog.length; i++) {
			let item = document.getElementById(i+"-product");
			item.style.display = 'inline-block';
		}

		for(let j=0; j<filtered.length; j++) {
			let toFilterName = filtered[j];
			for(let i=0; i<catalog.length; i++) {
				if(toFilterName.toLowerCase() == catalog[i].name.toLowerCase()) {
					let item = document.getElementById(i+"-product");
					item.style.display = 'none';
				}
			}
		}
	});

	filter.addEventListener('click', function() {
		for(let i = 0; i < catalog.length; i++) {
			let item = document.getElementById(i+"-product");
			item.style.display = 'inline-block';
		}
	});
}


/*
* create the div.produit elment corresponding to the given product
* The created element receives the id "index-product" where index is replaced by param's value
* @param product (product object) = the product for which the element is created
* @param index (int) = the index of the product in catalog, used to set the id of the created element
*/
//var createProduct = function (product, index) {
let createProduct = (product, index) => {
	// build the div element for product
	let block = document.createElement("div");
	block.className = "produit";
	// set the id for this product
	block.id = index + "-" + productIdKey;
	// build the h4 part of 'block'
	block.appendChild(createBlock("h4", product.name));
	
	// /!\ should add the figure of the product... does not work yet... /!\ 
	block.appendChild(createFigureBlock(product));

	// build and add the div.description part of 'block' 
	block.appendChild(createBlock("div", product.description, "description"));
	// build and add the div.price part of 'block'
	block.appendChild(createBlock("div", product.price, "prix"));
	// build and add control div block to product element
	block.appendChild(createOrderControlBlock(index));
	return block;
}


/* return a new element of tag 'tag' with content 'content' and class 'cssClass'
 * @param tag (string) = the type of the created element (example : "p")
 * @param content (string) = the html wontent of the created element (example : "bla bla")
 * @param cssClass (string) (optional) = the value of the 'class' attribute for the created element
 */
let createBlock = (tag, content, cssClass) => {
	let element = document.createElement(tag);
	if (cssClass != undefined) {
		element.className =  cssClass;
	}
	element.innerHTML = content;
	return element;
}

/*
* builds the control element (div.controle) for a product
* @param index = the index of the considered product 
*/
let createOrderControlBlock = (index) => {
	let control = document.createElement("div");
	control.className = "controle";

	// create input quantity element
	let input = document.createElement("input");
	input.id = index + '-' + inputIdKey;
	input.type = "number";
	input.value = "0";
	input.max = String(MAX_QTY);
	input.min = "0";

	// add input to control as its child
	control.appendChild(input);
	
	// create order button
	let button = document.createElement("button");
	button.className = 'commander';
	button.id = index + "-" + orderIdKey;
	
	//ajout
	// on ajoute un evenement au click qui envoi la valeur de l'id de l'input
	// et index qui nous permertra de récuperer le prix et le nom du produit plus tard.
	button.addEventListener("click", function() {
		manageCart(input.id,index);
	});

	
	// add control to control as its child
	control.appendChild(button);
	
	// the built control div node is returned
	return control;
}

/*
* create and return the figure block for this product
* see the static version of the project to know what the <figure> should be
* @param product (product object) = the product for which the figure block is created
*
* TODO : write the correct code
*/
let createFigureBlock = (product) => {
	//on ajoute simplement la source
	return createBlock("figure", "<img src='" + product.image + "'/>");
}

//ajoute ou supprime des produits du panier
let manageCart = (inputId, productIndex) => {
		
	//on selectionne notre input pour en récupèrer la valeur.
	let input = document.getElementById(inputId);
	//on récupère et converti en nombre la valeur de l'input.
	//let quantity =  Number(input.value);
	let quantity = input.value;

	console.log(input.value);
	if (input.value) {
		console.log(input.style);
		input.style.opacity = "1";
	}
	
	//si la quantité est inférieure à 0 on supprime la miniature à droite
	if(quantity < 1){
		removeFromCart(productIndex);
	}
	else{		
		addCartSection(quantity,productIndex);
	}
	
	//on fait le compte du total
	countTotal();
}

let addCartSection = (quantity,productIndex) => {
		
	// on cible toutes les balises de classe "achats" et on récupère seulement la première
	let section = document.getElementsByClassName('achats')[0];
	
	//on récupère le produit dans catalog[]
	let product = catalog[productIndex];
	
	let figure = document.getElementById("cartSection" + productIndex);	
	
	//si le produit n'est pas dans le panier
	if(figure == null){
		/*on crée un block figure et on l'ajoute directement au bloc achats (section).
		ça évite de refaire un if en fin de fonction
		et de créer une autre variable pour garder une trace de ce qui a été fait
		*/
		figure = createFigureBlock(product);
		section.appendChild(figure);	
	}
	//sinon on supprime le figcaption pour garder seulement l'image et ajouter a nouveau le reste
	else{
		figure.childNodes[1].remove();
	}
	
	//on crée de nouveaux blocs en utilisant la fonction déjà existante pour ça
	let caption = createBlock("figcaption",product.name+"<br>",'cartElement');
	let text = createBlock('span', quantity +' X ' + product.price + " = ",'');
	
	// on crée un noeud juste pour le prix il suffira plus tard
	// de selectionner toutes les balises de cette classe
	// et d'ajouter leur valeur pour avoir le total
	let price = createBlock('span', quantity * product.price ,'cartPrice');
	
	let btn= document.createElement('button');
	btn.className="retirer";	
	
	//on ajoute un event au clic au bouton pour supprimer la sous section et remettre à 0 la quantité du produit.
	btn.addEventListener('click',function() {
		removeFromCart(productIndex);
	});
		
	caption.appendChild(text);
	caption.appendChild(price);
	caption.appendChild(btn);
	figure.appendChild(caption);
	figure.id="cartSection" + productIndex;
	figure.childNodes[0].style.width = "40px";
}

let removeFromCart = (productIndex) => {
	//on remet la quantité à 0
	let input = document.getElementById(productIndex+'-qte');
	input.value = 0;
	
	//on supprime l'encart à droite
	let element = document.getElementById('cartSection'+productIndex);
	element.remove();
	
	//on fait le compte du total
	countTotal();
}

//fait le total des achats
let countTotal = () => {
	let montant = document.getElementById('montant');	
	let total =0;
	//on récupère tous les sous totaux
	let prices = document.getElementsByClassName('cartPrice');

	for (let i=0; i<prices.length; i++) {
		total = total + parseInt(prices[i].innerHTML);
	}
	
	montant.innerHTML=total.toString();
}
