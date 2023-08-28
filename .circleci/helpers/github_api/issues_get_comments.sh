if [ $# -ne 1 ]; then
  echo "Usage: $0 <ISSUE_API_ENDPOINT>"
  exit 1
fi
ISSUE_API_ENDPOINT="$1"

echo "$(curl -H 'Authorization: Bearer $GITHUB_TOKEN' $ISSUE_API_ENDPOINT/comments)"
