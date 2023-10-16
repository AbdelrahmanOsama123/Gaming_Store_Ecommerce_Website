create table products (
    id bigserial PRIMARY KEY,
    name varchar(50) not null,
    catagory varchar(50) not null,
    price float not null,
    afteroffer float not null,
    image text,
    description text not null,
    quantity int not null
);