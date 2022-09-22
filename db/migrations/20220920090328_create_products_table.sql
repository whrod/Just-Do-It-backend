-- migrate:up
CREATE TABLE products(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    style_code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    thumbnail VARCHAR(1000) NOT NULL,
    retail_price DECIMAL NOT NULL,
    discount_price DECIMAL NULL DEFAULT NULL,
    description VARCHAR(1000) NULL DEFAULT NULL,
    release_date DATE NOT NULL,
    brand_id INT NOT NULL,
    FOREIGN KEY (brand_id) REFERENCES brands (id)
);

-- migrate:down
DROP TABLE products;
