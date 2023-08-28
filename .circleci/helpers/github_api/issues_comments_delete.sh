#!/bin/bash

# Get the ISSUE API endpoint and the comment id from the arguments
if [ $# -ne 2 ]; then
  echo "Usage: $0 <ISSUE_API_ENDPOINT> <COMMENT_ID>"
  exit 1
fi
ISSUE_API_ENDPOINT="$1"
COMMENT_ID="$2"

AUTH_HEADER="Authorization:Bearer $GITHUB_TOKEN"
API_URL="$ISSUE_API_ENDPOINT/comments/$COMMENT_ID"

# Create an array of curl args
curl_command=(-X DELETE "$API_URL" -H "$AUTH_HEADER")
# Execute the curl command and delete the existing comment
$(curl "${curl_command[@]}")

