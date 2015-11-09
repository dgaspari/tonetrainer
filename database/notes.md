# Setting up a SQLite DB for the ToneTrainer web app:
Heres the steps I have followed so far:
* Install sqlite3, using apt-get on Ubuntu
* Create db, "tonetrainer", like so: sqlite3 tonetrainer.db
** Default for this should be UTF-8 text encoding 
* Define the Speakers table, which defines each source of examples:

CREATE TABLE Speakers(
    SpeakerId   INTEGER PRIMARY KEY,
    Name        TEXT,
    Notes       TEXT
);

* Now define the Examples table, which defines all the spoken example words:

CREATE TABLE Examples(
    ExampleId       INTEGER PRIMARY KEY,
    SpeakerId       INTEGER,
    MandarinWord    TEXT,
    PinyinWord      TEXT,
    PitchJson       TEXT,
    WavFile         BLOB,
    FOREIGN KEY(SpeakerId) REFERENCES Speakers(SpeakerId)
);


