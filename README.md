# Animation Project

This project is a React application using Vite for bundling and Tailwind CSS for styling. It includes custom animations using GSAP.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/animation.git
   cd animation
   ```

2. Install dependencies:

   ```sh
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

## Project Structure

- `src/`: Contains the source code of the application.
  - `components/`: Contains React components.
  - `index.css`: Global CSS file.
  - `App.jsx`: Main application component.
  - `main.jsx`: Entry point of the application.
- `public/`: Contains public assets like fonts and images.
- `vite.config.js`: Vite configuration file.

## Custom Fonts

Ensure that the custom fonts are placed in the `public/fonts` directory and the paths are correctly set in the CSS file.

## Animations

Animations are implemented using GSAP. Check the `CarouselOne` component for examples of how to use GSAP with React.

## License

This project is licensed under the MIT License.
