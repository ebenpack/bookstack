# BookStack

To get started, first, build the frontend:

1. `npm install --prefix ./client`
2. `npm run build --prefix ./client`

Then spin up the server:

1. `python3 -m venv .env`
2. `source .env/bin/activate`
3. `pip install -r requirements.txt`
4. `./manage.py runserver`