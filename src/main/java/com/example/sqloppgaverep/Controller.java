package com.example.sqloppgaverep;

import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class Controller {

    @Autowired
    private ControllerRepository rep;

    private Logger logger = LoggerFactory.getLogger(Controller.class);

    private boolean validerKunde(Kunde kunde) {
        String regePersonnr = "[0-9\\-]{11}";
        String regexNavn = "[a-zA-ZæøåÆØÅ.\\-]{2,20}";
        String regexAdress = "[a-zA-ZæøåÆØÅ\\-]{2,20}";
        String regexKjennetegn = "[a-zA-ZæøåÆØÅ \\-]{2,20}";
        boolean personnrOk = kunde.getPersonnr().matches(regePersonnr);
        boolean navnOk = kunde.getNavn().matches(regexNavn);
        boolean adressOk = kunde.getAdresse().matches(regexAdress);
        boolean kjennetegnOk = kunde.getKjennetegn().matches(regexKjennetegn);
        // get all cars from repository merke og type
        List<Bil> biler = rep.hentBiler();
        boolean bilOk = biler.stream().anyMatch(bil ->
                bil.getBilMerke().equals(kunde.getBilMerke()) &&
                        bil.getBilType().equals(kunde.getBilType()));


        if (personnrOk && navnOk && adressOk && kjennetegnOk && bilOk) {
            return true;
        }
        logger.error("valideringsfeil");
        return false;

    }

    @PostMapping("/lagreKunde")
    public void lagreKunde(Kunde innKunde, HttpServletResponse response) throws IOException {
        if (!validerKunde(innKunde)) {
            response.sendError(HttpStatus.NOT_ACCEPTABLE.value(), "feil input");
        } else {
            if (!rep.lagreKunde(innKunde)) {
                response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB-prøv igjen senere");
            }

        }

    }

    @GetMapping("/hentKunder")
    public List<Kunde> hentAlleKunder(HttpServletResponse response) throws IOException {
        List<Kunde> alleKunder = rep.hentAlleKunder();
        if (alleKunder == null) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB - prøv igjen senere");
        }
        return alleKunder;

    }

    @GetMapping("/hentBilMerke")
    public List<String> hentBilMerke(HttpServletResponse response) throws IOException {
        List<String> Bilmerke = rep.hentBilMerke();
        if (Bilmerke == null) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB-prøv igjen senere");
        }

        return Bilmerke;
    }

    @GetMapping("/hentBilType")
    public List<String> hentBilType(@RequestParam String bilMerke, HttpServletResponse response) throws IOException {
        List<String> biltype = rep.hentBilType(bilMerke);
        if (biltype == null) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB-prøv igjen senere");
        }

        return biltype;
    }

    @GetMapping("/slettAlleKunder")
    public void slettAlleKunder(HttpServletResponse response) throws IOException {
        if (!rep.slettAlleKunder()) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB");
        }

    }

    @GetMapping("/slettEnKunde")
    public void slettEnKunde(int id, HttpServletResponse response) throws IOException {
        if (!rep.slettEnKunde(id)) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB");
        }
    }

    @GetMapping("/hentEnKunde")
    public Kunde hentEnKunde(int id, HttpServletResponse response) throws IOException {
        Kunde enKunde = rep.hentEnKunde(id);
        if (enKunde == null) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB");
        }
        return enKunde;

    }

    @PostMapping("/endreEnKunde")
    public void endreEnKunde(Kunde enKunde, HttpServletResponse response) throws IOException {
        if (!rep.endreEnKunde(enKunde)) {
            response.sendError(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Feil i DB");
        }
    }

}
