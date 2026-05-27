import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const About = ({ isRudraMode }) => {
  return (
    <section id="about" className="py-16 sm:py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.08 }}
      >
        <motion.h2 
          variants={fadeUp}
          className={`text-xl sm:text-2xl font-semibold tracking-tight mb-6 transition-colors duration-300 ${
            isRudraMode ? 'text-emerald-400 text-shadow-emerald' : 'text-white'
          }`}
        >
          About
        </motion.h2>

        <motion.div 
          variants={fadeUp} 
          className={`flex flex-col gap-4 text-[15px] leading-[1.7] transition-colors duration-300 ${
            isRudraMode ? 'text-emerald-400/50' : 'text-white/45'
          }`}
        >
          <p>
            I'm <span className={isRudraMode ? "text-emerald-300 font-medium" : "text-white/80 font-medium"}>Tanish Anand</span> — a developer and engineer who obsesses over craft. I build things that work at scale and feel right to use.
          </p>
          <p>
            I work across the full stack — from fine-tuning NLP and discrete diffusion models, to orchestrating real-time map visualizations and building high-performance OSINT frameworks. The problems I find most exciting live at the boundaries between disciplines.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div 
          variants={fadeUp} 
          className={`mt-10 flex flex-col gap-5 border-l pl-5 ml-0.5 transition-colors duration-300 ${
            isRudraMode ? 'border-emerald-500/20' : 'border-dark-border'
          }`}
        >
          <div className="relative">
            <div className={`absolute -left-[22px] top-[7px] w-2 h-2 rounded-full ring-4 transition-all duration-300 ${
              isRudraMode ? 'bg-emerald-400 ring-[#020603]' : 'bg-emerald-400 ring-dark-bg'
            }`} />
            <span className={`text-[11px] font-semibold uppercase tracking-widest transition-colors duration-300 ${
              isRudraMode ? 'text-emerald-400' : 'text-emerald-400/80'
            }`}>Now</span>
            <p className={`text-sm mt-1 leading-relaxed transition-colors duration-300 ${
              isRudraMode ? 'text-emerald-400/60' : 'text-white/50'
            }`}>
              Building CareLink — care coordination for aging parents in India.
              <br />
              Exploring NLP and benchmarking discrete text diffusion pipelines.
            </p>
          </div>
          <div className="relative">
            <div className={`absolute -left-[22px] top-[7px] w-2 h-2 rounded-full ring-4 transition-all duration-300 ${
              isRudraMode ? 'bg-emerald-500/20 ring-[#020603]' : 'bg-white/15 ring-dark-bg'
            }`} />
            <span className={`text-[11px] font-semibold uppercase tracking-widest transition-colors duration-300 ${
              isRudraMode ? 'text-emerald-500/30' : 'text-white/25'
            }`}>Previously</span>
            <p className={`text-sm mt-1 leading-relaxed transition-colors duration-300 ${
              isRudraMode ? 'text-emerald-400/40' : 'text-white/50'
            }`}>
              Project Rudra (Osiris OSINT Grid) · Text Diffusion Benchmarking · EduCore · PhysicsGPT · ComplianceGuard · Anti-Sleep Pilot
            </p>
          </div>
        </motion.div>

        {/* Stack */}
        <motion.div variants={fadeUp} className="mt-10">
          <h3 className={`text-[11px] font-semibold uppercase tracking-widest mb-4 transition-colors duration-300 ${
            isRudraMode ? 'text-emerald-500/30' : 'text-white/20'
          }`}>Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {[
              'React', 'Next.js', 'TypeScript', 'Python', 'PyTorch', 
              'MapLibre GL', 'WebGL', 'NLP', 'LLM Fine-tuning', 
              'Raspberry Pi', 'Computer Vision', 'TailwindCSS'
            ].map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.03, duration: 0.3 }}
                className={`text-xs px-2.5 py-1 rounded-md border transition-all duration-200 cursor-default ${
                  isRudraMode 
                    ? 'border-emerald-500/10 text-emerald-400/35 bg-emerald-500/[0.01] hover:text-emerald-300 hover:border-emerald-500/30' 
                    : 'border-dark-border text-white/35 bg-dark-surface hover:text-white/50 hover:border-dark-border-hover'
                }`}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
