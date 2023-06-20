# Setup

- Create a MySQL database
- Create a `.env` file in the root of the project
- Fill it with the following variables:
    - `DB_HOST`: most likely `localhost`
    - `DB_PORT`: most likely `3306`
    - `DB_DATABASE`: the name of the created database
    - `DB_USERNAME`: your MySQL username
    - `DB_PASSWORD`: your MySQL password
- Install dependencies
    - `npm install`
- Run the server
    - `npm run start:dev`
- You can now make these requests:
    - `POST localhost:8000/new-kid?<name>`
    - `GET localhost:8000/kid-details?<id>`
