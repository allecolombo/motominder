#!/bin/bash

# 🏍️ MOTOMINDER - AUTOMATED SETUP SCRIPT
# This script automates the entire project setup
# Run with: bash setup.sh

set -e  # Exit on error

echo "🏍️  MotoMinder - Automated Setup"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Check if git is installed
if ! command -v git &> /dev/null; then
    print_error "Git is not installed. Please install Git first."
    exit 1
fi

# Check if node is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm first."
    exit 1
fi

print_success "Prerequisites check passed"
echo ""

# Get GitHub username
echo "Enter your GitHub username:"
read GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    print_error "GitHub username cannot be empty"
    exit 1
fi

print_info "GitHub username: $GITHUB_USERNAME"
echo ""

# Check if repo already exists
if [ -d "MotoMinder" ]; then
    print_warning "Directory 'MotoMinder' already exists"
    echo "Do you want to remove it and start fresh? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        rm -rf MotoMinder
        print_info "Removed existing directory"
    else
        print_error "Aborting setup"
        exit 1
    fi
fi

# Create repository on GitHub (requires GitHub CLI)
print_info "Creating GitHub repository..."
if command -v gh &> /dev/null; then
    gh repo create MotoMinder --private --description "L'app definitiva per motociclisti italiani" --clone
    cd MotoMinder
    print_success "Repository created and cloned"
else
    print_warning "GitHub CLI not installed. Creating directory manually."
    mkdir MotoMinder
    cd MotoMinder
    git init
    git branch -M main
    print_info "Please create repository manually on GitHub and add remote:"
    print_info "git remote add origin https://github.com/$GITHUB_USERNAME/MotoMinder.git"
fi

echo ""

# Initialize Expo project
print_info "Initializing Expo project with TypeScript..."
npx create-expo-app@latest . --template blank-typescript
print_success "Expo project initialized"
echo ""

# Create folder structure
print_info "Creating folder structure..."
mkdir -p src/{components,screens,services,navigation,utils,constants,types,store}
mkdir -p src/components/{common,moto,deadlines,maintenance,costs}
mkdir -p src/screens/{auth,home,moto,deadlines,maintenance,costs,settings,motogp}
mkdir -p src/services/{api,firebase,notifications,storage}
mkdir -p assets/{images,fonts,icons}
mkdir -p __tests__/{components,screens,services}
print_success "Folder structure created"
echo ""

# Install dependencies
print_info "Installing dependencies (this may take a few minutes)..."
echo ""

# Navigation
print_info "Installing navigation packages..."
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context

# Firebase
print_info "Installing Firebase packages..."
npm install firebase

# UI & Animations
print_info "Installing UI packages..."
npm install react-native-reanimated react-native-gesture-handler
npm install @expo/vector-icons

# Utilities
print_info "Installing utility packages..."
npm install date-fns axios

# Dev dependencies
print_info "Installing dev dependencies..."
npm install -D @types/react @types/react-native
npm install -D jest @testing-library/react-native @testing-library/jest-native
npm install -D eslint prettier eslint-config-prettier
npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser

print_success "All dependencies installed"
echo ""

# Create .gitignore
print_info "Creating .gitignore..."
cat > .gitignore << 'EOF'
# Node
node_modules/
npm-debug.*
yarn-debug.*
yarn-error.*

# Environment
.env
.env.local
.env.*.local

# Expo
.expo/
.expo-shared/
dist/
web-build/

# Native
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*
ios/
android/

# macOS
.DS_Store

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Logs
*.log

# Temporary
*.tmp
*.temp
EOF
print_success ".gitignore created"
echo ""

# Create .env.example
print_info "Creating .env.example..."
cat > .env.example << 'EOF'
# OpenAPI.it
OPENAPI_KEY=your_openapi_key_here

# Firebase
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abcdef

# Expo
EXPO_PUBLIC_API_URL=https://api.motominder.it
EOF
print_success ".env.example created"
echo ""

# Create basic TypeScript config
print_info "Creating tsconfig.json..."
cat > tsconfig.json << 'EOF'
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
EOF
print_success "tsconfig.json created"
echo ""

# Create ESLint config
print_info "Creating .eslintrc.js..."
cat > .eslintrc.js << 'EOF'
module.exports = {
  extends: [
    'expo',
    'prettier'
  ],
  plugins: ['@typescript-eslint'],
  rules: {
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
EOF
print_success ".eslintrc.js created"
echo ""

# Create Prettier config
print_info "Creating .prettierrc..."
cat > .prettierrc << 'EOF'
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
EOF
print_success ".prettierrc created"
echo ""

# Update package.json scripts
print_info "Updating package.json scripts..."
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.scripts = {
  ...pkg.scripts,
  'lint': 'eslint . --ext .ts,.tsx',
  'lint:fix': 'eslint . --ext .ts,.tsx --fix',
  'format': 'prettier --write \"src/**/*.{ts,tsx}\"',
  'type-check': 'tsc --noEmit',
  'test': 'jest',
  'test:watch': 'jest --watch',
  'test:coverage': 'jest --coverage'
};
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"
print_success "package.json scripts updated"
echo ""

# Create README
print_info "Creating README.md..."
cat > README.md << 'EOF'
# 🏍️ MotoMinder

L'app definitiva per motociclisti italiani.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and fill in your API keys

3. Start the development server:
   ```bash
   npm start
   ```

## Development

- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check
- `npm test` - Run tests

## Documentation

See the complete documentation in:
- `MOTOMINDER_MASTER_SPEC.md` - Complete project specification
- `QUICK_START_GUIDE.md` - Quick start guide for Claude Code
- `GIT_CHEAT_SHEET.md` - Git commands reference

## Tech Stack

- React Native + Expo
- TypeScript
- Firebase (Auth, Firestore, Storage)
- React Navigation
- React Native Reanimated

## License

Proprietary - All rights reserved
EOF
print_success "README.md created"
echo ""

# Initial commit
print_info "Creating initial commit..."
git add .
git commit -m "feat: Initial project setup with Expo + TypeScript

- Setup React Native with Expo
- Add TypeScript configuration
- Install core dependencies (navigation, Firebase, etc.)
- Create folder structure
- Add ESLint and Prettier configuration
- Add useful npm scripts"
print_success "Initial commit created"
echo ""

# Try to push (if remote is set)
if git remote get-url origin &> /dev/null; then
    print_info "Pushing to GitHub..."
    git push -u origin main
    print_success "Pushed to GitHub"
else
    print_warning "No remote 'origin' configured. Please add remote and push manually:"
    print_info "git remote add origin https://github.com/$GITHUB_USERNAME/MotoMinder.git"
    print_info "git push -u origin main"
fi

echo ""
echo "================================"
echo -e "${GREEN}✨ Setup Complete! ✨${NC}"
echo "================================"
echo ""
print_info "Next steps:"
echo "  1. cd MotoMinder"
echo "  2. Copy .env.example to .env and add your API keys"
echo "  3. npm start"
echo ""
print_info "Documentation:"
echo "  - Read MOTOMINDER_MASTER_SPEC.md for complete specifications"
echo "  - Read QUICK_START_GUIDE.md to start with Claude Code"
echo "  - Read GIT_CHEAT_SHEET.md for Git commands reference"
echo ""
print_success "Happy coding! 🚀"
