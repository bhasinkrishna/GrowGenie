// pages/_app.tsx
import { AppProps } from "next/app";
import "../styles/globals.css"; // Import global styles (e.g., Tailwind CSS)

// You can also import other global libraries, such as:
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // This can be used to initialize third-party libraries or add global JavaScript functionality
    console.log("App loaded");
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
