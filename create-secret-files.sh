#!/bin/bash
echo "Creating secret files"
touch auth_session_secret.txt \
    auth_db_url.txt \
    auth_db_port.txt \
    auth_db_username.txt \
    auth_db_password.txt \
    auth_db_name.txt \
    auth_redis_url.txt \
    auth_redis_port.txt \
    auth_mq_url.txt \
    product_db_url.txt \
    product_db_port.txt \
    product_db_username.txt \
    product_db_password.txt \
    product_db_name.txt \
    store_db_url.txt \
    store_db_port.txt \
    store_db_username.txt \
    store_db_password.txt \
    store_db_name.txt \
    store_mq_url.txt 
echo "Files are created"