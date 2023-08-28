#!/bin/bash
# Check if the last commit summary contains a query string

if [ $# -eq 0 ]; then
  echo "Error: Please provide the query string as an argument."
  exit 1
fi

# Get the query string from the argument
commit_summary_query="$1"

if git log -1 --pretty=format:%s | grep -q "$commit_summary_query"; then
  echo true
else
  echo false
fi
