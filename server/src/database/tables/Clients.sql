CREATE TABLE clients(
  id INT NOT NULL AUTO_INCREMENT,
  clientName VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone INT NOT NULL, 
  cep INT NOT NULL,

  PRIMARY KEY(id)
)