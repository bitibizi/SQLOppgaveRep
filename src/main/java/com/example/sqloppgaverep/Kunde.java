package com.example.sqloppgaverep;

public class Kunde {

    private String id;
    private String personnr;
    private String navn;
    private String adresse;
    private String kjennetegn;
    private String bilMerke;
    private String bilType;

    public Kunde(){

    }
    public Kunde(String id, String personnr, String navn, String adresse, String kjennetegn, String bilMerke, String bilType) {
        this.id = id;
        this.personnr = personnr;
        this.navn = navn;
        this.adresse = adresse;
        this.kjennetegn = kjennetegn;
        this.bilMerke = bilMerke;
        this.bilType = bilType;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPersonnr() {
        return personnr;
    }

    public void setPersonnr(String personnr) {
        this.personnr = personnr;
    }

    public String getNavn() {
        return navn;
    }

    public void setNavn(String navn) {
        this.navn = navn;
    }

    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getKjennetegn() {
        return kjennetegn;
    }

    public void setKjennetegn(String kjennetegn) {
        this.kjennetegn = kjennetegn;
    }

    public String getBilMerke() {
        return bilMerke;
    }

    public void setBilMerke(String bilMerke) {
        this.bilMerke = bilMerke;
    }

    public String getBilType() {
        return bilType;
    }

    public void setBilType(String bilType) {
        this.bilType = bilType;
    }


}
