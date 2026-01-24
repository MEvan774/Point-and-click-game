#!/bin/bash
cd /vercel/path0
npm install
npm run build --workspace=@adventure-game/web
touch dist/web/api.js
echo "module.exports = () => {}" > dist/web/api.js
