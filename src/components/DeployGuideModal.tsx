import React, { useState } from 'react';
import { X, GitBranch, Terminal, CheckCircle2, Copy, ExternalLink, ShieldCheck } from 'lucide-react';

interface DeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeployGuideModal: React.FC<DeployGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const gitSnippet = `git init
git add .
git commit -m "feat: complete heritage society portal with history, committee, events"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main`;

  const copyToClipboard = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
        {/* Header */}
        <div className="p-5 bg-stone-900 text-white rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
                Ready for Production
              </div>
              <h3 className="font-serif-title text-xl font-bold">
                Deploy to GitHub &amp; Vercel in 1 Minute
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg bg-stone-800 hover:bg-stone-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs text-stone-700">
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>
              <strong>Vercel-Ready Architecture:</strong> Pre-configured with standard Vite build script, Tailwind CSS, clean TypeScript typing, and root <code className="bg-emerald-100 px-1 py-0.5 rounded font-mono text-[11px]">vercel.json</code>.
            </span>
          </div>

          {/* Step 1: Push to GitHub */}
          <div>
            <h4 className="font-bold text-stone-900 text-sm mb-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center font-mono">1</span>
              <span>Commit &amp; Push to your GitHub Repository</span>
            </h4>
            <p className="text-stone-500 mb-2">
              Run these commands in your project root terminal:
            </p>
            <div className="relative bg-stone-900 text-stone-200 p-4 rounded-xl font-mono text-[11px] leading-relaxed border border-stone-800">
              <pre className="overflow-x-auto">{gitSnippet}</pre>
              <button
                onClick={() => copyToClipboard(gitSnippet, 1)}
                className="absolute top-2.5 right-2.5 px-2.5 py-1 text-[10px] font-semibold bg-stone-800 hover:bg-stone-700 text-stone-300 rounded flex items-center gap-1 cursor-pointer"
              >
                {copiedIndex === 1 ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedIndex === 1 ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Step 2: Import in Vercel */}
          <div>
            <h4 className="font-bold text-stone-900 text-sm mb-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[10px] flex items-center justify-center font-mono">2</span>
              <span>Import to Vercel (Automatic Zero-Config)</span>
            </h4>
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Go to <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-amber-800 font-semibold underline">vercel.com/new</a> and select your GitHub repository.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Vercel automatically detects the Vite framework and root <code className="font-mono bg-stone-200 px-1 py-0.5 rounded text-[11px]">vercel.json</code>.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Click <strong>Deploy</strong>. In 30 seconds your website will be live on your custom domain or vercel.app!</span>
              </div>
            </div>
          </div>

          {/* Step 3: Verified vercel.json */}
          <div>
            <h4 className="font-bold text-stone-900 text-sm mb-1">
              Included vercel.json
            </h4>
            <div className="bg-stone-900 text-amber-300 p-3 rounded-lg font-mono text-[11px]">
              {`{\n  "buildCommand": "npm run build",\n  "outputDirectory": "dist",\n  "framework": "vite"\n}`}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 rounded-b-2xl border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
