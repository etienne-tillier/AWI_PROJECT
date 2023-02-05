import Benevole from "./benevole";
import Zone from "./zone";

export default interface Creneau {
    benevole : Benevole,
    debut : Date,
    fin : Date,
    zone : Zone
}