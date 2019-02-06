#!/usr/bin/env bash

CUR_DIR=$(pwd)

NODE_VERSION="10.15.1"
wget https://nodejs.org/download/release/latest-v10.x/node-v${NODE_VERSION}-linux-x64.tar.gz -nv
tar xzfp node-v${NODE_VERSION}-linux-x64.tar.gz
rm node-v${NODE_VERSION}-linux-x64.tar.gz
export NODEJS_HOME="$CUR_DIR/node-v${NODE_VERSION}-linux-x64"
export PATH=${NODEJS_HOME}/bin:$PATH
node --version

YARN_VERSION="1.14.0"
wget https://github.com/yarnpkg/yarn/releases/download/v${YARN_VERSION}/yarn-v${YARN_VERSION}.tar.gz -nv
tar xzfp yarn-v${YARN_VERSION}.tar.gz
rm yarn-v${YARN_VERSION}.tar.gz
export YARN_HOME="$CUR_DIR/yarn-v${YARN_VERSION}"
export PATH=$PATH:${YARN_HOME}/bin
yarn --version

yarn install
npm run build

cp -Rf wwwroot/* /home/site/wwwroot/

dotnet ef database update

rm -rf ${NODEJS_HOME}
rm -rf ${YARN_HOME}
