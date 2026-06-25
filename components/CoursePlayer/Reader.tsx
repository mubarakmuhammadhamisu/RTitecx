'use client';

import React from 'react';
import type { ReadingContent } from '@/lib/courses/courseTypes';
import GlowCard from '@/components/ui/GlowCard';

interface ReaderProps {
  content: ReadingContent;
  title: string;
}

export default function Reader({ content, title }: ReaderProps) {
  const parseMarkdown = (md: string) => {
    return md.split('\n').map((line, idx) => {
      if (line.startsWith('# ')) return <h1 key={idx} className="text-3xl font-bold text-text-primary mt-6 mb-4">{line.replace('# ', '')}</h1>;
      if (line.startsWith('## ')) return <h2 key={idx} className="text-2xl font-bold text-text-primary mt-5 mb-3">{line.replace('## ', '')}</h2>;
      if (line.startsWith('### ')) return <h3 key={idx} className="text-xl font-bold text-text-primary mt-4 mb-2">{line.replace('### ', '')}</h3>;
      if (line.startsWith('```')) return null;
      if (line.includes('**')) {
        const parts = line.split(/\*\*([^*]+)\*\*/g);
        return (
          <p key={idx} className="text-text-secondary leading-relaxed mb-3">
            {parts.map((part, i) =>
              i % 2 === 1 ? <strong key={i} className="font-semibold text-text-primary">{part}</strong> : part
            )}
          </p>
        );
      }
      if (line.trim()) return <p key={idx} className="text-text-secondary leading-relaxed mb-3">{line}</p>;
      return <div key={idx} className="mb-2" />;
    });
  };

  return (
    <GlowCard className="space-y-6">
      <div className="space-y-2 pb-6 border-b border-brand-indigo-500/20">
        <h2 className="text-3xl font-bold text-text-primary">{title}</h2>
        <p className="text-text-muted text-sm">Reading Material</p>
      </div>

      <div className="prose prose-invert max-w-none space-y-4">
        {parseMarkdown(content.markdownBody)}
      </div>

      {content.topics && content.topics.length > 0 && (
        <div className="space-y-3 mt-8 pt-6 border-t border-brand-indigo-500/20">
          <h3 className="text-lg font-semibold text-text-primary">Key Topics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {content.topics.map((topic, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 bg-brand-purple-500/10 border border-brand-purple-500/20 rounded-lg hover:bg-brand-purple-500/20 transition">
                <div className="w-2 h-2 rounded-full bg-brand-purple-400" />
                <span className="text-text-primary text-sm">{topic}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </GlowCard>
  );
}
