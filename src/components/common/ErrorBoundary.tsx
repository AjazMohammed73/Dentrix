import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, LogOut } from 'lucide-react';
import { api } from '../../lib/api';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Dentrix Uncaught Application Error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleSignOutReload = () => {
    if (
      window.confirm(
        'Sign out and reload the app? Your clinic data is stored on the server and is not affected.',
      )
    ) {
      api('/auth/logout', { method: 'POST' })
        .catch(() => undefined)
        .finally(() => window.location.reload());
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 select-none">
          <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-3xl p-8 shadow-2xl space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle size={32} />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl font-black tracking-tight text-white">
                Application Rendering Interrupted
              </h1>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dentrix encountered an unexpected state error while rendering this view. Your clinical data has not been corrupted.
              </p>
            </div>

            {this.state.error && (
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-left font-mono text-[11px] text-rose-300 overflow-x-auto max-h-32">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col gap-2.5 pt-2">
              <button
                onClick={this.handleReload}
                className="w-full flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-500 text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-md"
              >
                <RefreshCw size={15} />
                <span>Reload Workspace</span>
              </button>

              <button
                onClick={this.handleSignOutReload}
                className="w-full flex items-center justify-center space-x-2 bg-slate-700/60 hover:bg-slate-700 text-slate-300 py-2.5 rounded-xl text-xs font-semibold transition-all border border-slate-600/50"
              >
                <LogOut size={14} className="text-rose-400" />
                <span>Sign Out & Reload</span>
              </button>
            </div>

            <div className="pt-2 text-[10px] text-slate-500">
              Dentrix Practice OS • Axiotronicx.Inc Medical Systems
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}