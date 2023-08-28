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
response_code=$(curl "${curl_command[@]}" -o /dev/null -w '%{http_code}')

if [[ "$response_code" =~ ^2[0-9][0-9]$ ]]; then
    echo "Curl request to get issue comments was successful with HTTP status code $response_code"
else
    echo "Curl request to get issue comments failed with HTTP status code $response_code"
fi
