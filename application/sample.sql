PRAGMA foreign_keys = ON;

create table person (
fname text,
lname text,
email text,
primary key (email)
};

create table message (
email text,
subject text,
how text,
message text,
primary key (email, subject),
foreign key (email) references person
);