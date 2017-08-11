#!/usr/bin/env bash

npm run build
rm -rf ../realmetric.github.io/*
cp -r build/ ../realmetric.github.io/