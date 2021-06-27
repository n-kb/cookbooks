cd app
yarn build
git ac -m "added build"
cd ..
git subtree push --prefix app/dist origin gh-pages
cd server
python buildcsv.py
cd ..
git ac -m "updated books db"
git subtree push --prefix server heroku main