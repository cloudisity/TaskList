# Todo List Application

## Live Demonstration

Check out the live of the application **[here](https://main.dgww8n6fjmdln.amplifyapp.com/)**.


## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview

The **Todo List Application** is a modern, responsive, and secure task management tool built with React and Material-UI (MUI). It leverages AWS services like Amplify, Cognito, Lambda, API Gateway, and DynamoDB to provide a seamless user experience with robust authentication and data isolation. Users can create, update, and delete their tasks while enjoying a customizable interface with light and dark modes.

## Features

- **User Authentication:** Secure sign-up and sign-in using AWS Cognito via AWS Amplify.
- **Data Isolation:** Each user can only access and manage their own tasks.
- **CRUD Operations:** Create, Read, Update, and Delete tasks effortlessly.
- **Responsive UI:** Built with Material-UI for a consistent and responsive design across devices.
- **Dark Mode Toggle:** Switch between light and dark themes using a sleek toggle switch with sun and moon icons.
- **Real-Time Feedback:** Snackbar notifications provide instant feedback on user actions.
- **Persistent Theme Preference:** User's theme choice is saved and persisted across sessions.
- **Scalable Backend:** AWS Lambda and DynamoDB ensure scalability and reliability.

## Technologies Used

- **Frontend:**
  - [React](https://reactjs.org/)
  - [Material-UI (MUI)](https://mui.com/)
  - [AWS Amplify](https://aws.amazon.com/amplify/)
  - [AWS Cognito](https://aws.amazon.com/cognito/)
  - [Axios](https://axios-http.com/)

- **Backend:**
  - [AWS Lambda](https://aws.amazon.com/lambda/)
  - [API Gateway](https://aws.amazon.com/api-gateway/)
  - [DynamoDB](https://aws.amazon.com/dynamodb/)
  - [AWS IAM](https://aws.amazon.com/iam/)

## Installation

### Prerequisites

- **Node.js & npm:** Ensure you have Node.js and npm installed. You can download them [here](https://nodejs.org/).
- **AWS Account:** An active AWS account to utilize AWS Amplify, Cognito, Lambda, API Gateway, and DynamoDB.
- **AWS CLI:** Installed and configured with your AWS credentials. [Installation Guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/cloudisity/TaskList.git
   cd todo-list-app
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Initialize AWS Amplify:**

   ```bash
   npx amplify init
   ```

   - Follow the prompts to set up your Amplify project.
   - Select your preferred editor, AWS profile, and other configurations as prompted.

4. **Add Authentication with AWS Amplify and Cognito:**

   ```bash
   npx amplify add auth
   ```

   - Choose the **"Default configuration"** or customize as needed.
   - Follow the prompts to configure authentication settings.

5. **Add API (REST) with Lambda and API Gateway:**

   ```bash
   npx amplify add api
   ```

   - Choose **REST** as the API type.
   - Provide a name for the API.
   - Select **Lambda Function** as the Lambda source.
   - Follow the prompts to set up CRUD operations (`create`, `read`, `update`, `delete`) for tasks.

6. **Deploy Backend Resources:**

   ```bash
   npx amplify push
   ```

   - Review the changes and confirm to deploy the backend resources.

7. **Configure Frontend with AWS Amplify:**

   Amplify automatically generates an `aws-exports.js` file containing your backend configurations. Ensure it's correctly imported in your project.

   ```javascript
   // src/index.js or src/App.js
   import React from "react";
   import ReactDOM from "react-dom";
   import App from "./App";
   import Amplify from "aws-amplify";
   import awsExports from "./aws-exports"; // Ensure the path is correct

   Amplify.configure(awsExports);

   ReactDOM.render(<App />, document.getElementById("root"));
   ```

## Configuration

### AWS Amplify Configuration

Ensure that the `aws-exports.js` file is present in the `src` directory and correctly configured. This file is crucial for connecting your frontend to the AWS backend services.

### Environment Variables

If you have any environment-specific configurations, consider using `.env` files. For example, you might want to define the `API_URL`:

```env
REACT_APP_API_URL=https://your-api-endpoint.com/task
```

Ensure you reference it correctly in your code:

```javascript
// src/utils/index.js
export const API_URL = process.env.REACT_APP_API_URL;
```

## Usage

1. **Start the Application:**

   ```bash
   npm start
   ```

   - The application will run at `http://localhost:3000`.

2. **Sign Up:**

   - Upon launching the app, you'll be prompted to sign up if you don't have an account.
   - Provide the necessary details to create your account.

3. **Sign In:**

   - Use your credentials to sign in.
   - Once authenticated, you can start managing your tasks.

4. **Manage Tasks:**

   - **Add Task:** Use the input field to add a new task. Click the **Add** button or press **Enter**.
   - **Edit Task:** Click the **Edit** (pencil) icon to modify a task's name.
   - **Delete Task:** Click the **Delete** (trash) icon to remove a task.
   - **Toggle Completion:** Use the checkbox to mark a task as complete or incomplete.
   - **Dark Mode:** Use the toggle switch in the header to switch between light and dark themes.

## Deployment

### Deploying with AWS Amplify

1. **Connect Your Repository:**

   - Navigate to the [AWS Amplify Console](https://console.aws.amazon.com/amplify/home).
   - Click on **"Get started"** under **"Deploy"**.
   - Connect your GitHub (or other) repository containing the Todo List application.

2. **Configure Build Settings:**

   Amplify automatically detects the build settings. Ensure your `build` command is set to `npm run build` and the `publish` directory is `build/`.

3. **Deploy:**

   - Review the settings and click **"Save and Deploy"**.
   - Amplify will build and deploy your application, providing you with a live URL.

### Alternative Deployment Options

- **Vercel:** [Deploy to Vercel](https://vercel.com/)
- **Netlify:** [Deploy to Netlify](https://www.netlify.com/)
- **GitHub Pages:** Suitable for static sites with some configurations.

## Project Structure

```
todo-list-app/
├── amplify/                  # AWS Amplify backend configurations
├── src/
│   ├── components/
│   │   ├── AddTaskForm.js
│   │   ├── Task.js
│   │   └── UpdateTaskForm.js
│   ├── utils/
│   │   ├── axiosConfig.js
│   │   └── index.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .gitignore
├── package.json
├── README.md
└── aws-exports.js            # Generated by Amplify
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. **Fork the Repository:**

   - Click the **Fork** button at the top-right corner of the repository page.

2. **Clone Your Fork:**

   ```bash
   git clone https://github.com/your-username/todo-list-app.git
   cd todo-list-app
   ```

3. **Create a Feature Branch:**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

4. **Commit Your Changes:**

   ```bash
   git commit -m "Add Your Feature"
   ```

5. **Push to Your Fork:**

   ```bash
   git push origin feature/YourFeatureName
   ```

6. **Create a Pull Request:**

   - Navigate to the original repository and click **"Compare & pull request"**.
   - Provide a detailed description of your changes and submit the pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [AWS Amplify](https://aws.amazon.com/amplify/)
- [AWS Cognito](https://aws.amazon.com/cognito/)
- [Material-UI](https://mui.com/)
- [React](https://reactjs.org/)
- [Axios](https://axios-http.com/)
- [Create React App](https://create-react-app.dev/)

---
