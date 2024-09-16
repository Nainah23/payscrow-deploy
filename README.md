# Payscrow

## Introduction

Payscrow is a secure escrow service designed to build trust in the online transaction space. With a user-friendly interface and robust security measures, Payscrow ensures that both parties in a transaction can confidently send and receive money without fear of fraud. This project is particularly aimed at freelancers, remote workers, and anyone engaged in online commerce who seeks a reliable way to handle transactions.

- **Final Project Blog Article:** [Read here](https://medium.com/@kamauwainaina29/payscrow-building-trust-in-online-transactions-a7eeecab82da)
- **Author's LinkedIn:** [LinkedIn Profile](https://www.linkedin.com/in/kamau-wainaina-534616189/)

## Installation

To get a local copy up and running, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/Nainah23/Payscrow---NodeJs.git
   ```
2. Navigate to the project directory:
   ```sh
   cd payscrow
   ```
3. Install dependencies for the backend:
   ```sh
   cd backend
   npm install
   ```
4. Install dependencies for the frontend:
   ```sh
   cd ../frontend
   npm install
   ```
5. Set up environment variables:
   - Create a `.env` file in the `backend` directory and add your configurations (e.g., MongoDB URI, Mpesa API credentials).

6. Run the development server:
   ```sh
   npm run dev
   ```

## Usage

1. Start the backend server:
   ```sh
   cd backend
   npm start
   ```
2. Start the frontend server:
   ```sh
   cd frontend
   npm start
   ```
3. Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Licensing

Distributed under the MIT License. See `LICENSE` for more information.

## Technical Details and Story

### Inspiration

As a freelance remote worker, I frequently encountered fraudulent clients who would disappear after receiving services, leaving me without payment. This experience fueled my desire to create Payscrow, a secure escrow service that ensures both parties in a transaction are protected.

### Technical Stack

- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **API Integration:** Mpesa Daraja APIs

### Architecture

The application is structured into a frontend and backend, communicating via RESTful APIs. Below is a high-level overview of the data flow:

![Payscrow Architecture Diagram](https://app.eraser.io/workspace/7Ssc2ihV8roAaLLUNy2h?origin=share)

### Key Features

1. **Interactive Design:** The UI is designed to be intuitive and responsive, providing a seamless experience across devices.
2. **Secure Transactions:** Funds are held in escrow until both parties confirm the transaction, ensuring security and trust.
3. **API Integration:** The integration with Mpesa Daraja APIs facilitates easy and reliable payment processing.
