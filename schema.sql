-- Create a new database called 'Tickets'
-- Connect to the 'master' database to run this snippet

CREATE DATABASE Tickets;
USE Tickets;



-- Create the table in the specified schema
CREATE TABLE Tickets.Customers
(
  CustomersId INT NOT NULL PRIMARY KEY auto_increment, -- primary key column
  custName VARCHAR(50) NOT NULL,
  custStreet VARCHAR(50) NOT NULL,
  custCity VARCHAR(50) NOT NULL,
  custState VARCHAR(50) NOT NULL,
  custZip VARCHAR(50) NOT NULL
  -- specify more columns here
);
