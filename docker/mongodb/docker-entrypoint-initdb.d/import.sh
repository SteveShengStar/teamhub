#! /bin/bash
echo "Importing database dump..."
mongorestore -d teamhub /docker-entrypoint-initdb.d/dump