$(()=>{
    hentKunder();
})

hentKunder=()=>{
    $.get("/hentKunder", function(kunder){
        formaterKunder(kunder);
    })

        .fail(function(feil){
            const json=$.parseJSON(feil.responseText)
            $("#feil").html(json.message);
        })

}

formaterKunder = (kunder) => {
    let ut="<table class=\"table table-striped\">"+"<tr>"+"<th>Personnr</th>"+"<th>navn</th>"+"<th>adresse</th>"
        +"<th>Kjennetegn</th>"+"<th>BILMERKE</th>"+"<th>BILTYPE</th>"+"<th></th>"+"<th></th>"+"</tr>"

    for(const kunde of kunder){
        ut+=`<tr><td>${kunde.personnr}</td><td>${kunde.navn}</td><td>${kunde.adresse}</td><td>${kunde.kjennetegn}</td>
        <td>${kunde.bilMerke}</td><td>${kunde.bilType}</td><td><a class="btn btn-primary" 
        href="EndreKunde.html?id=${kunde.id}">Endre</td><td><button class="btn btn-danger" 
        onclick="slettEnKunde(${kunde.id})">slett</button></td></tr>`
    }

    ut+="</table>"

    $("#list").html(ut);

}

slettEnKunde=(id)=>{
    const url=("/slettEnKunde?id="+id);
    $.get(url, function(){
        window.location.href="/List.html"
    })

        .fail(function(status){
            const json=$.parseJSON(status.responseText)
            if(status.status = 401){
                $("#feil").html(json.message)
            }
        })

}

slettAlleKunde=()=>{
    $.get("/slettAlleKunder", function(){
        hentKunder();
    })

        .fail(function(status){
            const json=$.parseJSON(status.responseText)
            if(status.status = 401){
                $("#feil").html(json.message)
            }
        })

}

loggUt=()=>{
    const url="/loggUt"
    $.get(url, function(){
        window.location.href='LoggInn.html'
    })

        .fail(function(status){
            const json=$.parseJSON(status.responseText)
            if(status.status = 401){
                $("#feil").html(json.message)
            }
        })
}

registerNy=()=>{
    const url="/erLoggetInn"
    $.get(url, function(){
        window.location.href='MotorVogn.html'

    })
        .fail(function(status){
            const json=$.parseJSON(status.responseText)
            if(status.status = 401){
                $("#feil").html(json.message)
            }
        })
}

