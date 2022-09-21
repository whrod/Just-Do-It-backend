-- migrate:up
CREATE TABLE colors(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    color VARCHAR(50)
);

-- migrate:down
DROP TABLE colors;
