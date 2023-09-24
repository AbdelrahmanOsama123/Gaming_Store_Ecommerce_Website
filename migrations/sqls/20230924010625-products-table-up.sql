create table products (
    id bigserial PRIMARY KEY,
    name varchar(50),
    catagory varchar(50),
    price float,
    afteroffer float,
    description text,
    quantity int,
    image text
);