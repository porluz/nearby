#!/bin/bash

echo "Creating shared env variables"
PR_NUMBER="${CIRCLE_PULL_REQUEST##*/}"
COVERAGE_ARTIFACTS_URL="https://output.circle-artifacts.com/output/job/${CIRCLE_WORKFLOW_JOB_ID}/artifacts/${CIRCLE_NODE_INDEX}/coverage"
ISSUES_API_ENDPOINT="https://api.github.com/repos/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/issues"
ISSUES_API_ENDPOINT="$ISSUES_API_ENDPOINT/$PR_NUMBER"
ARTIFACT_URL="$COVERAGE_ARTIFACTS_URL/index.html"

# Add env variables to the bash env
echo "export PR_NUMBER='$PR_NUMBER'" >> $BASH_ENV
echo "export COVERAGE_ARTIFACTS_URL='$COVERAGE_ARTIFACTS_URL'" >> $BASH_ENV
echo "export ISSUES_API_ENDPOINT='$ISSUES_API_ENDPOINT'" >> $BASH_ENV
echo "export ISSUES_API_ENDPOINT='$ISSUES_API_ENDPOINT'" >> $BASH_ENV
echo "export ARTIFACT_URL='$ARTIFACT_URL'" >> $BASH_ENV

echo "Checking if the test coverage job should be skipped..."
UI_CHANGES_DETECTED="$(.circleci/helpers/folder_has_changes.sh src)"
COMMIT_SKIP_COVERAGE_MESSAGE_FOUND="$(.circleci/helpers/commit_summary_contains.sh skipTestCoverage)"
PR_DESCRIPTION_SKIP_MESSAGE_FOUND="$(.circleci/helpers/issues_body_contains.sh $ISSUES_API_ENDPOINT '**Reason for missing FE tests**:')"
SKIP_FE_COVERAGE_CHECK="false"
echo "completed setting env vars"
# Check if any of the variables is  "true"
if [ "$UI_CHANGES_DETECTED" == "true" ]; then
    # Check if at least one of the other two variables is "true"
    if [ "$COMMIT_SKIP_COVERAGE_MESSAGE_FOUND" == "true" ] || [ "$PR_DESCRIPTION_SKIP_MESSAGE_FOUND" == "true" ]; then
    SKIP_FE_COVERAGE_CHECK="true"
    fi
fi

if [ "$SKIP_FE_COVERAGE_CHECK" == "true" ]; then
    echo "Skipping the FE test coverage job..."
    exit 0  # Exit with success status to skip the job
fi
npm run test:coverage-badges

# Create the test coverage badge links to the coverage report
test_badges_content="**FE test coverage:**\n[![Branches]($COVERAGE_ARTIFACTS_URL/badge-branches.svg)]($ARTIFACT_URL) [![Functions]($COVERAGE_ARTIFACTS_URL/badge-functions.svg)]($ARTIFACT_URL) [![Lines]($COVERAGE_ARTIFACTS_URL/badge-lines.svg)]($ARTIFACT_URL) [![Statements]($COVERAGE_ARTIFACTS_URL/badge-statements.svg)]($ARTIFACT_URL)"

# Setup the hidden comment and new comment
HIDDEN_COMMENT_START="<!-- Jest Coverage Comment:Begin -->"
HIDDEN_COMMENT_END="<!-- Jest Coverage Comment:End -->"
HIDDEN_COMMENT="$HIDDEN_COMMENT_START $HIDDEN_COMMENT_END"
NEW_COMMENT="$test_badges_content"

# Create the JSON body for the comment
pr_comment_body="$HIDDEN_COMMENT\n$NEW_COMMENT"
echo "New comment: $pr_comment_body"

# Get all comments for the PR
COMMENTS=$(curl -H "Authorization: Bearer $GITHUB_TOKEN" "$ISSUES_API_ENDPOINT/comments")
echo "Comments: $COMMENTS"

# Find the existing comment with the hidden marker
COMMENT_ID=$(echo "$COMMENTS" | jq -r --arg COMMENT "$HIDDEN_COMMENT_START" '.[] | select(.body | contains($COMMENT)) | .id')
echo "Comment ID: $COMMENT_ID" 

# If the comment was found, delete it and create a new one
response_code=0
response=""
if [ "$COMMENT_ID" != "" ]; then
    # Delete the existing comment
    $(./.circleci/helpers/github_api/issues_comments_delete.sh "$COMMENT_ID")
    # Write the new comment
    echo "Creating a new coverage comment..."
    response=$(./.circleci/helpers/github_api/issues_comments_post.sh "$ISSUES_API_ENDPOINT" "$pr_comment_body")
else
    # Write the comment
    echo "Creating a new coverage comment..."
    response=$(./.circleci/helpers/github_api/issues_comments_post.sh "$ISSUES_API_ENDPOINT" "$pr_comment_body")
fi
response_code=$(echo "$response" | tail -n 1)
echo "response_code: $response_code"
if [[ "$response_code" =~ ^2[0-9][0-9]$ ]]; then
    echo "Curl request was successful with HTTP status code $response_code"
else
    echo "Curl request failed with HTTP status code $response_code"
    exit 1  # Fail the CircleCI job
fi
