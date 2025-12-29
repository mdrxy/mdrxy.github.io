#!/bin/bash
# Minifies all HTML files in the repository before deployment

npm install -g html-minifier-terser

find . -name '*.html' -type f -exec html-minifier-terser \
  --collapse-whitespace \
  --remove-comments \
  --remove-redundant-attributes \
  --remove-script-type-attributes \
  --remove-style-link-type-attributes \
  --minify-css true \
  --minify-js true \
  -o {} {} \;

# Options:
#   --collapse-whitespace            Remove unnecessary whitespace between tags
#   --remove-comments                Strip HTML comments
#   --remove-redundant-attributes    Remove attributes with default values (e.g., type="text" on inputs)
#   --remove-script-type-attributes  Remove type="text/javascript" from script tags
#   --remove-style-link-type-attributes  Remove type="text/css" from style/link tags
#   --minify-css true                Minify inline CSS in <style> tags and style attributes
#   --minify-js true                 Minify inline JavaScript in <script> tags