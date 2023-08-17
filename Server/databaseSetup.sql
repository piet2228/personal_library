CREATE TABLE Books (
  volume_id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255),
  author VARCHAR(255),
  thumbnail VARCHAR(300),
  published_date VARCHAR(32)
);
CREATE TABLE Owns (
  user_id VARCHAR(255),
  volume_id VARCHAR(255),
  PRIMARY KEY(user_id, volume_id),
  CONSTRAINT fk_Books
    FOREIGN KEY(volume_id)
      REFERENCES Books(volume_id)
);

-- DELETE FROM Books B
-- WHERE NOT EXISTS
-- (SELECT volume_id, user_id 
--   FROM Books JOIN Owns ON (Books.volume_id = Owns.volume_id)
--   WHERE volume_id = $1 )