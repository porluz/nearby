#!/bin/bash

# Exit script if you try to use an uninitialized variable.
set -o nounset
# Use the error status of the first failure, rather than that of the last item in a pipeline.
set -o pipefail

# Get the ISSUE API endpoint and the comment id from the arguments
if [ $# -ne 2 ]; then
  echo "Usage: $0 <ISSUES_API_ENDPOINT> <COMMENT_ID>"
  exit 1
fi
ISSUES_API_ENDPOINT="$1"
COMMENT_ID="$2"

comment_endpoint="$ISSUES_API_ENDPOINT/comments/$COMMENT_ID"

payload="@./temp.json"
authHeader="Authorization:Bearer $GITHUB_TOKEN"
contentTypeHeader="Content-Type:application/json"
apiVersion="X-GitHub-Api-Version: 2022-11-28"

# Create an array of curl args
curl_command=(-s -X DELETE "$comment_endpoint" -H "$contentTypeHeader" -H "$authHeader" -H "$apiVersion")

# Execute the curl command and delete the existing comment
response_code=$(curl "${curl_command[@]}" -o /dev/null -w '%{http_code}')

# Return the response code
echo $response_code
