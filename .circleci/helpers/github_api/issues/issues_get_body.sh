#!/bin/bash
# Check if the issue description contains a query string

# Check if the ISSUE API URL is provided
if [ $# -ne 1 ]; then
  echo "Usage: $0 <ISSUE_API_ENDPOINT>"
  exit 1
fi
ISSUE_API_ENDPOINT="$1"

# Fetch the PR description using the GitHub API
issue_body=$(curl -s -H "Authorization: token $GITHUB_TOKEN" "$ISSUE_API_ENDPOINT" | jq -r .body)

echo "$issue_body"
