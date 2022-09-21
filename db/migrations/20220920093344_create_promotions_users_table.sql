-- migrate:up
CREATE TABLE promotions_users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    promotion_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (promotion_id) REFERENCES promotions (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

-- migrate:down
DROP TABLE users;