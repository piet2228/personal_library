CREATE TABLE Books (
  volume_id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  thumbnail VARCHAR(255)
);
CREATE TABLE Owns (
  user_id VARCHAR(255),
  volume_id VARCHAR(255),
  PRIMARY KEY(user_id, volume_id),
  CONSTRAINT fk_Books
    FOREIGN KEY(volume_id)
      REFERENCES Books(volume_id)
);