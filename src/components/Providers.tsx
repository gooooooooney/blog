'use client'

import { ThemeProvider } from "next-themes";
import { useEffect } from "react";

interface ProvidersProps {
  children: React.ReactNode
}

const Providers: React.FC<ProvidersProps> = ({ children }: ProvidersProps) => {
  useEffect(() => {
    // https://stackoverflow.com/questions/37808180/prevent-pinch-zoom-on-ios-10-safari
    document.documentElement.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    }, false);
    var lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
      var now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};

export default Providers;

