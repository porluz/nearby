#!/bin/bash
# Check if the PR description contains a query string

# Check if the PR API URL and query string arguments are provided
if [ $# -ne 1 ]; then
  echo "Usage: $0 <ISSUES_API_ENDPOINT>"
  exit 1
fi

# Get the PR API URL and the query string from the arguments
ISSUES_API_ENDPOINT="$1"

# Fetch the PR description using the GitHub API
ISSUES_BODY=$(curl -s -H "Authorization: token $GITHUB_TOKEN" "$ISSUES_API_ENDPOINT" | jq -r .body)

echo "$ISSUES_BODY"
