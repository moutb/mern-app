## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `cd backend && npm start`

Runs the server in the development mode.<br>.
**Note: mongod should be running before start server**

#### `API information`
| Path | Method | Description |
| --- | --- | --- |
| `/csv` | GET | Get the current CSV data |
| `/csv` | POST | Replace the current CSV |
| `/csv` | DELETE | Deletes the current CSV |
| `/csv/row/:id` | GET | Get a row by id |
| `/csv/row` | POST | Creates a new row |
| `/csv/row/:id` | PUT | Updates a row |
| `/csv/row/:id` | DELETE | Deletes a row |
