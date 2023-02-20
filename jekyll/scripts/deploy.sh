#!/bin/bash
# Use case
# ./script/build.sh DEST=${Destination}

# Example
# ./script/test.sh DEST=/group/yyy/totoro
# 	DEST = /group/yyy/totoro
# ./script/test.sh
#	DEST = /group/www/BigDas

DEST=/group/www/BigDas
# Parses arguments...
for ARGUMENT in "$@"
do
  KEY=$(echo $ARGUMENT | cut -f1 -d=)
  VALUE=$(echo $ARGUMENT | cut -f2 -d=)
  case "$KEY" in
    DEST)  DEST=${VALUE} ;;
    *)
  esac
done

jekyll build -d $DEST
