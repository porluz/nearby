#!/bin/bash
# Create FE test coverage report comment and posts it on the PR

# Exit script if you try to use an uninitialized variable.
set -o nounset
# Use the error status of the first failure, rather than that of the last item in a pipeline.
set -o pipefail

PR_NUMBER="${CIRCLE_PULL_REQUEST##*/}"
CIRCLE_CI_ARTIFACTS_ENDPOINT="https://output.circle-artifacts.com/output/job/${CIRCLE_WORKFLOW_JOB_ID}/artifacts/${CIRCLE_NODE_INDEX}/coverage"
ISSUES_API_ENDPOINT="https://api.github.com/repos/$CIRCLE_PROJECT_USERNAME/$CIRCLE_PROJECT_REPONAME/issues"
PR_ISSUE_ENDPOINT="$ISSUES_API_ENDPOINT/$PR_NUMBER"
COVERAGE_ARTIFACT_REPORT_URL="$CIRCLE_CI_ARTIFACTS_ENDPOINT/index.html"

echo "Checking if the test coverage report should be skipped..."
SKIP_FE_COVERAGE_DESCRIPTION_TEXT="**Reason for missing FE tests**:"
SKIP_FE_COVERAGE_COMMIT_TEXT="skipTestCoverage"
UI_CHANGES_DETECTED="$(./.circleci/helpers/folder_has_changes.sh ./src)"
COMMIT_SKIP_COVERAGE_MESSAGE_FOUND="$(./.circleci/helpers/commit_summary_contains.sh "$SKIP_FE_COVERAGE_COMMIT_TEXT")"
PR_DESCRIPTION_SKIP_MESSAGE_FOUND="$(./.circleci/helpers/github_api/issues/issue_body_contains.sh "$PR_ISSUE_ENDPOINT" "$SKIP_FE_COVERAGE_DESCRIPTION_TEXT")"
SKIP_FE_COVERAGE_CHECK="false"

if [ "$UI_CHANGES_DETECTED" == "true" ]; then
    echo "UI changes detected"
    if [ "$COMMIT_SKIP_COVERAGE_MESSAGE_FOUND" == "true" ]; then
        echo "Commit message contains skipTestCoverage"
        SKIP_FE_COVERAGE_CHECK="true"
    fi
    if [ "$PR_DESCRIPTION_SKIP_MESSAGE_FOUND" == "true" ]; then
        echo "PR description contains skip test coverage reason"
        SKIP_FE_COVERAGE_CHECK="true"
    fi
else
    echo "No UI changes detected"
    SKIP_FE_COVERAGE_CHECK="true"
fi

if [ "$SKIP_FE_COVERAGE_CHECK" == "true" ]; then
    echo "Skipping the FE test coverage report job..."
    exit 0  # Exit with success status to skip the job
fi

echo "Creating test coverage badges..."
npm run test:coverage-badges

# Setup the hidden comment and new comment
hidden_comment_start="<!-- Jest Coverage Comment:Begin -->"
hidden_comment_end="<!-- Jest Coverage Comment:End -->"
# Create the test coverage badge links to the coverage report
test_badges_content="**FE test coverage:**\n[![Branches]($CIRCLE_CI_ARTIFACTS_ENDPOINT/badge-branches.svg)]($COVERAGE_ARTIFACT_REPORT_URL) [![Functions]($CIRCLE_CI_ARTIFACTS_ENDPOINT/badge-functions.svg)]($COVERAGE_ARTIFACT_REPORT_URL) [![Lines]($CIRCLE_CI_ARTIFACTS_ENDPOINT/badge-lines.svg)]($COVERAGE_ARTIFACT_REPORT_URL) [![Statements]($CIRCLE_CI_ARTIFACTS_ENDPOINT/badge-statements.svg)]($COVERAGE_ARTIFACT_REPORT_URL)"
hidden_comment="$hidden_comment_start $hidden_comment_end"
# Create the PR comment body
pr_comment_body="$hidden_comment\n$test_badges_content"

echo "Checking comments for existing FE coverage comment..."
# Get all comments for the PR
comments=$(./.circleci/helpers/github_api/issues/issues_comments_get.sh "$PR_ISSUE_ENDPOINT")
# Find the existing comment with the hidden marker
comment_id=$(echo "$comments" | jq -r --arg COMMENT "$hidden_comment_start" '.[] | select(.body | contains($COMMENT)) | .id')
echo "Comment ID: $comment_id" 

# If the comment was found, delete it and create a new one, otherwise create a new comment
issues_comment_create_response=""
if [ "$comment_id" != "" ]; then
    echo "Comment found. Deleting it and creating a new coverage comment..."
    delete_response_code=$(./.circleci/helpers/github_api/issues/issues_comments_delete.sh "$ISSUES_API_ENDPOINT" "$comment_id")
    echo "Curl request to delete existing comment response code: $delete_response_code"
    # Write the new comment
    issues_comment_create_response=$(./.circleci/helpers/github_api/issues/issues_comments_post.sh "$PR_ISSUE_ENDPOINT" "$pr_comment_body")
else
    echo "Comment not found. Creating a new coverage comment..."
    issues_comment_create_response=$(./.circleci/helpers/github_api/issues/issues_comments_post.sh "$PR_ISSUE_ENDPOINT" "$pr_comment_body")
fi

response_code=$(echo "$issues_comment_create_response")
if [[ "$response_code" =~ ^2[0-9][0-9]$ ]]; then
    echo "Curl request to create coverage comment was successful with HTTP status code $response_code"
else
    echo "Curl request to create coverage comment failed with HTTP status code $response_code"
    exit 1  # Fail the CircleCI job
fi
