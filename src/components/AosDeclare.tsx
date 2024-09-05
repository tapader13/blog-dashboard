'use client';
import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

const AosDeclare = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: 'ease-in-sine',
      once: true,
      offset: 200,
    });
  }, []);
  return <div>{children}</div>;
};

export default AosDeclare;
