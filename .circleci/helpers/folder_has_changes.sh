#!/bin/bash
# Check if the specified folder has changes

# Exit script if you try to use an uninitialized variable.
# set -o nounset
# Exit script if a statement returns a non-true return value.
# set -o errexit
# Use the error status of the first failure, rather than that of the last item in a pipeline.
# set -o pipefail

# Check if the folder path argument is provided
if [ $# -eq 0 ]; then
  echo "Error: Please provide the folder path as an argument."
  exit 1
fi

folder_path="$1"  # Get the folder path from the argument

# Check for changes in the specified folder
if git diff --name-only HEAD^..HEAD | grep -q "^$folder_path/"; then
  echo "Changes in the '$folder_path' folder detected."
  echo true
else
  echo "No changes in the '$folder_path' folder."
  echo false
fi