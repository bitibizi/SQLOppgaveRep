CREATE TABLE Kunde(
    id INTEGER AUTO_INCREMENT NOT NULL,
    personnr VARCHAR(225) NOT NULL,
    navn VARCHAR(225) NOT NULL,
    adresse varchar(225) NOT NULL,
    kjennetegn varchar(225) NOT NULL,
    bilMerke varchar(225) NOT NULL,
    bilType varchar(225) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE Bil(
    bilMerke VARCHAR(225) NOT NULL,
    bilType VARCHAR(225) NOT NULL
);

CREATE TABLE Admin(
  brukernavn VARCHAR(225) NOT NULL,
  password VARCHAR(225) NOT NULL
);