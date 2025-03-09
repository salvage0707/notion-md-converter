#!/bin/bash

NEW_VERSION=$(npm view @notion-md-converter/core version)
CURRENT_DIR=$(pwd)

# exampleパッケージの依存関係を更新
for pkg in example/*/package.json; do
  # @notion-md-converterから始まる依存関係をすべて更新
  sed -i.bak 's/"@notion-md-converter\/\([^"]*\)": "[^"]*"/"@notion-md-converter\/\1": "^'$NEW_VERSION'"/' $pkg
  rm "${pkg}.bak"
done

# exampleディレクトリ内のすべてのpackage.jsonがあるディレクトリでpnpm installを実行
for pkg in example/*/package.json; do
  pkg_dir=$(dirname $pkg)
  echo "Installing dependencies in $pkg_dir..."
  cd $pkg_dir
  pnpm install
  cd $CURRENT_DIR
done

# 変更をコミットしてPRを作成
git config --global user.name 'github-actions[bot]'
git config --global user.email 'github-actions[bot]@users.noreply.github.com'

git checkout -b "examples/update-deps-$NEW_VERSION"
git add example/*/package.json
git commit -m "chore: update example dependencies to version $NEW_VERSION"
git push origin "examples/update-deps-$NEW_VERSION"

# PRを作成
gh pr create \
  --title "chore: update example dependencies to version $NEW_VERSION" \
  --body "Update example package dependencies to match the latest published version." \
  --base main \
  --head "examples/update-deps-$NEW_VERSION"
