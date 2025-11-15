#!/usr/bin/env python3
"""
Local Development Setup Script
Detects platform (Windows/Termux) and sets up the wave physics application
"""

import os
import sys
import platform
import subprocess
import socket

def get_local_ip():
    """Get the local IP address for network access"""
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
        return local_ip
    except:
        return "127.0.0.1"

def is_termux():
    """Check if running on Termux"""
    return os.path.exists('/data/data/com.termux')

def is_windows():
    """Check if running on Windows"""
    return platform.system() == 'Windows'

def run_command(cmd, shell=False):
    """Run a command and return success status"""
    try:
        print(f"Running: {cmd if isinstance(cmd, str) else ' '.join(cmd)}")
        result = subprocess.run(
            cmd,
            shell=shell,
            check=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        print(result.stdout)
        return True
    except subprocess.CalledProcessError as e:
        print(f"Error: {e.stderr}")
        return False

def check_command_exists(command):
    """Check if a command exists in PATH"""
    try:
        subprocess.run(
            [command, '--version'],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            check=True
        )
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False

def setup_termux():
    """Setup dependencies for Termux"""
    print("\n🤖 Detected Termux environment")
    print("=" * 50)
    
    # Update package list
    print("\n📦 Updating package list...")
    run_command("pkg update -y", shell=True)
    
    # Install Node.js if not present
    if not check_command_exists('node'):
        print("\n📥 Installing Node.js...")
        run_command("pkg install -y nodejs", shell=True)
    else:
        print("\n✓ Node.js already installed")
    
    # Install git if not present (might be needed)
    if not check_command_exists('git'):
        print("\n📥 Installing git...")
        run_command("pkg install -y git", shell=True)
    else:
        print("\n✓ Git already installed")
    
    return True

def setup_windows():
    """Setup dependencies for Windows"""
    print("\n🪟 Detected Windows environment")
    print("=" * 50)
    
    # Check if Node.js is installed
    if not check_command_exists('node'):
        print("\n❌ Node.js is not installed!")
        print("Please install Node.js from: https://nodejs.org/")
        print("After installation, run this script again.")
        return False
    else:
        print("\n✓ Node.js already installed")
        # Show Node.js version
        subprocess.run(['node', '--version'])
    
    # Check if npm is installed
    if not check_command_exists('npm'):
        print("\n❌ npm is not installed!")
        print("npm should come with Node.js. Please reinstall Node.js.")
        return False
    else:
        print("\n✓ npm already installed")
        subprocess.run(['npm', '--version'])
    
    return True

def install_project_dependencies():
    """Install project npm dependencies"""
    print("\n📦 Installing project dependencies...")
    print("This may take a few minutes...")
    
    if not os.path.exists('package.json'):
        print("❌ Error: package.json not found!")
        print("Make sure you're running this script from the project root directory.")
        return False
    
    return run_command(['npm', 'install'])

def start_dev_server():
    """Start the development server"""
    print("\n🚀 Starting development server...")
    print("=" * 50)
    
    local_ip = get_local_ip()
    
    print(f"\n✨ Server will be available at:")
    print(f"   • Local:   http://localhost:5000")
    print(f"   • Network: http://{local_ip}:5000")
    print(f"\n📱 On your phone, open: http://{local_ip}:5000")
    print("\n⚠️  Make sure your phone is on the same WiFi network!")
    print("\n🛑 Press Ctrl+C to stop the server\n")
    print("=" * 50)
    
    # Set environment and run
    env = os.environ.copy()
    env['NODE_ENV'] = 'development'
    env['PORT'] = '5000'
    
    try:
        subprocess.run(['npm', 'run', 'dev'], env=env)
    except KeyboardInterrupt:
        print("\n\n🛑 Server stopped.")
        sys.exit(0)

def main():
    """Main setup function"""
    print("\n" + "=" * 50)
    print("🌊 Wave Physics Application - Local Setup")
    print("=" * 50)
    
    # Detect platform and setup
    if is_termux():
        if not setup_termux():
            sys.exit(1)
    elif is_windows():
        if not setup_windows():
            sys.exit(1)
    else:
        print(f"\n⚠️  Detected platform: {platform.system()}")
        print("This script is optimized for Windows and Termux.")
        print("Attempting to continue anyway...\n")
        if not check_command_exists('node'):
            print("❌ Node.js is required but not found!")
            print("Please install Node.js and try again.")
            sys.exit(1)
    
    # Install project dependencies
    if not install_project_dependencies():
        print("\n❌ Failed to install dependencies!")
        sys.exit(1)
    
    print("\n✅ Setup complete!")
    
    # Start the server
    start_dev_server()

if __name__ == "__main__":
    main()
