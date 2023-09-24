create table cart (
    id bigserial PRIMARY KEY,
    user_id bigint not null REFERENCES users(id)
);