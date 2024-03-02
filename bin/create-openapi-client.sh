#!/bin/sh

# ------------------
# Automatically generate an API Client file based on openapi.yaml.
# ------------------

# move to project root
script_path=$(cd $(dirname "$0") && pwd)
cd $script_path/../

# delete foler when if service/node-client is exist
if [ -d "services/node-client" ]; then
  rm -rf services/node-client
fi

# openapi-generator-cli generate コマンドを実行
node_modules/@openapitools/openapi-generator-cli/main.js generate
rm services/node-client/.openapi-generator-ignore
rm -rf services/node-client/.openapi-generator
