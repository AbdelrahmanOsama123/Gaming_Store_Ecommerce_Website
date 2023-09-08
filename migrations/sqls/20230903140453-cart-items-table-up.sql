create table cart_items(
    id bigserial PRIMARY KEY,
    cart_id bigint not null REFERENCES cart(id),
    product_id bigint not null REFERENCES products(id),
    quantity int not null
);