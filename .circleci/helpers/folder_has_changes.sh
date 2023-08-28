#!/bin/bash
# Check if the specified folder has changes

# Exit script if you try to use an uninitialized variable.
set -o nounset
# Use the error status of the first failure, rather than that of the last item in a pipeline.
set -o pipefail

# Check if the folder path argument is provided
if [ $# -eq 0 ]; then
  echo "Error: Please provide the folder path as an argument."
  exit 1
fi

folder_path="$1"  # Get the folder path from the argument

# Check for changes in the specified folder
if git diff --name-only HEAD^..HEAD | grep -q "^$folder_path/"; then
  echo true
else
  echo false
fi
