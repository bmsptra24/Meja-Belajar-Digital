# Getting Started

#### 1. Fill all config in template env file with your config

#### 2. Move the template to project directory

- For frontend
  ```bash
  mv .env.fe.template frontend/.env
  ```
- For backend
  ```bash
  mv .env.be.template backend/.env
  ```

#### 3. Install all dependency

- For frontend
  ```bash
  cd frontend
  npm install
  ```
- For frontend
  ```bash
  cd backend
  npm install
  ```

#### 4. Back to main directory and run the project

- For frontend
  ```bash
  cd ../frontend
  npm run dev
  ```
- For backend
  ```bash
  cd ../backend
  npx nodemon app
  ```
