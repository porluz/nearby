#!/bin/bash
# Check if the PR description contains a query string

# Check if the PR API URL and query string arguments are provided
if [ $# -ne 2 ]; then
  echo "Usage: $0 <PR_API_URL> <QUERY_STRING>"
  exit 1
fi

# Get the PR API URL and the query string from the arguments
PR_API_URL="$1"  
QUERY_STRING="$2"

# Fetch the PR description using the GitHub API
PR_DESCRIPTION=$(curl -s -H "Authorization: token $GITHUB_TOKEN" "$PR_API_URL" | jq -r .body)

# Check if the PR description contains the query string
if [[ "$PR_DESCRIPTION" =~ $QUERY_STRING ]]; then
  echo true
else
  echo false
fi