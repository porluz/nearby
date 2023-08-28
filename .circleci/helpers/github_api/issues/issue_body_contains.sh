#!/bin/bash
# Check if the issue description contains a query string

# Check if the Issues API URL and query string arguments are provided
if [ $# -ne 2 ]; then
  echo "Usage: $0 <ISSUES_API_URL> <QUERY_STRING>"
  exit 1
fi

ISSUES_API_URL="$1"
QUERY_STRING="$1"
ISSUES_BODY=$(./.circleci/helpers/github_api/issues/issues_get_body.sh "$ISSUES_API_URL")

# Check if the PR description contains the query string
if [[ "$ISSUES_BODY" =~ $QUERY_STRING ]]; then
  echo true
else
  echo false
fi
