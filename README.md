# enterprise-data
Enterprise Data POC
# Enterprise Customer Management Website

This project is a public website built with ReactJS, TypeScript, and Material UI for managing big enterprise customers. It allows customers to manage their employees' basic information.

## Overview

This application provides a user-friendly interface for managing enterprise customers and their employees. It includes features for viewing, editing, and creating employee records, along with support for localization and theming.

## Features

*   **Responsive UI:** Built with Material UI for a consistent and responsive experience across devices.
*   **Light/Dark Mode:** Supports switching between light and dark themes using MUI's theme system.
*   **Localization:** Implemented using `react-i18next` to support multiple languages (currently Danish and English).
*   **Reusable Components:** Includes reusable components for:
    *   Table with sorting, filtering, and pagination.
    *   Side panel for editing users.
    *   Custom Button with different variants.
    *   Search Bar.
    *   Website Navigation.
*   **Mock API:** Uses JSON Server for API mocking. Data is persisted in `localStorage`.  The mock API is running at: `http://localhost:5000`
*   **Frontend Security:** Implemented basic authentication, XSS protection, CORS handling, error handling, and route protection.
  

## Technologies Used

*   ReactJS (TypeScript)
*   Material UI (MUI)
*   React Router
*   JSON Server
*   i18next
*   ESLint & Prettier

## Setup Instructions


1.  Navigate to the project directory: `cd <project_directory>`
2.  Install dependencies: `npm install` or `yarn install`
3.  Start the JSON Server mock API: `json-server --watch src/api/db.json --port 5000` (in a separate terminal)
4.  Start the development server: `npm start` or `yarn start`
5.  The application will be accessible at `http://localhost:3000`

## Running the Demo

1.  Make sure both the JSON server and the development server are running.
2.  Username is `Test` and Password is `password`, this has been hardcoded for authentication and we dont have API as such.
3.  Open your browser and go to `http://localhost:3000`.
4.  You can then interact with the application.

## Notes

*   **Test cases were not written as part of this assessment**, but all other required features are implemented.
*   The icons used in the application might not be identical to the mockups, but they serve the same purpose.
*   Remember to create the `db.json` file in the `src/api` directory with your mock data.  This file is used by JSON Server.
