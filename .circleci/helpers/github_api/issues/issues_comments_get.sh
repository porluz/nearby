#!/bin/bash

# Exit script if you try to use an uninitialized variable.
set -o nounset
# Exit script if a statement returns a non-true return value.
#set -o errexit
# Use the error status of the first failure, rather than that of the last item in a pipeline.
set -o pipefail

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
