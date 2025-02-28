import { useEffect, useState } from "react";

import BottomBar from "./components/bottom-bar";
import Carousel from "./components/carousal";
import CircularText from "./components/scroll-circle";
import TopBar from "./components/top-bar";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-zinc-800 text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center relative bg-zinc-800 antialiased overflow-hidden">
      <div className="fixed top-0 left-0 w-full z-10 hidden-initial">
        <TopBar />
      </div>
      <Carousel />
      <div className="fixed bottom-0 left-0 w-full z-10 hidden-initial">
        <BottomBar />
      </div>
      <div className="fixed top-[15%] md:top-[25%] right-10 md:right-24 z-10 hidden-initial">
        <CircularText
          text="SCROLL DOWN • SCROLL UP • "
          radius={75}
          className="font-bold text-white"
        />
      </div>
    </main>
  );
};

export default App;
