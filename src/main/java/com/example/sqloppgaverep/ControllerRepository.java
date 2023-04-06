package com.example.sqloppgaverep;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.slf4j.Logger;

@Repository
public class ControllerRepository {
    @Autowired
    private JdbcTemplate db;

    private Logger logger = LoggerFactory.getLogger(ControllerRepository.class);

    public boolean lagreKunde(Kunde innKunde) {
        String sql = "INSERT INTO Kunde(personnr, navn, adresse, kjennetegn, bilMerke, bilType) VALUES(?,?,?,?,?,?)";
        try {
            db.update(sql, innKunde.getPersonnr(), innKunde.getNavn(), innKunde.getAdresse(), innKunde.getKjennetegn(),
                    innKunde.getBilMerke(), innKunde.getBilType());
            return true;
        } catch (Exception e) {
            logger.error("Feil i lagreKunde" + e);
            return false;
        }


    }

    public List<Kunde> hentAlleKunder() {
        String sql = "SELECT * FROM Kunde";
        try {
            List<Kunde> alleKunder = db.query(sql, new BeanPropertyRowMapper(Kunde.class));
            return alleKunder;
        } catch (Exception e) {
            logger.error("Feil i hentAlleKunder" + e);
            return null;
        }


    }

    public List<Bil> hentBiler() {
        String sql = "SELECT bilMerke, bilType FROM Bil";
        try {
            List<Bil> biler = db.query(sql, new BeanPropertyRowMapper(Bil.class));
            return biler;
        } catch (Exception e) {
            logger.error("Feil i hentBiler", e);
            return null;
        }
    }

    public List<String> hentBilMerke() {
        String sql = "SELECT DISTINCT bilMerke FROM Bil";
        try {
            List<String> bilMerke = db.queryForList(sql, String.class);
            return bilMerke;
        } catch (Exception e) {
            logger.error("Feil i hentBilMerke" + e);
            return null;
        }


    }

    public List<String> hentBilType(String bilMerke) {
        String sql = "SELECT bilType FROM Bil WHERE bilMerke=?";
        try {
            List<String> bilType = db.queryForList(sql, new Object[]{bilMerke}, String.class);
            return bilType;
        } catch (Exception e) {
            logger.error("Feil i hentBiltype" + e);
            return null;
        }

    }

    public boolean slettAlleKunder() {
        String sql = "DELETE FROM Kunde";
        try {
            db.update(sql);
            return true;
        } catch (Exception e) {
            logger.error("feil i slettAlleKunder" + e);
            return false;

        }

    }

    public boolean slettEnKunde(int id) {
        String sql = "DELETE FROM Kunde WHERE id=?";

        try {
            db.update(sql, id);
            return true;
        } catch (Exception e) {
            logger.error("feil i slettEnKunde" + e);
            return false;
        }

    }

    public Kunde hentEnKunde(int id) {
        String sql = "SELECT * FROM Kunde WHERE id=?";

        try {
            Kunde enKunde = db.queryForObject(sql, new Object[]{id}, new BeanPropertyRowMapper<Kunde>(Kunde.class));
            return enKunde;
        } catch (Exception e) {
            logger.error("feil i hentEnKunde" + e);
            return null;
        }
    }

    public boolean endreEnKunde(Kunde enKunde) {
        String sql = "UPDATE Kunde SET personnr=?, navn=?, adresse=?, kjennetegn=?, bilMerke=?, bilType=? WHERE id=?";
        try {
            db.update(sql, enKunde.getPersonnr(), enKunde.getNavn(),
                    enKunde.getAdresse(), enKunde.getKjennetegn(),
                    enKunde.getBilMerke(), enKunde.getBilType(), enKunde.getId());
            return true;
        } catch (Exception e) {
            logger.error("feil i endreEnKunde", e);
            return false;
        }


    }

    public boolean sjekkBrukernavnOgPassword(Admin bruker){
        Object [] param= new Object[]{bruker.getBrukernavn(), bruker.getPassword()};
        String sql="SELECT COUNT(*) FROM Admin WHERE brukernavn=? AND password=?";
        try{
            int antall=db.queryForObject(sql,param,Integer.class);
            if(antall>0){
                return true;
            }
            return false;
        }catch(Exception e){
            logger.error("Feil i sjekkNavn og password :", e);
            return false;
        }
    }


}
