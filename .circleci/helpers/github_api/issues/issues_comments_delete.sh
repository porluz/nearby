#!/bin/bash

# Get the ISSUE API endpoint and the comment id from the arguments
if [ $# -ne 2 ]; then
  echo "Usage: $0 <ISSUE_API_ENDPOINT> <COMMENT_ID>"
  exit 1
fi
ISSUE_API_ENDPOINT="$1"
COMMENT_ID="$2"

AUTH_HEADER="Authorization:Bearer $GITHUB_TOKEN"
COMMENT_ENDPOINT="$ISSUE_API_ENDPOINT/comments/$COMMENT_ID"

# Create an array of curl args
curl_command=(-X DELETE "$COMMENT_ENDPOINT" -H "$AUTH_HEADER")
# Execute the curl command and delete the existing comment
response_code=$(curl "${curl_command[@]}" -o /dev/null -w '%{http_code}')

if [[ "$response_code" =~ ^2[0-9][0-9]$ ]]; then
    echo "Curl request to delete issue comment was successful with HTTP status code $response_code"
else
    echo "Curl request to delete issue comment failed with HTTP status code $response_code"
fi

# Return the response code
echo $response_code
