// components/FallingFruits.js
import React from 'react';
import Image from 'next/image';

const fruits = [
  '/path-to-your-image/apple.png', 
  '/path-to-your-image/banana.png', 
  '/path-to-your-image/cherry.png',
  // Add more fruit images here
];

export default function FallingFruits() {
  return (
    <div className="falling-fruits">
      {fruits.map((fruit, index) => (
        <Image 
          key={index}
          src={fruit} 
          alt="Fruit"
          width={50}
          height={50}
          className="fruit"
          style={{ 
            animationDelay: `${Math.random() * 5}s`,
            left: `${Math.random() * 100}vw`,
          }}
        />
      ))}
    </div>
  );
}
