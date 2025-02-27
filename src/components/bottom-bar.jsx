import gsap from "gsap";
import { useEffect, useRef } from "react";
import { CustomEase } from "gsap/CustomEase";

const BottomBar = () => {
  const textRefs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);

    gsap.fromTo(
      textRefs.current,
      { translateY: "50px", opacity: 0 }, // Start lower & invisible
      {
        translateY: "0px",
        delay: 0.3,
        opacity: 1,
        duration: 1,
        ease: CustomEase.create("custom", "0.33, 1, 0.68, 1"),
        stagger: 0.1, // Animate one after another with a 0.1s delay
      }
    );
  }, []);

  const pushToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  return (
    <div className="flex justify-between items-center w-full h-16 px-8 py-4 text-white">
      <div>
        <p ref={pushToRefs}>Lorem, ipsum→</p>
      </div>
      <div className="flex justify-between items-center gap-4">
        <p ref={pushToRefs}>All fonts</p>
        <p ref={pushToRefs}>Font Starter Pack</p>
      </div>
      <div className="flex justify-between items-center gap-4">
        <p ref={pushToRefs}>Scroll</p>
      </div>
    </div>
  );
};

export default BottomBar;
