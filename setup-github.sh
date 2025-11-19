#!/bin/bash

# CourseFlow - GitHub Repository Setup Script
# This script will authenticate with GitHub and push the repository

echo "========================================="
echo "CourseFlow - GitHub Repository Setup"
echo "========================================="
echo ""

# Step 1: Authenticate with GitHub
echo "Step 1: Authenticating with GitHub..."
echo "You will be prompted to log in via browser."
echo ""
gh auth login

# Check if authentication was successful
if [ $? -ne 0 ]; then
    echo "❌ Authentication failed. Please try again."
    exit 1
fi

echo "✅ Authentication successful!"
echo ""

# Step 2: Create and push repository
echo "Step 2: Creating GitHub repository..."
echo ""
gh repo create courseflow \
    --public \
    --source=. \
    --description="LinkedIn for University Students - Peer-to-peer academic guidance platform with verified anonymous reviews" \
    --push

# Check if repository creation was successful
if [ $? -eq 0 ]; then
    echo ""
    echo "========================================="
    echo "✅ SUCCESS!"
    echo "========================================="
    echo ""
    echo "Your repository has been created and pushed to GitHub!"
    echo ""
    echo "Repository URL:"
    gh repo view --web --json url -q .url
    echo ""
    echo "To view your repository in the browser, run:"
    echo "  gh repo view --web"
    echo ""
else
    echo "❌ Failed to create repository. Please check the error above."
    exit 1
fi
