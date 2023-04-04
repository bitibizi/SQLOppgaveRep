$(() => {
    hentBiler();
    hentKunder();

    $("#register").click(event=>{
        event.preventDefault()

        const personnrOk = validerPersonnr($("#personnr").val());
        const navnOk = validerNavn($("#navn").val());
        const adressOk = validerAdresse($("#adresse").val());
        const kjennetegnOk = validerKjennetegn($("#kjennetegn").val());

        if (personnrOk && navnOk && adressOk && kjennetegnOk) {
            lagreKunder();
        }


    })

  lagreKunder=()=>{
      const Kunde = {

          personnr:$("#personnr").val(),
          navn: $("#navn").val(),
          adresse: $("#adresse").val(),
          kjennetegn: $("#kjennetegn").val(),
          bilMerke: $("#merke").val(),
          bilType: $("#type").val()
      }

      $.post("/lagreKunde", Kunde, function () {
          hentKunder();
      }).fail(function(feil){
          const json=$.parseJSON(feil.responseText)
          $("#feil").html(json.message);
      })
  }

    $("#merke").change(() => {
        let valgtmerke = $("#merke").val()
        $.get("/hentBilType?bilMerke=" + valgtmerke, function (bilType) {
            formaterTyper(bilType);
        }).fail(function(feil){
            const json=$.parseJSON(feil.responseText)
            $("#feil").html(json.message);
        })
    })
})

hentBiler = () => {
    $.get("/hentBilMerke", function (bilmerke) {
        formaterMerke(bilmerke);
        $.get("/hentBilType?bilMerke=" + bilmerke[0], function (biltype) {
            formaterTyper(biltype);
        })
    })


}

formaterMerke = (bilMerker) => {
    let merker = "<option value='feil'>"+'Valg merke'+"</option>";
    for (const merke of bilMerker) {
        merker += "<option value='" + merke + "'>" + merke + "</option>"
    }
    $("#merke").html(merker);

}

formaterTyper = (bilType) => {
    let typer = "";
    for (const type of bilType) {
        typer += "<option value='" + type + "'>" + type + "</option>"
    }

    $("#type").html(typer);
}

hentKunder=()=>{
    $.get("/hentKunder", function(kunder){
        formaterKunder(kunder);
    })
}

formaterKunder = (kunder) => {
    let ut="<table class=\"table table-striped\">"+"<tr>"+"<th>Personnr</th>"+"<th>navn</th>"+"<th>adresse</th>"
        +"<th>Kjennetegn</th>"+"<th>BILMERKE</th>"+"<th>BILTYPE</th>"+"</tr>"

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
        window.location.href="/MotorVogn.html"
    })

}

slettAlleKunde=()=>{
   $.get("/slettAlleKunder", function(){
       hentKunder();
   })

}

