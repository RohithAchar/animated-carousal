import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

const HeroText = forwardRef((props, ref) => {
  const h1Refs = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
  }, []);

  // 🔹 Expose both animations to the parent
  useImperativeHandle(ref, () => ({
    textSlideIn,
    textSlideOut,
  }));

  const textSlideIn = () => {
    h1Refs.current.forEach((h1, index) => {
      if (!h1) return;

      gsap.set(h1, { clipPath: "inset(100% 0% 0% 0%)" });

      gsap.to(h1, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1,
        delay: 0.1 * index + 0.3,
        ease: CustomEase.create("custom", "0.33, 1, 0.68, 1"),
      });

      gsap.fromTo(
        h1,
        { translateY: "50%" },
        {
          translateY: "0%",
          duration: 1,
          delay: 0.1 * index + 0.3,
          ease: CustomEase.create("custom", "0.33, 1, 0.68, 1"),
        }
      );
    });
  };

  const textSlideOut = () => {
    // Loop from the end to the start
    h1Refs.current.reverse().forEach((h1, index) => {
      if (!h1) return;

      gsap.to(h1, {
        clipPath: "inset(0% 0% 100% 0%)", // 🔹 Moves the clip up, reversing the effect
        translateY: "50%",
        duration: 1,
        delay: 0.1 * index + 0.3,
        ease: CustomEase.create("custom", "0.33, 1, 0.68, 1"),
      });
    });
  };

  // 🔹 Store multiple h1 refs
  const addToRefs = (el) => {
    if (el && !h1Refs.current.includes(el)) {
      h1Refs.current.push(el);
    }
  };

  return (
    <div className="relative z-10 flex flex-col h-screen w-full font-medium py-16 md:py-24 text-white">
      <h1
        className="flex-1 flex text-9xl md:text-[12rem] items-center pl-24 md:pl-56"
        ref={addToRefs}
      >
        P
      </h1>
      <div className="md:flex justify-between pl-4 md:pl-24">
        <h1 className="flex-1 flex text-9xl md:text-[12rem]" ref={addToRefs}>
          (*Aa→
        </h1>
        <h1
          className="flex-1 flex justify-end text-9xl md:text-[12rem] md:pr-96"
          ref={addToRefs}
        >
          P●
        </h1>
      </div>
      <h1
        className="flex-1 flex items-center justify-center text-9xl md:text-[12rem]"
        ref={addToRefs}
      >
        F
      </h1>
    </div>
  );
});

export default HeroText;
