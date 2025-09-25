'use client';

import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function HeroParallax() {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const mxSpring = useSpring(mx, { stiffness: 120, damping: 20 });
  const mySpring = useSpring(my, { stiffness: 120, damping: 20 });

  const depth = (d: number) => ({
    x: useTransform(mxSpring, [-1, 1], [d, -d]),
    y: useTransform(mySpring, [-1, 1], [-d, d]),
  });

  const bg = depth(10);
  const cloud = depth(18);
  const hero = depth(30);

  useEffect(() => {
    if (prefersReduced) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      mx.set((x - 0.5) * 2);
      my.set((y - 0.5) * 2);
    };

    el.addEventListener('pointermove', onMove, { passive: true });
    return () => el.removeEventListener('pointermove', onMove);
  }, [prefersReduced, mx, my]);

  return (
    <section
      ref={ref}
      className="relative min-h-[92vh] grid place-items-center overflow-hidden bg-gradient-to-b from-sky-300 to-pink-300"
    >
      {/* Clouds */}
      <motion.div
        style={{ x: cloud.x, y: cloud.y }}
        className="absolute bottom-0 left-0 right-0 h-1/2"
      >
        <Image src="/clouds.jpg" alt="clouds" fill className="object-cover" />
      </motion.div>

      {/* Astronaut */}
      <motion.div style={{ x: hero.x, y: hero.y }}>
        <Image
          src="/hero-subject.png"
          alt="Astronaut"
          width={600}
          height={600}
          priority
        />
      </motion.div>

      {/* Text */}
      <div className="relative z-10 text-center text-white drop-shadow-lg">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl font-bold"
        >
          a sky odyssey
        </motion.h1>
        <p className="mt-4 text-lg">
          Reach for the sky and beyond with a parallax hero.
        </p>
      </div>
    </section>
  );
}
