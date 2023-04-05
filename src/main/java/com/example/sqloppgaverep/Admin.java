package com.example.sqloppgaverep;

public class Admin {

    private String brukernavn;

    private String password;

    public Admin(String brukernavn, String password) {
        this.brukernavn = brukernavn;
        this.password = password;
    }

    public Admin(){

    }

    public String getBrukernavn() {
        return brukernavn;
    }

    public void setBrukernavn(String brukernavn) {
        this.brukernavn = brukernavn;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
