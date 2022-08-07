#! /bin/bash
echo "Importing database dump..."
mongorestore -d teamhub docker/mongodb/docker-entrypoint-initdb.d/dump