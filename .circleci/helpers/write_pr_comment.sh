#!/bin/bash

if [ $# -eq 0 ]; then
  echo "Error: Please provide the PR comment body as an argument."
  exit 1
fi

# Get the comment body from the argument
pr_body="$1"

# Move the body into a JSON payload
echo "{\"body\":\"$pr_body\"}" > temp.json
json=$(cat temp.json)
payload="@./temp.json"
authHeader="Authorization:Bearer $GITHUB_TOKEN"
contentTypeHeader="Content-Type:application/json"

# Create an array of curl args
API_URL="$PR_API_ENDPOINT/comments"
curl_command=(-X POST "$API_URL" -d "$payload" -H "$contentTypeHeader" -H "$authHeader")

# Execute the curl command and store the response code
response_code=$(curl "${curl_command[@]}" -o /dev/null -w '%{http_code}')

# Return the response code
echo $response_code