# README

## Table of Contents

- [Local Development - Prerequisites](#local-development---prerequisites)

  - [Node.js](#nodejs)
  - [PostgreSQL](#postgresql)
  - [Vite](#vite)

- [Local Development Setup](#local-development-setup)

  - [Google Cloud Platform (GCP)](#google-cloud-platform-gcp)
  - [JWT Secret](#jwt-secret)
  - [PostgreSQL Setup](#postgresql-setup)
  - [Resend (Contact Form)](#resend-contact-form)
  - [Running Locally](#running-locally)

- [Hosting the Website](#hosting-the-website)

  - [GitHub](#github)
  - [Render (Backend Database)](#render-backend-database)
  - [Render (Backend Server)](#render-backend-server)
  - [AWS S3 (Cloud Storage)](#aws-s3-cloud-storage)
  - [Vercel (Frontend)](#vercel-frontend)
  - [Final Deployment Steps](#final-deployment-steps)

## Local Development - Prerequisites

### Node.js

- Go to [https://nodejs.org/](https://nodejs.org/)
- Download the “LTS” (Long-Term Support) version for your operating system
- Run the installer and accept the default settings
- After installation, open a terminal and run the following to confirm installation:

  ```bash
  node -v
  npm -v
  ```

### PostgreSQL

- Go to [https://www.postgresql.org/download/](https://www.postgresql.org/download/)

- Choose your operating system and download the latest installer

- Run the installer and follow the prompts:

  - Set a password for the postgres user (save this)
  - Leave the default port as 5432
  - Complete the installation

- Add PostgreSQL to the system path:

  - **Windows:**

    - Open the Start Menu and search for "Environment Variables"
    - Click "Edit the system environment variables"
    - In the System Properties window, click "Environment Variables"
    - Under "System variables," select the Path variable and click "Edit"
    - Click "New" and add the PostgreSQL bin folder path (e.g., `C:\Program Files\PostgreSQL\15\bin`)
    - Click OK to close all windows
    - Open a new Command Prompt and run:

      ```bash
      psql --version
      ```

  - **macOS:**

    - If using Homebrew, PostgreSQL is usually added to PATH automatically
    - Otherwise, open Terminal and add the following to your shell config file (e.g., `~/.zshrc` or `~/.bash_profile`):

      ```bash
      export PATH="/Library/PostgreSQL/17/bin:$PATH"
      ```

    - Replace `17` with your installed version number
    - Save the file and run:

      ```bash
      source ~/.zshrc  # or the correct config file
      psql --version
      ```

  - **Linux:**

    - If PostgreSQL was installed via a package manager, it's likely already on PATH
    - Run:

      ```bash
      psql --version
      ```

### Vite

- If you're working with an existing Vite project, no need to install it globally

## Local Development Setup

Note that the following instructions assume the following ports are free on your computer:

- 5173 for the frontend
- 9000 for the backend
- 5432 for PostgreSQL

To get started with local development, begin by extracting the provided ZIP file. This will take several minutes to extract. Once installed, complete the following steps.

- Open the client directory in a terminal.

  - Run `npm install` to install frontend dependencies

- Open the server folder in a terminal.

  - Run `npm install` to install backend dependencies

Before being able to start the website, a `.env` file, located in the server directory, must be created to store all environment variables for the project. We will have two `.env` files for ease of developing the website:

- `.env.development` - for local development
- `.env.production` - for the production version of the website

In this part of the instructions, we will focus on populating the `.env.development` file. Please create this file in the same location as the `.env.development.example` file, or rename the file as such.

### Google Cloud Platform (GCP)

- Go to [https://cloud.google.com](https://cloud.google.com) and click "Get started for free"
- Sign in with your Google account and set up billing
- Open Google Cloud Console and create a new project
- Enable APIs
- In "APIs & Services" > "Credentials" > click "+ Create Credentials" > OAuth client ID
- Configure the OAuth consent screen

  - Fill in required information
  - Choose "External" as the user type
  - Agree to terms and conditions

- Create an OAuth client with:

  - Application type: Web Application
  - Authorized redirect URI: `http://localhost:9000/auth/google/callback`
  - Save the client ID and secret

- Add test users under "OAuth consent screen" > "Test users"
- Add the following to your `.env.development` file:

  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`

### JWT Secret

- Generate a JWT secret using:

  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
  ```

- Add it to your `.env.development` file as `JWT_SECRET`

### PostgreSQL Setup

- Open pgAdmin and connect to your local server
- Create a new user under "Login/Group Roles" with login privileges
- Create a new database and assign the user as owner
- Use the Query Tool to run `schema.sql` from `server/schema.sql`
- Ensure tables are created under "Schemas > public > Tables"
- Grant privileges if needed
- Construct the `DATABASE_URL` as:

  ```
  DATABASE_URL=postgresql://username:password@localhost:5432/dbname
  ```

### Resend (Contact Form)

- Sign up at [https://resend.com](https://resend.com)
- Go to "API Keys" and generate a key
- Optionally set up a domain under "Domains"
- For development, use `onboarding@resend.dev`
- Add the following to your `.env.development` file:

  - `RESEND_API_KEY`
  - `EMAIL_FROM`
  - `EMAIL_TO`

### Running Locally

- Open the client directory in a terminal and run:

  ```bash
  npm run dev
  ```

  - Open the website at the link provided

- Open the server directory in a terminal and run:

  ```bash
  node server.js
  ```

## Hosting the Website

### GitHub

- Create a GitHub account at [https://github.com](https://github.com)

  - Click "Sign up" in the top-right corner
  - Choose a username, enter your email, and create a password
  - Follow the steps to verify your email address and complete account setup

- Create a new private repository

  - Click the "+" icon in the top-right corner and choose "New repository"
  - Name the repository (e.g., `rs-financial-services-code`)
  - Optionally add a description
  - Select "Private"
  - Leave other settings unchecked
  - Click "Create repository"

- Install GitHub Desktop from [https://desktop.github.com](https://desktop.github.com)

  - Download the installer for your OS and follow setup instructions
  - Sign in to your GitHub account

- Upload files with GitHub Desktop

  - Click "File" > "Clone Repository"
  - Select your new repository and clone it to a local folder
  - Paste all your project files (e.g., `client`, `server`, `.env.example`, etc.) into this folder
  - Return to GitHub Desktop
  - Enter a commit message like "Initial project upload"
  - Click "Commit to main"
  - Click "Push origin" or "Publish branch" to upload the files

### Render (Backend Database)

- Sign up or create an account at [https://dashboard.render.com/login](https://dashboard.render.com/login)

  - It is recommended to sign up with the GitHub account you recently created.

- Click the "New +" button in the top left, then choose "Postgres"

  - Enter a name for your database (e.g., `rs-financial-services-db`)
  - Choose a region close to you (e.g., Oregon, Ohio, Frankfurt)
  - Select the "Free" plan for development or testing
  - Click "Create Database"
  - Wait for the database to be created.

- Once created, click the database on the dashboard.
- Copy the External Database URL. Save this as the `DATABASE_URL` environment variable.

  - Example format: `postgres://username:password@host:5432/databasename`

#### Connect to pgAdmin

- Open pgAdmin on your computer
- In the left sidebar, right-click on "Servers" and choose "Create" > "Server"
- In the "General" tab:

  - Name the connection (e.g., `Render DB`)

- In the "Connection" tab:

  - Host: from the Render connection string (just the host part)
  - Port: usually 5432 (verify)
  - Maintenance database: database name from the string
  - Username and Password: from the string (check "Save password")

- Click "Save"
- In pgAdmin, open your database > Query Tool
- Load and run `schema.sql`
- Confirm tables under: Databases > your database > Schemas > public > Tables

### Render (Backend Server)

- Go to [https://dashboard.render.com](https://dashboard.render.com) and log in
- Click "New +" and select "Web Service"
- Connect your GitHub repo
- Choose the correct repository
- Set the following:

  - Branch: `main`
  - Root Directory: `server`
  - Build Command: `npm install`
  - Start Command: `node server.js`

- Add environment variables:

  - `DATABASE_URL`
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `AWS_REGION`
  - `AWS_BUCKET_NAME`
  - `GOOGLE_CLIENT_ID`
  - `GOOGLE_CLIENT_SECRET`
  - `GOOGLE_CALLBACK_URL`
  - `JWT_SECRET`
  - `ALLOWED_GOOGLE_EMAILS`
  - `FRONTEND_URL`
  - `EMAIL_FROM`
  - `EMAIL_TO`
  - `RESEND_API_KEY`

- Also set:

  - `NODE_ENV=production`
  - `DATABASE_SSL=true`
  - `USE_S3=true`

- Click "Create Web Service"
- After deployment, save the public backend URL for `VITE_API_BASE`

### AWS S3 (Cloud Storage)

- Go to [https://aws.amazon.com](https://aws.amazon.com)
- Click "Create an AWS Account"
- Follow steps to register

#### Create a bucket

- Go to AWS Console > Search for S3 > Open S3 service
- Click "Create bucket"

  - Choose a unique name (e.g., `myapp-media-files`)
  - Choose a region (same as your server region)
  - Uncheck "Block all public access" if needed

- Go to Permissions > Bucket Policy > Edit > Policy Generator

  - Allow `s3:GetObject` to `arn:aws:s3:::your_bucket_name/*`

#### Create IAM User

- Go to IAM service > Users > Add User

  - Username: `myapp-uploader`
  - Enable Programmatic Access

- Attach `AmazonS3FullAccess` policy
- Create the user and save:

  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`

### Vercel (Frontend)

- Go to [https://vercel.com](https://vercel.com)
- Click "Add New" > "Project"
- Import your GitHub repository
- Use "Vite" as framework
- Set Root Directory: `client`
- Set Environment Variables:

  - `VITE_API_BASE` (backend Render URL)

- After deployment, save the frontend URL for `FRONTEND_URL`

### Final Deployment Steps

- In Render > Web Service > Environment > Edit

  - Add `FRONTEND_URL`

- In GCP:

  - Go to your project > APIs & Services > Credentials
  - Select your OAuth client
  - Add new redirect URI:

    - Format: `https://your-backend.onrender.com/auth/google/callback`

Your site should now be fully hosted and accessible at the frontend URL. Custom domains can be added in Vercel and Render. Any code pushed to the `main` branch will automatically update both frontend and backend deployments.
