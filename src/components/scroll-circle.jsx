import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const CircularText = ({ text, radius = 100, className = "" }) => {
  const divRef = useRef(null);

  useEffect(() => {
    gsap.to(divRef.current, {
      rotation: 360,
      duration: 10,
      repeat: -1,
      ease: "linear",
    });
  }, []);

  const getLetterPosition = (index, totalLetters) => {
    const angle = (index / totalLetters) * 2 * Math.PI;
    const x = radius * Math.cos(angle - Math.PI / 2);
    const y = radius * Math.sin(angle - Math.PI / 2);
    const rotationAngle = (angle * 180) / Math.PI;
    return { x, y, rotationAngle };
  };

  return (
    <div
      className={`relative ${className}`}
      style={{ width: radius * 2, height: radius * 2 }}
    >
      <div
        ref={divRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        {text.split("").map((char, index) => {
          const { x, y, rotationAngle } = getLetterPosition(index, text.length);
          return (
            <div
              key={index}
              className="absolute inline-block transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: radius + x,
                top: radius + y,
                transform: `translate(-50%, -50%) rotate(${rotationAngle}deg)`,
              }}
            >
              {char}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CircularText;
