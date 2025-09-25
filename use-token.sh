#!/bin/bash
# Loads token from .env.local and updates git remote to use it

export $(grep GITHUB_PAT .env.local)
git remote set-url origin https://$GITHUB_PAT@github.com/Smauldin100/santiskills.git
echo "✅ Git remote updated with token from .env.local"
