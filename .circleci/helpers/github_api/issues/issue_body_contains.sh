#!/bin/bash
# Check if the issue description contains a query string

# Exit script if you try to use an uninitialized variable.
set -o nounset
# Use the error status of the first failure, rather than that of the last item in a pipeline.
set -o pipefail

# Check if the Issues API URL and query string arguments are provided
if [ $# -ne 2 ]; then
   echo "Usage: $0 <ISSUE_API_ENDPOINT> <QUERY_STRING>"
  exit 1
fi

ISSUE_API_ENDPOINT="$1"
QUERY_STRING="$2"
ISSUE_BODY=$(./.circleci/helpers/github_api/issues/issues_get_body.sh "$ISSUE_API_ENDPOINT")
QUERY_STRING_ESCAPED=$(printf "%s\n" "$QUERY_STRING" | sed 's/[][()\.^$?*+]/\\&/g')
# Check if the PR description contains the query string
 if [[ "$ISSUE_BODY" =~ .*${QUERY_STRING_ESCAPED}.* ]]; then
  echo true
else
  echo false
fi
