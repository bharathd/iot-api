#!/bin/sh

echo "NODE_PATH VAR IS , ${NODE_PATH}"
echo "NODE_ENV VAR IS , ${NODE_ENV}"

echo "PROD_DB_HOST VAR IS , ${PROD_DB_HOST}"
echo "PROD_DB_PORT VAR IS , ${PROD_DB_PORT}"
echo "PROD_DB_NAME VAR IS , ${PROD_DB_NAME}"
echo "PROD_DB_USERNAME VAR IS , ${PROD_DB_USERNAME}"

export NODE_PATH=/home/site/wwwroot/node_modules

echo "STARTING IOT API"

node /home/site/wwwroot/build/index.js