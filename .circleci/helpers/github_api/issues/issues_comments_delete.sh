#!/bin/bash

# Exit script if you try to use an uninitialized variable.
set -o nounset
# Use the error status of the first failure, rather than that of the last item in a pipeline.
set -o pipefail

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
curl_command=(-s -X DELETE "$COMMENT_ENDPOINT" -H "$AUTH_HEADER")
# Execute the curl command and delete the existing comment
response_code=$(curl "${curl_command[@]}" -o /dev/null -w '%{http_code}')

# Return the response code
echo $response_code
