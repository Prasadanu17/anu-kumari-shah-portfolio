# Anu Kumari Shah — Portfolio

Interactive 3D Portfolio built with React, Three.js, Framer Motion, and Tailwind CSS. Contact messaging is powered directly by [Web3Forms](https://web3forms.com).

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, Lucide Icons, Three.js / Canvas
- **Contact Service**: Web3Forms (serverless form handling)

## Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Web3Forms (Contact Form)
1. Get a free access key instantly at [https://web3forms.com](https://web3forms.com).
2. Copy `frontend/.env.example` to `frontend/.env`:
   ```bash
   cp frontend/.env.example frontend/.env
   ```
3. Set your access key in `frontend/.env`:
   ```env
   VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key_here
   ```

*(Note: If no key is configured, the contact form gracefully falls back to opening the visitor's default email client addressed to `anu705545@gmail.com`)*.

### 3. Run Development Server
```bash
npm run dev
# or from root:
# npm run dev
```

### 4. Build for Production
```bash
npm run build
```
Deployment ready for Vercel, Netlify, or GitHub Pages.