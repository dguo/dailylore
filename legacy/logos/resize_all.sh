#!/bin/bash

for file in *.png
do
    python image_resizer.py $file
done