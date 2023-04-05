$(() => {
    hentBiler();
    const id = window.location.search.substring(1);
    const url = "/hentEnKunde?" + id;

    $.get(url, async function (kunde) {
        $("#id").val(kunde.id);
        $("#personnr").val(kunde.personnr);
        $("#navn").val(kunde.navn);
        $("#adresse").val(kunde.adresse);
        $("#kjennetegn").val(kunde.kjennetegn);
        $("#merke").val(kunde.bilMerke);
        console.log("Starter funksjon")
        await hentBilType(kunde.bilMerke)
        console.log("Ferdig med funksjon")
        $("#type").val(kunde.bilType)
    })

    $("#merke").change(() => {
        let valgtmerke = $("#merke").val()
        hentBilType(valgtmerke);
    })
        .fail(function(){
            $("#feil").html("Feil i db-prøv igjen senere")
        })

})

hentBiler = () => {
    $.get("/hentBilMerke", function (bilmerker) {
        formaterMerke(bilmerker)
    })
}

hentBilType = async (bilMerker) => {
    console.log("Henter biltype")
    await $.get("/hentBilType?bilMerke=" + bilMerker, function (biltyper) {
        formaterTyper(biltyper);
        console.log("Ferdig med å hente biltype")
    })

}

formaterMerke = (bilmerker) => {
    let merker = "";
    for (const merke of bilmerker) {
        merker += "<option value='" + merke + "'>" + merke + "</option>"
    }
    $("#merke").html(merker)
}

formaterTyper = (biltyper) => {
    let typer = "";
    for (const type of biltyper) {
        typer += "<option value='" + type + "'>" + type + "</option>"
    }
    $("#type").html(typer);
}


endreKunde = () => {
    const Kunde = {
        id: $("#id").val(),
        personnr: $("#personnr").val(),
        navn: $("#navn").val(),
        adresse: $("#adresse").val(),
        kjennetegn: $("#kjennetegn").val(),
        bilMerke: $("#merke").val(),
        bilType: $("#type").val()
    }

    $.post("/endreEnKunde", Kunde, function () {
        window.location.href = "List.html"
    })

        .fail(function(feil){
            const json=$.parseJSON(feil.responseText)
            $("#feil").html(json.message);
        })

}