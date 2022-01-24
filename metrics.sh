#!/bin/bash

mkdir metrics

npx codehawk src > metrics/codehawk.txt
npx eslint src > metrics/eslint.txt
npm audit > metrics/audit.txt