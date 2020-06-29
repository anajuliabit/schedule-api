#!/bin/sh

set -e

psql -U postgres -d postgres -c "CREATE DATABASE schedule WITH ENCODING='UTF8' OWNER=postgres CONNECTION LIMIT=-1;"