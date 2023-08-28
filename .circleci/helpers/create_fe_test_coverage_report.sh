#!/bin/bash

PR_NUMBER="${CIRCLE_PULL_REQUEST##*/}"
CIRCLE_CI_ARTIFACTS_ENDPOINT="https://output.circle-artifacts.com/output/job/${CIRCLE_WORKFLOW_JOB_ID}/artifacts/${CIRCLE_NODE_INDEX}/coverage"
ISSUES_API_ENDPOINT="https://api.github.com/repos/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/issues"
PR_ISSUE_ENDPOINT="$ISSUES_API_ENDPOINT/$PR_NUMBER"
COVERAGE_ARTIFACT_REPORT_URL="$CIRCLE_CI_ARTIFACTS_ENDPOINT/index.html"


echo "Checking if the test coverage report should be skipped..."
UI_CHANGES_DETECTED="$(.circleci/helpers/folder_has_changes.sh src)"
COMMIT_SKIP_COVERAGE_MESSAGE_FOUND="$(.circleci/helpers/commit_summary_contains.sh skipTestCoverage)"
PR_DESCRIPTION_SKIP_MESSAGE_FOUND="$(.circleci/helpers/issues_body_contains.sh $ISSUES_API_ENDPOINT '**Reason for missing FE tests**:')"
SKIP_FE_COVERAGE_CHECK="false"

if [ "$UI_CHANGES_DETECTED" == "true" ]; then
    if [ "$COMMIT_SKIP_COVERAGE_MESSAGE_FOUND" == "true" ] || [ "$PR_DESCRIPTION_SKIP_MESSAGE_FOUND" == "true" ]; then
    SKIP_FE_COVERAGE_CHECK="true"
    fi
fi

if [ "$SKIP_FE_COVERAGE_CHECK" == "true" ]; then
    echo "Skipping the FE test coverage job..."
    exit 0  # Exit with success status to skip the job
fi

echo "Creating test coverage badges..."
npm run test:coverage-badges

# Create the test coverage badge links to the coverage report
test_badges_content="**FE test coverage:**\n[![Branches]($CIRCLE_CI_ARTIFACTS_ENDPOINT/badge-branches.svg)]($COVERAGE_ARTIFACT_REPORT_URL) [![Functions]($CIRCLE_CI_ARTIFACTS_ENDPOINT/badge-functions.svg)]($COVERAGE_ARTIFACT_REPORT_URL) [![Lines]($CIRCLE_CI_ARTIFACTS_ENDPOINT/badge-lines.svg)]($COVERAGE_ARTIFACT_REPORT_URL) [![Statements]($CIRCLE_CI_ARTIFACTS_ENDPOINT/badge-statements.svg)]($COVERAGE_ARTIFACT_REPORT_URL)"

# Setup the hidden comment and new comment
hidden_comment_start="<!-- Jest Coverage Comment:Begin -->"
hidden_comment_end="<!-- Jest Coverage Comment:End -->"
hidden_comment="$hidden_comment_start $hidden_comment_end"

# Create the JSON body for the comment
pr_comment_body="$hidden_comment\n$test_badges_content"
echo "New comment: $pr_comment_body"

# Get all comments for the PR
comments=$(./.circleci/helpers/github_api/issues_get_comments.sh)
echo "Comments: $comments"

# Find the existing comment with the hidden marker
comment_id=$(echo "$comments" | jq -r --arg COMMENT "$hidden_comment_start" '.[] | select(.body | contains($COMMENT)) | .id')
echo "Comment ID: $comment_id" 

# If the comment was found, delete it and create a new one, otherwise create a new comment
response=""
if [ "$comment_id" != "" ]; then
    # Delete the existing comment
    $(./.circleci/helpers/github_api/issues_comments_delete.sh "$PR_ISSUE_ENDPOINT" "$comment_id")
    # Write the new comment
    echo "Creating a new coverage comment..."
    response=$(./.circleci/helpers/github_api/issues_comments_post.sh "$PR_ISSUE_ENDPOINT" "$pr_comment_body")
else
    # Write the comment
    echo "Creating a new coverage comment..."
    response=$(./.circleci/helpers/github_api/issues_comments_post.sh "$PR_ISSUE_ENDPOINT" "$pr_comment_body")
fi
# Grab all the output for debugging, but only use the last line for the response code
response_code=$(echo "$response" | tail -n 1)
if [[ "$response_code" =~ ^2[0-9][0-9]$ ]]; then
    echo "Curl request to create coverage comment was successful with HTTP status code $response_code"
else
    echo "Curl request to create coverage comment failed with HTTP status code $response_code"
    exit 1  # Fail the CircleCI job
fi