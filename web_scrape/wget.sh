#!/bin/bash

date="$1"
path="$2"

#downloads the images in the list
wget -w 1 -nc -4 -i "$path"/days/"$date"/"$date"*.txt -P "$path"/days/"$date"/ -U "Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/116.0"
