#!/bin/bash

if [ $# -ne 1 ]; then
  echo "Usage: $0 <ISSUE_API_ENDPOINT>"
  exit 1
fi
ISSUE_API_ENDPOINT="$1"

authHeader="Authorization:Bearer $GITHUB_TOKEN"
contentTypeHeader="Content-Type:application/json"
curl_command=(-X GET "$ISSUE_API_ENDPOINT" -H "$contentTypeHeader" -H "$authHeader")

# Execute the curl command and store the response code
response=$(curl "${curl_command[@]}")

if [[ "$response" =~ ^2[0-9][0-9]$ ]]; then
    echo "Curl request to get issue comments was successful"
else
    echo "Curl request to get issue comments failed"
fi
echo "$response"
