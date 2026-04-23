/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  RotateCcw, 
  Share2, 
  ArrowRight, 
  Target, 
  Zap, 
  Users, 
  BookOpen,
  LayoutDashboard,
  Search,
  Users2,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';
import { QUESTIONS, ARCHETYPES } from './data/content';
import { Question, Archetype } from './types';

type Screen = 'landing' | 'quiz' | 'calculating' | 'result';

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B'>>({});

  const handleStart = () => {
    setScreen('quiz');
    setCurrentIdx(0);
    setAnswers({});
  };

  const handleAnswer = (val: 'A' | 'B') => {
    setAnswers(prev => ({ ...prev, [QUESTIONS[currentIdx].id]: val }));
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setScreen('calculating');
      setTimeout(() => setScreen('result'), 2000);
    }
  };

  const scores = useMemo(() => {
    const s: Record<string, number> = { rhythm: 0, info: 0, collab: 0, knowledge: 0 };
    Object.entries(answers).forEach(([qId, val]) => {
      const q = QUESTIONS.find(qq => qq.id === Number(qId));
      if (q && val === 'A') {
        s[q.dimension] += 1;
      }
    });
    return s;
  }, [answers]);

  const resultType = useMemo(() => {
    const traits = {
      rhythm: scores.rhythm >= 2 ? 'S' : 'I',
      info: scores.info >= 2 ? 'A' : 'F',
      collab: scores.collab >= 2 ? 'L' : 'C',
      knowledge: scores.knowledge >= 2 ? 'D' : 'B',
    };
    return traits;
  }, [scores]);

  const archetype = useMemo((): Archetype => {
    const { rhythm, info, collab, knowledge } = resultType;
    const s_rhythm = scores.rhythm;
    const s_info = scores.info;
    const s_collab = scores.collab;
    const s_knowledge = scores.knowledge;

    // Mapping Rules:
    // 1. S+A 同时满足 → 指挥官
    if (s_rhythm >= 2 && s_info >= 2) return ARCHETYPES.ARCHITECT;
    // 2. A+D 同时满足 → 学者
    if (s_info >= 2 && s_knowledge >= 2) return ARCHETYPES.MINER;
    // 3. C+F 同时满足 → 连接者
    if (s_collab <= 1 && s_info <= 1) return ARCHETYPES.NET_WEAVER;
    // 4. I+B 同时满足 → 探险家
    if (s_rhythm <= 1 && s_knowledge <= 1) return ARCHETYPES.SURFER;

    // Fallback based on highest score dimension
    const maxVal = Math.max(s_rhythm, s_info, s_collab, s_knowledge);
    if (s_rhythm === maxVal && s_rhythm >= 2) return ARCHETYPES.ARCHITECT;
    if (s_info === maxVal && s_info >= 2) return ARCHETYPES.MINER;
    if (s_knowledge === maxVal && s_knowledge >= 2) return ARCHETYPES.MINER;
    if (s_collab === maxVal && s_collab >= 2) return ARCHETYPES.ARCHITECT;
    
    return ARCHETYPES.SURFER;
  }, [scores, resultType]);

  const typeCode = `${resultType.rhythm}${resultType.info}${resultType.collab}${resultType.knowledge}`;

  const radarData = [
    { subject: '节奏', A: scores.rhythm, fullMark: 3 },
    { subject: '信息', A: scores.info, fullMark: 3 },
    { subject: '协作', A: scores.collab, fullMark: 3 },
    { subject: '知识', A: scores.knowledge, fullMark: 3 },
  ];

  return (
    <div className="min-h-screen bg-editorial-bg text-editorial-text font-sans selection:bg-editorial-accent/30 selection:text-editorial-text">
      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col min-h-screen p-8 md:p-16 max-w-5xl mx-auto justify-center"
            id="landing-screen"
          >
            <div className="border-b border-editorial-text pb-12 mb-12">
              <p className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-60 mb-4">User Archetype Profile // 2024.05</p>
              <h1 className="text-6xl md:text-8xl font-serif italic leading-none mb-8">
                办公原型 <br className="hidden md:block" /> 深度测验
              </h1>
              <p className="max-w-xl text-lg text-editorial-text/70 leading-relaxed font-serif italic mb-10">
                秩序还是灵感？独立还是协作？<br/>
                我们将从四个核心维度解构您的职业基因，挖掘潜藏的效能潜能。
              </p>
              <div className="flex items-center gap-8">
                <button
                  onClick={handleStart}
                  className="px-10 py-4 bg-editorial-text text-white text-sm font-bold uppercase tracking-widest hover:bg-editorial-accent transition-all active:scale-95"
                  id="start-quiz-btn"
                >
                  开始测验 Begin Analysis
                </button>
                <div className="hidden md:block">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Duration</p>
                  <p className="font-serif italic">约 3 分钟</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-end">
              <p className="text-[10px] uppercase font-bold tracking-tighter italic">Insight-OS v2.4 // Analytics Engine</p>
              <div className="flex gap-4">
                 {[1, 2, 3, 4].map(i => <div key={i} className="w-2 h-2 rounded-full bg-editorial-text/20" />)}
              </div>
            </div>
          </motion.div>
        )}

        {screen === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto min-h-screen p-8 md:p-16 flex flex-col"
            id="quiz-screen"
          >
            <header className="flex justify-between items-start border-b border-editorial-text pb-6 mb-12">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-60 mb-2 italic">Phase 01: Behavioral Mapping</p>
                <h2 className="text-4xl font-serif italic">问卷调查</h2>
              </div>
              <div className="text-right">
                <div className="text-2xl font-light tabular-nums">{currentIdx + 1} / 12</div>
                <p className="text-[10px] uppercase tracking-widest font-bold">Progress</p>
              </div>
            </header>

            <div className="flex-1 flex flex-col justify-center max-w-2xl">
              <motion.h3 
                key={QUESTIONS[currentIdx].id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-serif italic mb-12 leading-snug"
                id="question-text"
              >
                {QUESTIONS[currentIdx].text}
              </motion.h3>

              <div className="space-y-6" id="options-container">
                {QUESTIONS[currentIdx].options.map((opt, i) => (
                  <motion.button
                    key={`${QUESTIONS[currentIdx].id}-${i}`}
                    onClick={() => handleAnswer(opt.value)}
                    className="w-full text-left p-8 border border-editorial-text hover:bg-white hover:shadow-[10px_10px_0px_#1A1A1A] transition-all group flex justify-between items-center"
                    id={`option-${i}`}
                  >
                    <span className="text-lg font-bold group-hover:text-editorial-accent transition-colors">{opt.text}</span>
                    <ArrowUpRight className="opacity-20 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {screen === 'calculating' && (
          <motion.div
            key="calculating"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen text-center p-8"
            id="calculating-screen"
          >
            <div className="mb-8 font-serif italic text-6xl">Processing...</div>
            <div className="w-64 h-1 bg-editorial-muted relative overflow-hidden">
               <motion.div 
                 initial={{ x: '-100%' }}
                 animate={{ x: '100%' }}
                 transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                 className="absolute inset-0 bg-editorial-text w-full"
               />
            </div>
          </motion.div>
        )}

        {screen === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-6xl mx-auto p-4 md:p-10 flex flex-col"
            id="result-screen"
          >
            {/* Header Area */}
            <header className="flex flex-col md:flex-row justify-between items-start border-b border-editorial-text pb-10 mb-10 px-4 md:px-0">
              <div className="mb-6 md:mb-0">
                <p className="text-[11px] uppercase tracking-[0.2em] font-bold opacity-60 mb-3">User Archetype Profile // Analyzed Result</p>
                <h1 className="text-6xl md:text-8xl font-serif italic leading-none">
                  {archetype.name} <span className="text-2xl not-italic font-sans font-bold ml-4 border-l border-editorial-text pl-4 opacity-70">「{archetype.title}」</span>
                </h1>
              </div>
              <div className="text-right">
                <div className="text-5xl md:text-7xl font-light tabular-nums leading-none tracking-tighter mb-1">{typeCode}</div>
                <p className="text-[11px] uppercase tracking-widest font-bold">Archetype Code</p>
              </div>
            </header>

            <main className="grid grid-cols-12 md:gap-16 gap-8">
              {/* Left Side: Summary & Persona */}
              <div className="col-span-12 lg:col-span-5 flex flex-col gap-10">
                <div className="bg-editorial-text text-white p-10 relative">
                  <div className="absolute -top-4 -right-4 w-14 h-14 bg-editorial-accent flex items-center justify-center font-bold text-2xl shadow-[4px_4px_0px_#fff]">
                    {archetype.emoji}
                  </div>
                  <h2 className="text-3xl font-serif italic mb-6 text-editorial-accent underline decoration-white/20 underline-offset-8 decoration-1">
                    "{archetype.description.split('.')[0]}"
                  </h2>
                  <p className="text-base leading-relaxed opacity-80 mb-10 font-serif">
                    {archetype.description.split('.')[1] || ''} 映射典型特征：{archetype.behavior}。你是团队的关键，独立深耕亦能独当一面。
                  </p>
                  <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Mirroring Persona</p>
                      <p className="text-xl font-serif italic">{archetype.celebrity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Global Weight</p>
                      <p className="text-2xl font-bold">{archetype.percentage}% <span className="text-[10px] opacity-40 font-normal">of profiles</span></p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-editorial-text pt-10">
                   <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold mb-8">Dimensional Mapping // 维度拆解</h3>
                   <div className="space-y-6">
                      {[
                        { label: '稳扎稳打', val: scores.rhythm, other: '灵光乍现' },
                        { label: '条分缕析', val: scores.info, other: '自由生长' },
                        { label: '独当一面', val: scores.collab, other: '八方联动' },
                        { label: '深耕细作', val: scores.knowledge, other: '广泛涉猎' },
                      ].map((dim, idx) => (
                        <div key={idx} className="flex items-center gap-6">
                          <span className="w-20 text-[11px] font-bold">{dim.label}</span>
                          <div className="flex-1 h-3 bg-editorial-muted relative">
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${(dim.val / 3) * 100}%` }}
                               className="absolute h-full bg-editorial-text"
                             />
                          </div>
                          <span className="w-20 text-[11px] opacity-40 text-right">{dim.other}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </div>

              {/* Right Side: Strategies & Radar */}
              <div className="col-span-12 lg:col-span-7 lg:border-l border-editorial-text lg:pl-16 flex flex-col">
                <div className="mb-16">
                  <h3 className="text-[11px] uppercase tracking-[0.2em] font-bold mb-10 flex justify-between border-b border-editorial-text pb-4">
                    <span>Experience Strategy // 专属体验策略</span>
                    <span className="text-editorial-accent">Targeted Growth</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                    {archetype.recommendations.map((rec, idx) => (
                      <div key={idx} className="flex gap-6 group">
                        <div className="text-4xl font-serif italic text-editorial-accent opacity-60 group-hover:opacity-100 transition-opacity">
                          0{idx + 1}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold mb-2 uppercase tracking-tight">{rec.split('：')[0]}</h4>
                          <p className="text-[13px] leading-relaxed opacity-60 font-serif italic">{rec.split('：')[1] || rec}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-6 group md:col-span-2 bg-editorial-text text-white p-8 border-l-[8px] border-editorial-accent shadow-[10px_10px_0px_rgba(26,26,26,0.1)]">
                        <div className="text-4xl font-serif italic text-editorial-accent">04</div>
                        <div>
                          <h4 className="text-sm font-bold mb-2 uppercase tracking-tight">核心转化钩子 // Conversion</h4>
                          <p className="text-[13px] leading-relaxed opacity-80 font-serif italic">{archetype.hooks}</p>
                        </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto">
                   <div className="border border-editorial-text p-8 bg-white shadow-[12px_12px_0px_#1A1A1A] flex flex-col md:flex-row items-center gap-10">
                      <div className="w-28 h-28 bg-editorial-text flex items-center justify-center p-1 flex-shrink-0">
                        <div className="w-full h-full border border-white flex items-center justify-center text-[10px] text-white text-center font-bold">
                           RADAR<br/>ANALYSIS
                        </div>
                      </div>
                      <div className="flex-1 space-y-4">
                        <p className="text-sm font-bold uppercase tracking-widest">获取完整版办公人格报告</p>
                        <p className="text-[11px] opacity-60 italic leading-relaxed">基于 50,000+ 样本建模生成的深度画像报告，解锁您的全方位效能潜力。报告包含：核心优势、协作建议、工具链优化、晋升路径模拟。</p>
                      </div>
                      <div className="flex flex-col gap-3 w-full md:w-auto">
                        <button className="px-10 py-4 bg-editorial-text text-white text-[12px] font-bold uppercase tracking-widest hover:bg-editorial-accent transition-colors flex items-center justify-center gap-2">
                           Save & Share <Share2 size={14}/>
                        </button>
                        <button onClick={handleStart} className="px-10 py-4 border border-editorial-text text-[12px] font-bold uppercase tracking-widest hover:bg-editorial-bg transition-colors flex items-center justify-center gap-2">
                           Retry <RotateCcw size={14}/>
                        </button>
                      </div>
                   </div>
                </div>
              </div>
            </main>

            <footer className="mt-20 h-16 border-t border-editorial-text flex items-center justify-between opacity-50">
               <p className="text-[10px] uppercase font-bold tracking-[0.3em] italic">Product Insights & Analytics Bureau</p>
               <p className="text-[10px] uppercase font-bold tracking-[0.3em] italic text-right">Empowered by Insight-OS v2.4</p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
