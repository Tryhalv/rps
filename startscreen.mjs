import GAME_DICTIONARY from "./dictionary.mjs";
import { ANSI } from "./lib/ansi.mjs";


let Logo = GAME_DICTIONARY.logo;
function ShowLogo(logo=GAME_DICTIONARY.en.Logo){
    console.log(ANSI.CLEAR_SCREEN,ANSI.COLOR.BLUE,ANSI.CURSOR_HOME)
    console.log (logo);
    console.log(ANSI.RESET)
}


export {
    ShowLogo
}