#!/bin/bash

# Exit script if you try to use an uninitialized variable.
set -o nounset
# Use the error status of the first failure, rather than that of the last item in a pipeline.
set -o pipefail

if [ $# -ne 1 ]; then
  echo "Usage: $0 <ISSUE_API_ENDPOINT>"
  exit 1
fi
ISSUE_API_ENDPOINT="$1"

comments_url_endpoint="$ISSUE_API_ENDPOINT/comments"
authHeader="Authorization:Bearer $GITHUB_TOKEN"
contentTypeHeader="Content-Type:application/json"
apiVersion="X-GitHub-Api-Version: 2022-11-28"

curl_command=(-X GET "$comments_url_endpoint" -H "$contentTypeHeader" -H "$authHeader" -H "$apiVersion")

# Execute the curl command and store the response code
response=$(curl "${curl_command[@]}")
echo "$response"
