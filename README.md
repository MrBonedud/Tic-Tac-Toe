# Tic-Tac-Toe.JS

Tic-Tac-Toe.JS is a simple web-based implementation of the classic Tic-Tac-Toe game. This project demonstrates the use of HTML, CSS, and JavaScript to create an interactive game experience.

## Features

- Play Tic-Tac-Toe against another player
- Responsive design for various screen sizes
- Restart game functionality
- Dynamic message display for game status

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Google Fonts (Roboto)

## How to Play

1. Open the `index.html` file in a web browser.
2. Player X starts the game.
3. Click on an empty field to place your mark (X or O).
4. The game alternates between players until there's a winner or a draw.
5. Click the "Restart" button to start a new game at any time.

## Project Structure

- `index.html`: The main HTML file containing the structure of the game board.
- `styles.css`: Contains all the CSS styles for the game's appearance.
- `script.js`: Contains the JavaScript code for the game logic and interactivity.

## Game Logic

The game is built using a modular pattern with three main components:

1. `Player`: A factory function for creating player objects.
2. `gameBoard`: A module for managing the game board state.
3. `displayController`: A module for handling the UI and user interactions.
4. `gameController`: A module for controlling the game flow and logic.

## Customization

You can easily customize the game's appearance by modifying the CSS variables in the `:root` selector within the `styles.css` file.

## Contributing

This project is for educational purposes. Feel free to fork and modify it for your own use or learning.

## License

This project is open source and available under the MIT License.

## Author

- [@Faisal Naem](https://github.com/MrBonedud)

## Acknowledgements

- This project was inspired by various Tic-Tac-Toe implementations and modern JavaScript practices.
- Icons provided by GitHub.
