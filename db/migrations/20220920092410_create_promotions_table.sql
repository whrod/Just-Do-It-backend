-- migrate:up
CREATE TABLE promotions (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL,
    discount_rate INT NOT NULL
)

-- migrate:down
DROP TABLE promotions