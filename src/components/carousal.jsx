import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import HeroText from "./hero-text";

const images = ["/montreal-neue-back.png", "/neue-machina-back.png"];

const Carousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const imagesWrapperRef = useRef([]);
  const imagesRef = useRef([]);
  const heroTextRef = useRef(null);
  const isThrottled = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    initialAnimation();

    return () => {
      gsap.killTweensOf(imagesWrapperRef.current);
      gsap.killTweensOf(imagesRef.current);
    };
  }, []);

  useEffect(() => {
    // 🔹 Throttle the next image
    const handleScroll = () => {
      if (isThrottled.current) return;
      isThrottled.current = true;
      nextImage();
      setTimeout(() => {
        isThrottled.current = false;
      }, 2000);
    };

    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchmove", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchmove", handleScroll);
    };
  }, [currentImage]);

  // 🔹 Animations
  const imageSlideIn = () => {
    // Image animation
    gsap.set(imagesWrapperRef.current[currentImage], {
      clipPath: "inset(100% 0% 0% 0%)",
      translateY: "50%",
    });
    gsap.to(imagesWrapperRef.current[currentImage], {
      clipPath: "inset(0% 0% 0% 0%)",
      translateY: "0%",
      duration: 1.5,
      ease: CustomEase.create("custom", "0.16, 1, 0.3, 1"),
    });
  };
  const textSlideIn = () => {
    if (heroTextRef.current) {
      heroTextRef.current.textSlideIn();
    }
  };
  const textSlideOut = () => {
    if (heroTextRef.current) {
      heroTextRef.current.textSlideOut();
    }
  };
  const scaleDown = () => {
    gsap.to(imagesWrapperRef.current[currentImage], {
      clipPath: "inset(10% 10% 10% 10%)",
      duration: 1.5,
      ease: CustomEase.create("custom", "0.16, 1, 0.3, 1"),
    });
    gsap.to(imagesRef.current[currentImage], {
      scale: 1.2,
      duration: 1.5,
      ease: CustomEase.create("custom", "0.16, 1, 0.3, 1"),
    });
  };
  const imageOut = () => {
    gsap.to(imagesRef.current[currentImage], {
      clipPath: "inset(0% 50% 0% 0% round 35px)",
      duration: 1.5,
      delay: 0.4,
      ease: CustomEase.create("custom", "0.33, 1, 0.68, 1"),
    });
    gsap.to(imagesWrapperRef.current[currentImage], {
      translateX: "-100%",
      duration: 1.5,
      delay: 0.4,
      ease: CustomEase.create("custom", "0.33, 1, 0.68, 1"),
    });
  };
  const imageIn = () => {
    const nextIndex = (currentImage + 1) % images.length;

    // Set initial state (Start from outside the screen)
    gsap.set(imagesWrapperRef.current[nextIndex], {
      translateX: "50%", // Start fully outside (right side)
    });

    gsap.set(imagesWrapperRef.current[nextIndex], {
      clipPath: "inset(10% 10% 10% 10%)",
    });

    gsap.set(imagesRef.current[nextIndex], {
      translateX: "100%",
      scale: 0.8,
      clipPath: "inset(0% 0% 0% 100%)",
    });

    // Animate elements into view
    gsap.to(imagesRef.current[nextIndex], {
      translateX: "0%",
      clipPath: "inset(0% 0% 0% 0%)",
      delay: 0.5,
      duration: 1.5,
      ease: CustomEase.create("custom", "0.16, 1, 0.3, 1"),
    });

    gsap.to(imagesWrapperRef.current[nextIndex], {
      translateX: "0%", // Move into the screen smoothly
      delay: 0.5,
      duration: 1.5,
      ease: CustomEase.create("custom", "0.16, 1, 0.3, 1"),
    });
  };

  const scaleUp = () => {
    const nextIndex = (currentImage + 1) % images.length;

    gsap.to(imagesWrapperRef.current[nextIndex], {
      clipPath: "inset(0% 0% 0% 0%)",
      delay: 1.5,
      duration: 1.2, // Faster transition
      ease: "power2.out", // Smoother easing
    });

    gsap.to(imagesRef.current[nextIndex], {
      scale: 1, // Smoothly scale to full size
      delay: 1.5,
      duration: 1.2, // Faster transition
      ease: "power2.out", // Smoother easing
    });
  };

  const initialAnimation = () => {
    gsap.to(".hidden-initial", { opacity: 1, duration: 0.5 });
    imageSlideIn();
    textSlideIn();
  };

  // 🔹 Image navigation
  const nextImage = () => {
    scaleDown();
    imageOut();
    imageIn();
    textSlideOut();
    scaleUp();
    // Add 0.5 seconds delay
    setTimeout(() => {
      textSlideIn();
    }, 1000);

    setCurrentImage((currentImage + 1) % images.length);
  };

  // 🔹 Store multiple image refs
  const pushimagesWrapperRef = (el) => {
    if (el && !imagesWrapperRef.current.includes(el)) {
      imagesWrapperRef.current.push(el);
    }
  };
  const pushimageRef = (el) => {
    if (el && !imagesRef.current.includes(el)) {
      imagesRef.current.push(el);
    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      <HeroText ref={heroTextRef} />

      {images.map((image, index) => (
        <div
          style={{ transform: `translateX(${index}00%)` }}
          className={`absolute inset-0 overflow-hidden hidden-initial`}
          key={index}
          ref={pushimagesWrapperRef}
        >
          <img
            ref={pushimageRef}
            width={100}
            height={100}
            src={image}
            alt="carousel"
            className={`inset-0 w-full h-full object-cover opacity-50 overflow-hidden`}
          />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
