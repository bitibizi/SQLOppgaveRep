$(() => {
    hentBiler();

    $("#register").click(event=>{
        event.preventDefault()

        const personnrOk = validerPersonnr($("#personnr").val());
        const navnOk = validerNavn($("#navn").val());
        const adressOk = validerAdresse($("#adresse").val());
        const kjennetegnOk = validerKjennetegn($("#kjennetegn").val());
        const merkeOk=validerMerke($("#merke").val());
        const typeOk=validerType($("#type").val());

        if (personnrOk && navnOk && adressOk && kjennetegnOk && merkeOk && typeOk) {
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
          window.location.href='List.html'

      })
          .fail(function(feil){
          const json=$.parseJSON(feil.responseText)
          $("#feil").html(json.message);
      })
  }

    $("#merke").change(() => {
        let valgtmerke = $("#merke").val()
        $.get("/hentBilType?bilMerke=" + valgtmerke, function (bilType) {
            formaterTyper(bilType);
        })


    })
})

hentBiler = () => {
    $.get("/hentBilMerke", function (bilmerke) {
        formaterMerke(bilmerke);
    })

}

formaterMerke = (bilMerker) => {
    let merker = "<option value='feil'>"+'Valg Merke'+"</option>";
    for (const merke of bilMerker) {
        merker += "<option value='" + merke + "'>" + merke + "</option>"
    }
    $("#merke").html(merker);

}

formaterTyper = (bilType) => {
    let typer = "";
    typer+="<option value='feil'>"+'Valg type'+"</option>"
    for (const type of bilType) {
        typer += "<option value='" + type + "'>" + type + "</option>"
    }

    $("#type").html(typer);
}



