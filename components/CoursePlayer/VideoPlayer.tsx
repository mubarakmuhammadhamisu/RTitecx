'use client';

import React, { useCallback } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { VideoContent, VideoProvider } from '@/lib/courses/courseTypes';
import GlowCard from '@/components/ui/GlowCard';
import YoutubePlayer from './players/YoutubePlayer';
import GumletPlayer from './players/GumletPlayer';
import BunnyPlayer from './players/BunnyPlayer';
import GoogleDrivePlayer from './players/GoogleDrivePlayer';

interface VideoPlayerProps {
  content: VideoContent;
  title: string;
  isCompleted: boolean;
  onVideoEnd: () => void;
}

function VideoPlaceholder({ title, isCompleted }: { title: string; isCompleted: boolean }) {
  return (
    <GlowCard className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-text-primary leading-snug">{title}</h2>
        {isCompleted && (
          <span className="flex items-center gap-1.5 text-success text-sm font-medium bg-success/10 border border-success/30 px-3 py-1 rounded-full whitespace-nowrap">
            <CheckCircle2 size={14} /> Completed
          </span>
        )}
      </div>
      <div
        className="relative w-full rounded-xl overflow-hidden border border-brand-indigo-500/20 bg-surface-800 flex items-center justify-center"
        style={{ aspectRatio: '16/9' }}
      >
        <div className="text-center space-y-2 px-6">
          <div className="w-12 h-12 rounded-full bg-brand-indigo-500/10 border border-brand-indigo-500/20 flex items-center justify-center mx-auto">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-brand-indigo-400 fill-current ml-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <p className="text-text-primary font-semibold text-sm">Video coming soon</p>
          <p className="text-text-muted text-xs">This lesson&apos;s video is being prepared.</p>
        </div>
      </div>
    </GlowCard>
  );
}

/**
 * VideoPlayer — routes to the correct sub-player based on content.videoProvider.
 *
 * | videoProvider | Player used         | onVideoEnd trigger         |
 * |---------------|---------------------|----------------------------|
 * | 'youtube'     | YoutubePlayer       | YT IFrame API (state = 0)  |
 * | 'gumlet'      | GumletPlayer        | postMessage "video:ended"  |
 * | 'bunny'       | BunnyPlayer         | postMessage "ended"        |
 * | 'gdrive'      | GoogleDrivePlayer   | Manual "Mark Complete" btn |
 * | (absent)      | YoutubePlayer       | Same as 'youtube'          |
 */
export default function VideoPlayer({ content, title, isCompleted, onVideoEnd }: VideoPlayerProps) {
  if (!content.videoUrl || content.videoUrl.trim() === '') {
    return <VideoPlaceholder title={title} isCompleted={isCompleted} />;
  }

  const provider: VideoProvider = content.videoProvider ?? 'youtube';
  return (
    <VideoPlayerShell
      content={content}
      title={title}
      isCompleted={isCompleted}
      onVideoEnd={onVideoEnd}
      provider={provider}
    />
  );
}

interface ShellProps extends VideoPlayerProps {
  provider: VideoProvider;
}

function VideoPlayerShell({ content, title, isCompleted, onVideoEnd, provider }: ShellProps) {
  const handleEnd = useCallback(() => onVideoEnd(), [onVideoEnd]);

  if (provider === 'gdrive') {
    return (
      <GlowCard className="space-y-4">
        <TitleRow title={title} isCompleted={isCompleted} />
        <GoogleDrivePlayer
          videoUrl={content.videoUrl}
          title={title}
          onEnd={handleEnd}
          isCompleted={isCompleted}
        />
        <MetaRow content={content} isCompleted={isCompleted} hideHint />
        <TopicsGrid topics={content.topics} />
      </GlowCard>
    );
  }

  return (
    <GlowCard className="space-y-4">
      <TitleRow title={title} isCompleted={isCompleted} />
      <div
        className="relative w-full rounded-xl overflow-hidden border border-brand-indigo-500/20 bg-black"
        style={{ aspectRatio: '16/9' }}
      >
        {provider === 'youtube' && (
          <YoutubePlayer videoUrl={content.videoUrl} title={title} onEnd={handleEnd} />
        )}
        {provider === 'gumlet' && (
          <GumletPlayer videoUrl={content.videoUrl} title={title} onEnd={handleEnd} />
        )}
        {provider === 'bunny' && (
          <BunnyPlayer videoUrl={content.videoUrl} title={title} onEnd={handleEnd} />
        )}
      </div>
      <MetaRow content={content} isCompleted={isCompleted} />
      <TopicsGrid topics={content.topics} />
    </GlowCard>
  );
}

function TitleRow({ title, isCompleted }: { title: string; isCompleted: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold text-text-primary leading-snug">{title}</h2>
      {isCompleted && (
        <span className="flex items-center gap-1.5 text-success text-sm font-medium bg-success/10 border border-success/30 px-3 py-1 rounded-full whitespace-nowrap">
          <CheckCircle2 size={14} /> Completed
        </span>
      )}
    </div>
  );
}

function MetaRow({ content, isCompleted, hideHint = false }: { content: VideoContent; isCompleted: boolean; hideHint?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm text-text-muted">
      <span>Duration: {content.duration}</span>
      {!isCompleted && !hideHint && (
        <span className="text-xs text-brand-indigo-400 hidden sm:block">
          Watch to the end to mark complete
        </span>
      )}
    </div>
  );
}

function TopicsGrid({ topics }: { topics?: string[] }) {
  if (!topics || topics.length === 0) return null;
  return (
    <div className="space-y-3 pt-2 border-t border-brand-indigo-500/10">
      <h3 className="text-sm font-semibold text-text-primary">Topics Covered</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {topics.map((topic, idx) => (
          <div key={idx} className="flex items-center gap-3 p-3 bg-brand-indigo-500/10 border border-brand-indigo-500/20 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-brand-indigo-400 shrink-0" />
            <span className="text-text-secondary text-sm">{topic}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
