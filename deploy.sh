#!/bin/sh
git add dist && git commit -m "rebuild dist"
git subtree push --prefix dist origin gh-pages