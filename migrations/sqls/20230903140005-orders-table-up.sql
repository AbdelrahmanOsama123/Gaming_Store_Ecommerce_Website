create table orders (
    id bigserial PRIMARY KEY,
    user_id bigint not null REFERENCES users(id),
    status varchar(50) not null,
    price float not null
);