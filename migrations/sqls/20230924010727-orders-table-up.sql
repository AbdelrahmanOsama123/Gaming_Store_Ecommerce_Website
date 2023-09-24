create table orders (
    id bigserial PRIMARY KEY,
    user_id bigint not null REFERENCES users(id),
    status varchar(100) DEFAULT 'current',
    price float not null
);