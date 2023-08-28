#!/bin/bash

# Get the ISSUE API URL and the comment body from the arguments
if [ $# -ne 2 ]; then
  echo "Usage: $0 <ISSUE_API_ENDPOINT> <ISSUE_BODY>"
  exit 1
fi
ISSUE_API_ENDPOINT="$1"
ISSUE_BODY="$2"

# Move the body into a JSON payload
echo "{\"body\":\"$ISSUE_BODY\"}" > temp.json
json=$(cat temp.json)
payload="@./temp.json"
authHeader="Authorization:Bearer $GITHUB_TOKEN"
contentTypeHeader="Content-Type:application/json"

# Create an array of curl args
API_ENDPOINT="$ISSUE_API_ENDPOINT/comments"
curl_command=(-X POST "$API_ENDPOINT" -d "$payload" -H "$contentTypeHeader" -H "$authHeader")

# Execute the curl command and store the response code
response_code=$(curl "${curl_command[@]}" -o /dev/null -w '%{http_code}')

# Return the response code
echo $response_code