#!/bin/bash
# Check if the last commit summary contains a query string

# Exit script if you try to use an uninitialized variable.
set -o nounset
# Exit script if a statement returns a non-true return value.
#set -o errexit
# Use the error status of the first failure, rather than that of the last item in a pipeline.
set -o pipefail

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
