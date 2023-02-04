import Jeu from "./jeu";
import Benevole from "./benevole";

export default interface zone{
    _id: Number;
    nom: String;
    jeux: Jeu[]
    benevoles: Benevole[]
    
}