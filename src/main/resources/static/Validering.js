validerPersonnr=(personnr)=>{
    const regexp=/^[0-9 \-]{11}$/
    const ok=regexp.test(personnr);
    if(!ok){
        $("#feilPersonnr").html("Det må fylles met 11 tallet")
        return false;
    }else{
        $("#feilPersonnr").html("")
        return true;
    }

}

validerNavn=(navn)=>{
    const regexp=/^[a-zA-ZæøåÆØÅ \-]{2,20}$/
    const ok=regexp.test(navn)
    if(!ok){
        $("#feilNavn").html("må fylles inn med bokstav")
        return false;
    }
    else{
        $("#feilNavn").html("")
        return true;
    }

}

validerAdresse=(adress)=>{
    const regexp=/^[a-zA-ZæøåÆØÅ \-]{2,20}$/
    const ok=regexp.test(adress)
    if(!ok){
        $("#feilAdress").html("må fylles inn med bokstav")
        return false;
    }
    else{
        $("#feilAdress").html("")
        return true;
    }


}

validerKjennetegn=(kjennetegn)=>{
    const regexp=/^[a-zA-ZæøåÆØÅ \-]{2,20}$/
    const ok=regexp.test(kjennetegn)
    if(!ok){
        $("#feilKjennetegn").html("må fylles inn med bokstav")
        return false;
    }
    else{
        $("#feilKjennetegn").html("")
        return true;
    }

}

validerMerke=(merke)=>{
    const feil="feil"
    if(merke===feil){
        $("#feilMerke").html("Må velge Merke")
        return true
    }else{
        $("#feilMerke").html("");
        return false
    }
}

validerType=(type)=>{
    const feil="feil"
    if(type===feil){
        $("#feilType").html("Må velge Type")
        return true
    }else{
        $("#feilType").html("");
        return false;
    }
}
