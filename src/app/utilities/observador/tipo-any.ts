import { Observer } from "rxjs";

export const observadorAny: Observer<any> = {
    next(respuesta ){
        console.log(respuesta);
    },
    error(miError){
        console.log(miError);
    },
    complete(){
    }
}
