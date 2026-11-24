import { Boutique } from "../fichier_js/Boutique.js";
import { Panier } from "../fichier_js/Panier.js";
import { VuePanier } from "../fichier_js/VuePanier.js";
import { images } from "../fichier_js/donnees.js";

const panier = new Panier();
new VuePanier(panier, ".panier");
new Boutique(".images", images, panier).afficher();