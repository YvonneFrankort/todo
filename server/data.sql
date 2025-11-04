create table task (
    id serial primary key,
    description varchar(255) not null
);

insert into task (description) values
('Complete the project documentation'),
('Review the code changes'),
('Prepare for the team meeting'),
('Update the project timeline'),
('Test the new features'),
('Fix the reported bugs'),
('Deploy the application to product'),
('Conduct a code review with peers');


