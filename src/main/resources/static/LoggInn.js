$(() => {
    $("#login-button").click(event => {
        event.preventDefault()
        const bruker = {
            brukernavn: $("#brukerNavn").val(),
            password: $("#password").val()
        }

        $.post("/loggInn", bruker, function (innlogget) {
            if (innlogget) {
                window.location.href = 'List.html'
            } else {

                $("#feil").html("Feil brukernavn eller password");
            }
        })
            .fail(function () {
                $("#feil").html("Serverfeil-prøv igjen senere");
            })

    })
    $("#krypt").click(event=>{
        event.preventDefault()
        const bruker = {
            brukernavn: $("#brukerNavn").val(),
            password: $("#password").val()
        }

        $.post("/krypt", bruker, function(){
            window.location.href='LoggInn.html';
        })

    })
})

