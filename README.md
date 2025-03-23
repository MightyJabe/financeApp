# Finance App

A personal finance management application that helps users track expenses, manage budgets, and gain insights into their financial habits.

## Features

- **Expense Tracking**: Log and categorize daily expenses
- **Budget Management**: Set monthly budgets for different spending categories
- **Financial Reports**: View visual reports of spending patterns
- **Account Management**: Connect and manage multiple financial accounts
- **Secure Authentication**: Protect your financial data with secure login

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for database)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MightyJabe/financeApp.git
   ```

2. Navigate to the project directory:

   ```bash
   cd financeApp
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory with the following variables:

   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/financeApp
   JWT_SECRET=your_jwt_secret
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Register a new account or login with existing credentials
2. Add your financial accounts
3. Start tracking expenses by adding transactions
4. Set up budget categories and monthly limits
5. View reports to analyze your spending habits

## Project Structure

```
financeApp/
├── client/             # Frontend code
├── server/             # Backend API
├── models/             # Database models
├── controllers/        # Request handlers
├── routes/             # API routes
├── middleware/         # Custom middleware
├── utils/              # Utility functions
├── config/             # Configuration files
└── tests/              # Test files
```

## Technologies

- **Frontend**: React.js, Redux, Chart.js
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Testing**: Jest

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Font Awesome](https://fontawesome.com/) for icons
- [Chart.js](https://www.chartjs.org/) for data visualization
- [Express](https://expressjs.com/) for the server framework

## Contact

MightyJabe - [GitHub](https://github.com/MightyJabe)

Project Link: [https://github.com/MightyJabe/financeApp](https://github.com/MightyJabe/financeApp)
