create table order_items(
    id bigserial PRIMARY KEY,
    order_id bigint not null REFERENCES orders(id),
    product_id bigint not null REFERENCES products(id),
    quantity int not null,
    price float not null
);