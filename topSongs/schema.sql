DROP DATABASE IF EXISTS top5000;
CREATE DATABASE top5000;
USE top5000;

CREATE TABLE top5000(
	id INTEGER NOT NULL,
    artist VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    released INTEGER NOT NULL,
    world_sales DECIMAL(10,2),
    us_sales DECIMAL(10,2),
    uk_sales DECIMAL(10,2),
    eu_sales DECIMAL(10,2),
    other_sales DECIMAL(10,2),
    PRIMARY KEY (id)
);

SELECT * FROM top5000;

