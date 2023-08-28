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
echo "$response"
