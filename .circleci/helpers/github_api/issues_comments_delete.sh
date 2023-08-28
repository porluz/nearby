#!/bin/bash

if [ $# -eq 1 ]; then
  echo "Error: Please provide the PR comment id as an argument."
  exit 1
fi

# Get the comment id from the argument
COMMENT_ID="$1"
AUTH_HEADER="Authorization:Bearer $GITHUB_TOKEN"
API_URL="$ISSUES_API_ENDPOINT/comments/$COMMENT_ID"

# Create an array of curl args
curl_command=(-X DELETE "$API_URL" -H "$AUTH_HEADER)")
# Execute the curl command and delete the existing comment
$(curl "${curl_command[@]}")

