import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa6';
import { useRef } from 'react';

const MagneticButton = ({ children, className, onClick, type = "button" }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set(clientX - centerX);
    y.set(clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: useTransform(mouseXSpring, v => v * 0.3), y: useTransform(mouseYSpring, v => v * 0.3) }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative rounded-xl overflow-hidden ${className}`}
    >
      <motion.div 
        style={{ x: useTransform(mouseXSpring, v => v * 0.2), y: useTransform(mouseYSpring, v => v * 0.2) }}
        className="w-full h-full absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity rounded-xl"
      />
      {children}
    </motion.button>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-32 px-4 sm:px-6 relative z-10 bg-dark-bg border-t border-white/5 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-radial from-neon-blue/10 to-transparent flex items-end justify-center pointer-events-none">
        <div className="w-[800px] h-[300px] bg-neon-purple/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-neon-purple font-mono text-sm tracking-widest uppercase mb-4 block">
            What's Next?
          </span>
          <h2 className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-black mb-2 sm:mb-6">
            Get In Touch
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-sans max-w-2xl mx-auto leading-relaxed">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          style={{ transformPerspective: 1000 }}
          className="glass p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-white/10 relative overflow-hidden backdrop-blur-xl"
        >
          {/* Decorative glow inside card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/10 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-purple/10 rounded-full blur-[80px]"></div>
          
          <form className="relative z-10 flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 relative group">
                <label htmlFor="name" className="text-sm font-mono text-gray-400 uppercase tracking-wider group-focus-within:text-neon-cyan transition-colors">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:bg-white/5 transition-all shadow-inner"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-2 relative group">
                <label htmlFor="email" className="text-sm font-mono text-gray-400 uppercase tracking-wider group-focus-within:text-neon-cyan transition-colors">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:bg-white/5 transition-all shadow-inner"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 relative group">
              <label htmlFor="message" className="text-sm font-mono text-gray-400 uppercase tracking-wider group-focus-within:text-neon-cyan transition-colors">Message</label>
              <textarea 
                id="message" 
                rows="5"
                className="bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:bg-white/5 transition-all resize-none shadow-inner"
                placeholder="Hello Tanish, I'd like to talk about..."
              ></textarea>
            </div>
            
            <MagneticButton className="mt-4 self-end bg-white text-dark-bg font-bold px-8 py-4 w-full md:w-auto flex items-center justify-center gap-2 group/btn hover:bg-neon-cyan transition-colors">
              <span className="relative z-10">Send Message</span>
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform relative z-10" />
            </MagneticButton>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="text-gray-500 font-mono text-sm">
            © {new Date().getFullYear()} Tanish Anand. Made with 🤍
          </div>
          
          <div className="flex gap-6">
            <motion.a whileHover={{ y: -5, scale: 1.2 }} href="https://github.com/Tanish-Anand1" className="text-gray-400 hover:text-neon-cyan transition-colors">
              <FaGithub className="w-6 h-6" />
            </motion.a>
            <motion.a whileHover={{ y: -5, scale: 1.2 }} href="https://www.linkedin.com/in/tanish-anand24/" className="text-gray-400 hover:text-neon-blue transition-colors">
              <FaLinkedin className="w-6 h-6" />
            </motion.a>

            <motion.a whileHover={{ y: -5, scale: 1.2 }} href="mailto:atanish920@gmail.com" className="text-gray-400 hover:text-neon-purple transition-colors">
              <Mail className="w-6 h-6" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
