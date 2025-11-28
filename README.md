# URL Decomposer

A powerful, interactive tool designed to break down, analyze, and reconstruct URLs. This application allows developers and power users to easily debug link structures, modify query parameters, and generate clean URLs.

## Features

- **Deep Parsing**: Instantly decomposes URLs into their fundamental components:
  - Protocol
  - Auth (Username/Password)
  - Hostname
  - Port
  - Pathname
  - Query Parameters (individually broken down)
  - Hash/Fragment
- **Interactive Control**: Toggle specific components on or off via checkboxes to construct a new URL dynamically.
- **In-Place Editing**: Modify the value of any component (e.g., change a query param value or path segment) directly within the table.
- **Real-Time Reconstruction**: The result preview updates instantly as you toggle or edit parts.
- **Sticky Preview**: The generated URL remains visible while scrolling through long lists of parameters.
- **One-Click Copy**: Easily copy the final reconstructed URL to your clipboard.

## How to Use

1. **Input**: Paste any URL into the search bar and click "Analyze".
2. **Edit**: 
   - Use the **checkboxes** to keep or remove specific parts of the URL.
   - Type into the **Value** input fields to change specific parameters or paths.
3. **Export**: Click the copy icon in the sticky sidebar to get your new URL.

## Tech Stack

- **Frontend**: React 19
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript
