#!/bin/bash

# Build script for Render deployment

# Set production environment variables
export VITE_API_HABITS_LIST=https://221549b67d8a.ngrok-free.app/api/habits
export VITE_API_HABITS_GET_LIST=https://221549b67d8a.ngrok-free.app/api/habits/get
export VITE_API_AUTH_LOGIN=https://221549b67d8a.ngrok-free.app/api/auth/login
export VITE_API_AUTH_REGISTER=https://221549b67d8a.ngrok-free.app/api/auth/register
export VITE_API_USER_ME=https://221549b67d8a.ngrok-free.app/api/user/me
export VITE_API_PAYMENTS_CREATE_WITH_SIGNUP=https://221549b67d8a.ngrok-free.app/api/payments/create-with-signup
export VITE_API_PAYMENTS_CHECK=https://221549b67d8a.ngrok-free.app/api/payments/check

# Install dependencies
npm install

# Build the application
npm run build 