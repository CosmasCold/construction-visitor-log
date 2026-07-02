"use client";

import { useEffect, useRef, useState } from "react";

export default function FadeInSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} transition-all duration-500 ease-out ${className}`}
      style={{ transitionDelay: `${delay}ms`, willChange: "transform, opacity" }}
    >
      {children}
    </div>
  );
}