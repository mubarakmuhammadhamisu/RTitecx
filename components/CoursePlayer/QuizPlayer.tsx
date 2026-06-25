'use client';

import React, { useState, useCallback } from 'react';
import GlowCard from '@/components/ui/GlowCard';
import { Brain, CheckCircle2, XCircle, ChevronRight, ArrowRight, Trophy, Star, RotateCcw } from 'lucide-react';
import type { QuizContent } from '@/lib/courses/courseTypes';

interface QuizPlayerProps {
  content: QuizContent;
  title: string;
  isCompleted: boolean;
  onQuizComplete: () => void;
}

type Phase = 'intro' | 'question' | 'results';

interface AnswerRecord {
  questionId: string;
  pickedIndex: number;
  correct: boolean;
  pointsEarned: number;
}

const LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function QuizPlayer({ content, title, isCompleted, onQuizComplete }: QuizPlayerProps) {
  const { questions } = content;

  const [phase, setPhase] = useState<Phase>('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pickedIndex, setPickedIndex] = useState<number | null>(null);
  const [records, setRecords] = useState<AnswerRecord[]>([]);
  const [justCompleted, setJustCompleted] = useState(false);

  const totalQuestions = questions.length;
  const maxScore = questions.reduce((s, q) => s + (q.points ?? 0), 0);
  const currentQ = questions[currentIndex];

  const totalEarned = records.reduce((s, r) => s + r.pointsEarned, 0);
  const correctCount = records.filter((r) => r.correct).length;
  const pct = maxScore > 0 ? Math.round((totalEarned / maxScore) * 100) : 0;
  const passed = pct >= 50;

  const handleStart = useCallback(() => {
    setPhase('question');
    setCurrentIndex(0);
    setPickedIndex(null);
    setRecords([]);
    setJustCompleted(false);
  }, []);

  const handlePick = useCallback((idx: number) => {
    if (pickedIndex !== null) return;
    setPickedIndex(idx);
  }, [pickedIndex]);

  const handleNext = useCallback(() => {
    if (pickedIndex === null || !currentQ) return;
    const correct = pickedIndex === currentQ.correctAnswer;
    const pointsEarned = correct ? (currentQ.points ?? 0) : 0;
    const newRecords = [...records, { questionId: currentQ.id, pickedIndex, correct, pointsEarned }];
    setRecords(newRecords);
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((i) => i + 1);
      setPickedIndex(null);
    } else {
      setPhase('results');
      const finalEarned = newRecords.reduce((s, r) => s + r.pointsEarned, 0);
      const finalPct = maxScore > 0 ? Math.round((finalEarned / maxScore) * 100) : 0;
      if (!isCompleted && finalPct >= 50) {
        setJustCompleted(true);
        onQuizComplete();
      }
    }
  }, [pickedIndex, currentQ, records, currentIndex, totalQuestions, isCompleted, maxScore, onQuizComplete]);

  if (!questions || questions.length === 0) {
    return (
      <GlowCard className="space-y-4">
        <div className="flex items-center gap-3">
          <Brain size={22} className="text-brand-pink-400" />
          <h2 className="text-xl font-bold text-text-primary">{title}</h2>
        </div>
        <p className="text-text-muted text-sm">This quiz has no questions yet. Check back later.</p>
      </GlowCard>
    );
  }

  if (phase === 'intro') {
    return (
      <GlowCard className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-pink-500/15 border border-brand-pink-500/30 flex items-center justify-center shrink-0">
              <Brain size={20} className="text-brand-pink-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary leading-snug">{title}</h2>
              <p className="text-text-faint text-xs mt-0.5">Knowledge check</p>
            </div>
          </div>
          {isCompleted && (
            <span className="flex items-center gap-1.5 text-success text-sm font-medium bg-success/10 border border-success/30 px-3 py-1 rounded-full whitespace-nowrap shrink-0">
              <CheckCircle2 size={14} /> Completed
            </span>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Questions', value: totalQuestions, cls: 'bg-brand-indigo-500/10 border-brand-indigo-500/25 text-brand-indigo-400' },
            { label: 'Max Score', value: maxScore, cls: 'bg-brand-purple-500/10 border-brand-purple-500/25 text-brand-purple-400' },
            { label: 'Pass Mark', value: '50%', cls: 'bg-brand-pink-500/10 border-brand-pink-500/25 text-brand-pink-400' },
          ].map(({ label, value, cls }) => (
            <div key={label} className={`rounded-xl border p-3 text-center ${cls}`}>
              <p className="text-2xl font-extrabold">{value}</p>
              <p className="text-xs text-text-faint mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {content.topics && content.topics.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">Topics</p>
            <div className="flex flex-wrap gap-2">
              {content.topics.map((t) => (
                <span key={t} className="text-xs bg-brand-purple-500/15 border border-brand-purple-500/25 text-brand-purple-300 px-2.5 py-1 rounded-full">{t}</span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleStart}
          className="w-full py-3.5 rounded-xl bg-gradient-cta hover:opacity-90 text-white font-bold transition shadow-lg shadow-brand-indigo-500/20 flex items-center justify-center gap-2"
        >
          {isCompleted ? <><RotateCcw size={18} /> Retake Quiz</> : <><Brain size={18} /> Start Quiz</>}
        </button>
      </GlowCard>
    );
  }

  if (phase === 'question') {
    const answered = pickedIndex !== null;
    return (
      <GlowCard className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain size={18} className="text-brand-pink-400" />
            <span className="text-sm font-semibold text-text-primary">{title}</span>
          </div>
          <span className="text-xs text-text-faint bg-surface-800 px-2.5 py-1 rounded-full border border-brand-indigo-500/20">
            {currentIndex + 1} / {totalQuestions}
          </span>
        </div>

        <div className="w-full h-1.5 bg-surface-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-cta rounded-full transition-all" style={{ width: `${((currentIndex) / totalQuestions) * 100}%` }} />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">Question {currentIndex + 1}</p>
          <p className="text-lg font-bold text-text-primary leading-snug">{currentQ?.question}</p>
        </div>

        <div className="space-y-3">
          {currentQ?.options.map((option, idx) => {
            const isPicked = pickedIndex === idx;
            const isCorrect = currentQ.correctAnswer === idx;
            let wrapClass = '', labelClass = '', textClass = '';
            let icon: React.ReactNode = null;

            if (!answered) {
              wrapClass = 'border border-surface-600/80 bg-surface-800/50 hover:border-brand-indigo-500/60 hover:bg-brand-indigo-500/5 cursor-pointer active:scale-[0.99]';
              labelClass = 'bg-surface-700 text-text-muted group-hover:bg-brand-indigo-500/30 group-hover:text-brand-indigo-200';
              textClass = 'text-text-secondary group-hover:text-text-primary';
            } else if (isPicked && isCorrect) {
              wrapClass = 'border border-success/70 bg-success/10 cursor-default';
              labelClass = 'bg-success/30 text-success';
              textClass = 'text-success';
              icon = <CheckCircle2 size={18} className="text-success shrink-0" />;
            } else if (isPicked && !isCorrect) {
              wrapClass = 'border border-danger/70 bg-danger/10 cursor-default';
              labelClass = 'bg-danger/30 text-danger';
              textClass = 'text-danger';
              icon = <XCircle size={18} className="text-danger shrink-0" />;
            } else if (!isPicked && isCorrect && answered) {
              wrapClass = 'border border-success/50 bg-success/5 cursor-default';
              labelClass = 'bg-success/20 text-success';
              textClass = 'text-success';
              icon = <CheckCircle2 size={18} className="text-success shrink-0" />;
            } else {
              wrapClass = 'border border-surface-700 bg-surface-800/30 opacity-40 cursor-default';
              labelClass = 'bg-surface-700/60 text-text-faint';
              textClass = 'text-text-faint';
            }

            return (
              <button key={idx} onClick={() => handlePick(idx)} disabled={answered}
                className={`group w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 text-left ${wrapClass}`}>
                <span className={`w-8 h-8 rounded-lg text-sm font-bold flex items-center justify-center shrink-0 transition-all ${labelClass}`}>
                  {LABELS[idx] ?? idx + 1}
                </span>
                <span className={`flex-1 text-sm font-medium leading-snug transition-colors ${textClass}`}>{option}</span>
                {icon}
              </button>
            );
          })}
        </div>

        <div className={`transition-all duration-300 ${answered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
          <button onClick={handleNext} disabled={!answered}
            className="w-full py-3.5 rounded-xl bg-gradient-cta hover:opacity-90 text-white font-bold transition shadow-lg shadow-brand-indigo-500/20 flex items-center justify-center gap-2">
            {currentIndex + 1 < totalQuestions
              ? <><span>Next Question</span><ChevronRight size={18} /></>
              : <><span>See Results</span><ArrowRight size={18} /></>}
          </button>
        </div>
      </GlowCard>
    );
  }

  if (phase === 'results') {
    return (
      <GlowCard className="space-y-6">
        <div className="text-center space-y-3 py-2">
          <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center shadow-2xl border-2 ${
            passed ? 'bg-linear-to-br from-success/30 to-teal-500/30 border-success/50 shadow-success/25'
                   : 'bg-linear-to-br from-danger/20 to-warning/20 border-danger/40 shadow-danger/20'}`}>
            {passed ? <Trophy size={36} className="text-success" /> : <RotateCcw size={32} className="text-danger" />}
          </div>
          <div>
            <p className={`text-4xl font-black tracking-tight ${passed ? 'text-success' : 'text-danger'}`}>
              {totalEarned}<span className="text-xl text-text-faint font-bold"> / {maxScore}</span>
            </p>
            <p className="text-text-muted text-sm mt-1">{pct}% score</p>
          </div>
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold border ${
            passed ? 'bg-success/15 border-success/40 text-success' : 'bg-danger/15 border-danger/30 text-danger'}`}>
            {passed ? <><Star size={14} /> Passed</> : <><XCircle size={14} /> Not Passed</>}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Correct', value: `${correctCount}/${totalQuestions}`, cls: 'bg-success/10 border-success/25 text-success' },
            { label: 'Score', value: `${totalEarned}pts`, cls: 'bg-brand-indigo-500/10 border-brand-indigo-500/25 text-brand-indigo-400' },
            { label: 'Result', value: `${pct}%`, cls: passed ? 'bg-success/10 border-success/25 text-success' : 'bg-danger/10 border-danger/25 text-danger' },
          ].map(({ label, value, cls }) => (
            <div key={label} className={`rounded-xl border p-3 text-center ${cls}`}>
              <p className="text-lg font-extrabold">{value}</p>
              <p className="text-xs text-text-faint">{label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">Breakdown</p>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {questions.map((q, i) => {
              const rec = records[i];
              if (!rec) return null;
              return (
                <div key={q.id} className={`flex items-center gap-3 p-3 rounded-lg border text-sm ${
                  rec.correct ? 'bg-success/5 border-success/25' : 'bg-danger/5 border-danger/20'}`}>
                  <span className="text-xs text-text-faint font-bold w-4 shrink-0">{i + 1}</span>
                  {rec.correct ? <CheckCircle2 size={15} className="text-success shrink-0" /> : <XCircle size={15} className="text-danger shrink-0" />}
                  <p className={`flex-1 truncate text-xs ${rec.correct ? 'text-text-secondary' : 'text-text-muted'}`}>{q.question}</p>
                  <span className={`text-xs font-bold shrink-0 ${rec.correct ? 'text-success' : 'text-danger/60'}`}>
                    {rec.correct ? `+${rec.pointsEarned}` : '0'} pts
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <button
            onClick={() => { setPhase('intro'); setCurrentIndex(0); setPickedIndex(null); setRecords([]); setJustCompleted(false); }}
            className="flex-1 py-3 rounded-xl border border-brand-indigo-500/30 hover:border-brand-indigo-500/60 text-text-secondary hover:text-text-primary font-semibold text-sm transition flex items-center justify-center gap-2">
            <RotateCcw size={15} /> Retake Quiz
          </button>
          {(justCompleted || isCompleted) ? (
            <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-success/10 border border-success/30 text-success font-semibold text-sm">
              <CheckCircle2 size={15} />{justCompleted ? 'Progress Saved' : 'Already Completed'}
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-danger/10 border border-danger/30 text-danger font-semibold text-sm">
              <XCircle size={15} />Score below 50% — retake to pass
            </div>
          )}
        </div>
      </GlowCard>
    );
  }

  return null;
}
