#!/bin/bash

# Path to input file
input_file="./input/input.txt"

# Read each word from input file
while IFS= read -r word; do
  # Execute qr command with the word as argument
  node ~/development/qr-cli/bin/cli.js -d "https://hntr.io/qr/${word}_" -e H -p 0 -s 180  -b "#00000000" -o "./output/M $word hiring.svg"
  node ~/development/qr-cli/bin/cli.js -d "https://hntr.io/qr/$word-" -e H -p 0 -s 180 -b "#00000000" -o "./output/M $word taking resumes.svg"

done < "$input_file"
