import { Boutique } from "../fichier_js/Boutique.js";
import { images } from "../fichier_js/donnees.js";

const boutique = new Boutique(".images", images);
boutique.afficher();