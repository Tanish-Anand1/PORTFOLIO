import { useCallback, useRef, useEffect } from 'react';

export const useSoundEffect = () => {
  const audioCtxRef = useRef(null);

  useEffect(() => {
    // Initialize AudioContext on first user interaction to bypass browser autoplay caps
    const initAudio = () => {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
    };
    window.addEventListener('click', initAudio, { once: true });
    window.addEventListener('keydown', initAudio, { once: true });
    return () => {
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
  }, []);

  const playBlip = useCallback(() => {
    if (!audioCtxRef.current) return;
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    const ctx = audioCtxRef.current;
    
    // Cyberpunk tech blip (High frequency FM synth click)
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  }, []);

  const playTerminalType = useCallback(() => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(150 + Math.random() * 50, ctx.currentTime);

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.005);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.02);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  }, []);

  const playWoosh = useCallback(() => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    // Abstract digital woosh using a filtered noise buffer
    const bufferSize = ctx.sampleRate * 0.5; // 0.5 seconds of noise
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(100, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.2);
    filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.5);

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    noiseSource.start();
  }, []);

  return { playBlip, playTerminalType, playWoosh };
};
