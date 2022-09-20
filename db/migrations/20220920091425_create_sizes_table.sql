-- migrate:up
CREATE TABLE sizes(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    foot_size VARCHAR(50)
);

-- migrate:down
DROP TABLE sizes;
