PRAGMA foreign_keys = ON;

create table person (
fname text,
lname text,
email text,
primary key (email)
};

create table message (
numMessage integer,
email text,
subject text,
how text,
message text,
primary key (numMessage, mail, subject),
foreign key (email) references person on delete cascade
);