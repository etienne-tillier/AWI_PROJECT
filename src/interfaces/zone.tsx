import Jeu from "./jeu";
import BenevoleZone from "./benevoleZone";

export default interface Zone{
    _id: String;
    nom: String;
    jeux: Jeu[]
    benevoles: BenevoleZone[]
    
}