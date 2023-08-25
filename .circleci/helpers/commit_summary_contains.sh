#!/bin/bash
# Check the last commit message for "skipTestCoverage"

if [ $# -eq 0 ]; then
  echo "Error: Please provide the query string as an argument."
  exit 1
fi

# Get the query string from the argument
commit_summary_query="$1"

if git log -1 --pretty=format:%s | grep -q "$commit_summary_query"; then
  # echo "$commit_summary_query found in the last commit message."
  echo true
else
  # echo "$commit_summary_query not found in the last commit message."
  echo false
fi