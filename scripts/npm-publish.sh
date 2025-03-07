#!/bin/bash

echo "以下のパッケージを公開します："
echo "- notion-md-converter-types"
echo "- notion-md-converter-testing"
echo "- notion-md-converter-core"
echo "- notion-md-converter-zenn"
echo "- notion-md-converter-qiita"
echo ""
read -p "続行しますか？ (y/N): " yn
case "$yn" in
  [yY]*) ;;
  *) echo "中止しました"; exit 1;;
esac

root=$(pwd)

# パッケージの一覧
packages=(
  "notion-md-converter-types"
  "notion-md-converter-testing"
  "notion-md-converter-core"
  "notion-md-converter-zenn"
  "notion-md-converter-qiita"
)

echo "Start npm publish"

# 各パッケージを公開
for package in "${packages[@]}"; do
  echo "Publishing $package..."
  cd "$root/packages/$package"
  pnpm publish --access public
done

cd "$root"
echo "Done"
