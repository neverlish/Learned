#!/bin/bash
set -o errexit # 오류 발생 시 종료
npm run build
git push heroku master
