import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredTag, setHoveredTag] = useState('');

  // Use framer motion values for smoother physics translation
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // High stiffness for the exact coordinate tracker
  const springX = useSpring(cursorX, { stiffness: 1000, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 1000, damping: 40 });

  // Slower trailing box for the AI vision effect
  const trailingX = useSpring(cursorX, { stiffness: 150, damping: 25, mass: 0.5 });
  const trailingY = useSpring(cursorY, { stiffness: 150, damping: 25, mass: 0.5 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const clickableElement = target.closest('a') || target.closest('button') || ['A', 'BUTTON', 'INPUT', 'TEXTAREA'].includes(target.tagName);
      
      if (clickableElement) {
        setIsHovering(true);
        // Attempt to extract what the user is targeting for the HUD
        let tagName = target.tagName.toLowerCase();
        if (target.closest('a')) tagName = 'link';
        if (target.closest('button')) tagName = 'action';
        setHoveredTag(tagName.toUpperCase());
      } else {
        setIsHovering(false);
        setHoveredTag('');
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body, a, button, [role="button"] { cursor: none !important; }
        }
      `}</style>
      
      {/* 1. Exact Crosshair Tracker (The Core) */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-[9999] mix-blend-difference hidden md:flex items-center justify-center translate-x-[-50%] translate-y-[-50%]"
        style={{ x: springX, y: springY }}
      >
        <div className="w-[1px] h-full bg-white absolute"></div>
        <div className="w-full h-[1px] bg-white absolute"></div>
        {/* Central dot */}
        <div className="w-1 h-1 bg-neon-cyan rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
      </motion.div>

      {/* 2. AI Vision Bounding Box (The Trailing effect) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:flex items-center justify-center translate-x-[-50%] translate-y-[-50%]"
        style={{ x: trailingX, y: trailingY }}
        animate={{
          width: isHovering ? 60 : 30,
          height: isHovering ? 60 : 30,
          rotate: isHovering ? 90 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Frame corners like a camera viewfinder */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-neon-purple transition-all duration-300"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-neon-purple transition-all duration-300"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-neon-purple transition-all duration-300"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-neon-purple transition-all duration-300"></div>
        
        {/* Hover interaction background fill */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 0.15 : 0, scale: isHovering ? 1 : 0 }}
          className="w-full h-full bg-neon-cyan rounded-sm"
        />
      </motion.div>

      {/* 3. Developer HUD Log Data (Floating Text) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex flex-col ml-6 mt-4 mix-blend-difference"
        style={{ x: trailingX, y: trailingY }}
      >
        <div className="flex flex-col font-mono text-[9px] tracking-widest leading-tight text-neon-cyan/80">
           <span className="text-neon-purple/80">DEV_HUD v2.0</span>
           <span>X: {Math.round(mousePosition.x)}</span>
           <span>Y: {Math.round(mousePosition.y)}</span>
           {isHovering && (
             <motion.span 
              initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
              className="mt-1 text-white bg-white/10 px-1 ml-[-2px] border border-white/20 w-max"
             >
               TARGET: [{hoveredTag}]
             </motion.span>
           )}
        </div>
      </motion.div>
    </>
  );
}
