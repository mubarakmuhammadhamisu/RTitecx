'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TitecxForgeLogo from '@/components/ui/TitecxForgeLogo';
import SidebarMobileToggle from './SidebarMobileToggle';
import SidebarNavList from './SidebarNavList';
import SidebarUserFooter from './SidebarUserFooter';

/**
 * SidebarShell — composes the sidebar from its sub-components and owns
 * the ONE piece of state shared between them: whether the mobile sidebar
 * is open. Everything else (nav list rendering, user footer, mobile
 * toggle UI) is delegated to dedicated single-responsibility files.
 */
export default function SidebarShell() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const closeOnMobile = () => isMobile && setIsOpen(false);

  return (
    <>
      <SidebarMobileToggle
        isOpen={isOpen}
        onToggle={() => setIsOpen((v) => !v)}
        onOverlayClick={() => setIsOpen(false)}
      />

      <motion.aside
        initial={isMobile ? { x: -280 } : false}
        animate={isMobile ? (isOpen ? { x: 0 } : { x: -280 }) : { x: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="fixed left-4 top-4 bottom-4 w-64 z-40 md:relative md:left-auto md:top-auto md:bottom-auto md:w-64
          glass-panel rounded-3xl shadow-[0_0_40px_rgba(99,102,241,0.12)] p-6 overflow-y-auto flex flex-col shrink-0"
      >
        <Link href="/dashboard" className="flex items-center gap-3 mb-8 group" onClick={closeOnMobile}>
          <div className="w-10 h-10 rounded-full bg-gradient-cta flex items-center justify-center font-bold text-white shadow-lg shadow-brand-indigo-500/40 group-hover:shadow-brand-indigo-500/60 transition text-sm">
            <Image src="/im1.png" alt="Titecx logo" width={40} height={40} className="rounded-full w-full h-full object-cover" />
          </div>
          <TitecxForgeLogo className="text-xl" />
        </Link>

        <SidebarNavList onItemClick={closeOnMobile} />
        <SidebarUserFooter />
      </motion.aside>
    </>
  );
}
