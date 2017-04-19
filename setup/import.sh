#!/bin/sh
# Import sample articles into MongoDB

filename="$1"
echo $filename
`mongoimport --db articlesdb --collection articles --drop --file $filename --jsonArray`