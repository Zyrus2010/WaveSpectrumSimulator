# Local Development Setup

This guide helps you run the Wave Physics Application on your local machine or Android device using Termux.

## Quick Start

### For Windows:
1. Install [Node.js](https://nodejs.org/) (if not already installed)
2. Open Command Prompt or PowerShell in the project directory
3. Run: `python local_setup.py`
4. Open your browser to `http://localhost:5000`

### For Android (Termux):
1. Install [Termux](https://f-droid.org/en/packages/com.termux/) from F-Droid
2. Open Termux and navigate to your project directory
3. Run: `python local_setup.py`
4. Open your phone's browser to the network URL shown (e.g., `http://192.168.1.x:5000`)

## What the script does:

### On Termux (Android):
- Updates package list
- Installs Node.js (if not installed)
- Installs Git (if not installed)
- Installs project dependencies
- Starts the development server

### On Windows:
- Checks for Node.js installation
- Checks for npm installation
- Installs project dependencies
- Starts the development server

## Network Access

When the server starts, you'll see two URLs:
- **Local**: `http://localhost:5000` - Use this on the same device
- **Network**: `http://192.168.x.x:5000` - Use this from other devices on the same WiFi

### To access from your phone:
1. Make sure your phone is on the **same WiFi network** as your computer
2. Look for the "Network" URL in the terminal output
3. Open that URL in your phone's browser

## Troubleshooting

### "Node.js is not installed"
- **Windows**: Download and install from [nodejs.org](https://nodejs.org/)
- **Termux**: The script will auto-install it

### "Cannot access from phone"
- Ensure both devices are on the same WiFi network
- Check if your firewall is blocking port 5000
- Use the Network IP address (not localhost)

### Port already in use
- Another application might be using port 5000
- Close any running dev servers
- Or modify the PORT in the script

## Manual Setup (Alternative)

If you prefer manual setup:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The server will run on port 5000 by default.

## Project Structure

- `client/` - React frontend with wave visualizations
- `server/` - Express backend API
- `shared/` - Shared TypeScript types and schemas

## Development

The development server includes:
- Hot module replacement (HMR)
- Automatic restart on file changes
- TypeScript type checking
- Vite-powered frontend build

Enjoy exploring wave physics! 🌊
