#!/bin/bash
# Check the last commit message for "skipTestCoverage"

# Exit script if you try to use an uninitialized variable.
set -o nounset
# Exit script if a statement returns a non-true return value.
set -o errexit
# Use the error status of the first failure, rather than that of the last item in a pipeline.
set -o pipefail

if [ $# -eq 0 ]; then
  echo "Error: Please provide the query string as an argument."
  exit 1
fi

# Get the query string from the argument
commit_summary_query="$1"

if git log -1 --pretty=format:%s | grep -q "$commit_summary_query"; then
  echo "$commit_summary_query found in the last commit message."
  echo true
else
  echo "$commit_summary_query not found in the last commit message."
  echo false
fi