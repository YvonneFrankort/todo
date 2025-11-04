
DROP TABLE IF EXISTS task;
DROP TABLE IF EXISTS account;

CREATE TABLE task (
    id serial PRIMARY KEY,
    description varchar(255) NOT NULL
);

CREATE TABLE account (
    id serial PRIMARY KEY,
    email varchar(50) NOT NULL UNIQUE,
    password varchar(255) NOT NULL
);

ALTER SEQUENCE task_id_seq RESTART WITH 1;

INSERT INTO task (description) VALUES
('Complete the project documentation'),
('Review the code changes'),
('Prepare for the team meeting'),
('Update the project timeline'),
('Test the new features');
