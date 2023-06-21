
Ease at Office is a web app that helps professionals access news, quotes, weather, and a todo list in one place.

## Tech Stack

The app uses these technologies:

- React: A JS library for UIs with JSX.
- HTML and CSS: Markup and styling languages for UIs.
- JavaScript: The programming language for the app's logic and functionality.
- MongoDB: A NoSQL database for user-specific todo lists.

## APIs Used

The app integrates these APIs for its features:

1. Quotable API: Fetches random motivational quotes for the homepage.
2. SpeechSynthesis API: Converts the quotes into speech for users to listen to.
3. OpenWeatherMap API: Retrieves weather forecast based on user's location for the homepage.
4. Bing Search API: Searches for news articles based on user queries and displays them in a list.

## Todo List Functionality

The Todo List feature lets users create, read, update, and delete their own tasks, which are saved in the MongoDB database. Users can:

- Create: Add new tasks by entering details and clicking "Add".
- Read: See their existing tasks fetched and displayed by the app.
- Update: Edit task details by clicking on the task and changing the content inline.
- Delete: Remove tasks by clicking the delete button for each task.

The user's todo list is securely stored in the MongoDB database and persists across sessions.

## Getting Started

To set up the app, follow these steps:

1. Clone the repo to your local machine:
```git clone https://github.com/AnushkaKundu/Ease-at-Office-App.git```
2. Navigate to the project directory:
```cd ease-at-office-app```
3. Install the required dependencies using npm:
```npm install```
4. The app will be accessible at [http://localhost:3000](http://localhost:3000) in your web browser.
5. Start the MongoDB server:
```mongod``` or ```mongosh```

Make sure your MongoDB server is running and accessible.

6. Set up the necessary MongoDB connection configurations in the application's backend code. Refer to the backend documentation for more details.

7. Use Node.js to run the backend server:
node index.js



