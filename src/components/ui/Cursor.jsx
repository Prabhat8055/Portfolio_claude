import { useEffect, useRef, useState } from 'react';
import { useMouse } from '../../hooks';

export default function Cursor() {
  const { x, y } = useMouse();
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const pos = useRef({ x: -100, y: -100 });

  // Smooth ring follow with RAF
  useEffect(() => {
    let raf;
    const ring = ringRef.current;
    if (!ring) return;
    const animate = () => {
      pos.current.x += (x - pos.current.x) * 0.12;
      pos.current.y += (y - pos.current.y) * 0.12;
      ring.style.left = `${pos.current.x}px`;
      ring.style.top = `${pos.current.y}px`;
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [x, y]);

  // Dot follows immediately
  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
  }, [x, y]);

  // Hover detection
  useEffect(() => {
    const add = () => setHovering(true);
    const remove = () => setHovering(false);
    const targets = document.querySelectorAll('a, button, [data-cursor-hover]');
    targets.forEach(el => { el.addEventListener('mouseenter', add); el.addEventListener('mouseleave', remove); });
    return () => targets.forEach(el => { el.removeEventListener('mouseenter', add); el.removeEventListener('mouseleave', remove); });
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring ${hovering ? 'hovering' : ''}`} />
    </>
  );
}
