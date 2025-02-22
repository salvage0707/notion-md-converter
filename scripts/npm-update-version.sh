#!/bin/bash

# バージョンアップの種類をチェック
if [ -z "$1" ]; then
  echo "使用方法: $0 [patch|minor|major]"
  exit 1
fi

version_type=$1

if [ "$version_type" != "patch" ] && [ "$version_type" != "minor" ] && [ "$version_type" != "major" ]; then
  echo "エラー: バージョンタイプは patch, minor, major のいずれかを指定してください"
  exit 1
fi

root=$(pwd)

# パッケージの一覧
packages=(
  "notion-md-converter-types"
  "notion-md-converter-testing"
  "notion-md-converter-core"
  "notion-md-converter-zenn"
)

echo "Start npm version $version_type"

# 各パッケージに対してバージョンアップとビルドを実行
for package in "${packages[@]}"; do
  echo "Processing $package..."
  cd "$root/packages/$package"
  npm version "$version_type"
done

cd "$root"
echo "Done"
