import Jeu from "./jeu";
import Benevole from "./benevole";

export default interface zone{
    _id: String;
    nom: String;
    jeux: Jeu[]
    benevoles: Benevole[]
    
}