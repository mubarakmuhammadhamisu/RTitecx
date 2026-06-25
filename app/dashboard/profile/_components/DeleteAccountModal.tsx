'use client';

import { useState } from 'react';
import { AlertTriangle, X, Trash2 } from 'lucide-react';

/**
 * DeleteAccountModal — the "type DELETE to confirm" destructive
 * confirmation modal. Single Responsibility: this one modal only.
 */
const ITEMS_DELETED = [
  'Your account and login credentials',
  'All enrolled courses and progress',
  'All lesson completions',
  'All payment records',
  'Your profile, avatar, and bio',
];

interface DeleteAccountModalProps {
  onClose: () => void;
  onConfirm: () => Promise<{ error?: string }>;
}

export default function DeleteAccountModal({ onClose, onConfirm }: DeleteAccountModalProps) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleDelete() {
    if (input !== 'DELETE') return;
    setLoading(true);
    const result = await onConfirm();
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md bg-surface-900 border border-danger/40 rounded-2xl p-6 space-y-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-danger/20 border border-danger/30 flex items-center justify-center">
              <AlertTriangle size={20} className="text-danger" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-text-primary">Delete Account</h2>
              <p className="text-xs text-danger font-medium">This cannot be undone</p>
            </div>
          </div>
          <button onClick={onClose} className="text-text-faint hover:text-text-secondary p-1">
            <X size={18} />
          </button>
        </div>

        <div className="bg-danger/10 border border-danger/20 rounded-xl p-4 space-y-2 text-sm text-danger">
          <p className="font-semibold mb-1">The following will be permanently deleted:</p>
          {ITEMS_DELETED.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-danger shrink-0" />
              {item}
            </div>
          ))}
        </div>

        <div>
          <label className="text-sm text-text-muted">
            Type <span className="font-bold text-text-primary font-mono">DELETE</span> to confirm
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            placeholder="Type DELETE here"
            className="mt-2 w-full px-4 py-3 rounded-lg bg-surface-800 border border-danger/30 text-text-primary text-sm placeholder-text-faint focus:outline-none focus:border-danger/60 transition font-mono"
          />
        </div>

        {error && (
          <p className="text-sm text-danger bg-danger/10 border border-danger/20 px-3 py-2 rounded-lg">{error}</p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-surface-600 text-text-secondary hover:bg-surface-800 text-sm font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={input !== 'DELETE' || loading}
            className="flex-1 py-3 rounded-xl bg-danger hover:opacity-90 text-white text-sm font-bold transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Trash2 size={15} />
            {loading ? 'Deleting...' : 'Delete Forever'}
          </button>
        </div>
      </div>
    </div>
  );
}
