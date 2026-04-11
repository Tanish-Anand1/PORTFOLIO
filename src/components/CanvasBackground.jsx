import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export default function CanvasBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 30, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 100 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-dark-bg">
      {/* Dynamic Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px] opacity-20 mask-image:linear-gradient(to_bottom,transparent,black,transparent)"></div>
      
      {/* Massive ambient glows that track mouse slowly */}
      <motion.div 
        style={{ x: springX, y: springY }}
        className="absolute top-1/2 left-1/2 -ml-[400px] -mt-[400px] w-[800px] h-[800px] rounded-full bg-neon-purple/10 blur-[150px] mix-blend-screen"
      ></motion.div>

      <motion.div 
        style={{ x: useSpring(mouseX, { stiffness: 50, damping: 40 }), y: useSpring(mouseY, { stiffness: 50, damping: 40 }) }}
        className="absolute top-1/2 left-1/2 -ml-[300px] -mt-[300px] w-[600px] h-[600px] rounded-full bg-neon-cyan/5 blur-[120px] mix-blend-screen"
      ></motion.div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,7,18,0.8)_80%)]"></div>
    </div>
  );
}
