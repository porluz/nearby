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

# Get the name of the current branch
current_branch=$(git symbolic-ref --short HEAD)

# Get the name of the corresponding branch on 'origin'
origin_branch="origin/main"

# Get the list of commits that affect the specified folder in the current branch
commits=$(git log --oneline $origin_branch..$current_branch -- $folder_path)

# Check if there are any commits that affect the folder
if [ -n "$commits" ]; then
  echo true
else
  echo false
fi

