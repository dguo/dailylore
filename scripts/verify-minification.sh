#!/usr/bin/env bash

NUM_LINES=$(wc -l < "bundle.js")

if [ "$NUM_LINES" -gt 3 ]; then
    echo The JavaScript bundle is not minified.
    exit 1
fi

echo The JavaScript bundle is minified.

