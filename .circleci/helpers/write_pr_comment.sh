#!/bin/bash

# Exit script if you try to use an uninitialized variable.
# set -o nounset
# Exit script if a statement returns a non-true return value.
# set -o errexit
# Use the error status of the first failure, rather than that of the last item in a pipeline.
# set -o pipefail

if [ $# -eq 0 ]; then
  echo "Error: Please provide the PR comment body as an argument."
  exit 1
fi

# Get the comment body from the argument
pr_body="hey\n\nthere"

# Move the body into a JSON payload
echo '{}' | jq --arg body "$pr_body" '. + {body: $body}' > temp.json
json=$(cat temp.json)
echo "JSON Payload: $json"
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