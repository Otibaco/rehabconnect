import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  CheckCheck,
  Filter,
  Search,
  Trash2,
  Calendar,
  MessageSquare,
  CreditCard,
  UserCheck,
  ShieldAlert,
  Settings,
  AlertCircle,
  Clock,
  ArrowRight,
  RefreshCw,
  Inbox
} from 'lucide-react';
import { StatBlock } from '../../components/dashboard/ui/StatBlock';
import {
  StatBlockSkeleton,
  NotificationItemSkeleton
} from '../../components/dashboard/ui/Skeleton';
import { mockNotifications } from '../../lib/dashboardData';
import { NotificationItem } from '../../types/dashboard';

export const NotificationsPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const urgentCount = notifications.filter((n) => n.priority === 'urgent' || n.priority === 'high').length;
  const readCount = notifications.filter((n) => n.read).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleClearRead = () => {
    setNotifications((prev) => prev.filter((n) => !n.read));
  };

  // Filter logic
  const filteredNotifications = notifications.filter((n) => {
    // Tab filter
    if (activeTab === 'unread' && n.read) return false;
    if (activeTab === 'appointment' && n.type !== 'appointment') return false;
    if (activeTab === 'message' && n.type !== 'message') return false;
    if (activeTab === 'payment' && n.type !== 'payment') return false;
    if (activeTab === 'alert' && n.type !== 'alert' && n.type !== 'verification') return false;
    if (activeTab === 'system' && n.type !== 'system') return false;

    // Priority filter
    if (priorityFilter !== 'all' && n.priority !== priorityFilter) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = n.title.toLowerCase().includes(q);
      const matchMsg = n.message.toLowerCase().includes(q);
      const matchType = n.type.toLowerCase().includes(q);
      if (!matchTitle && !matchMsg && !matchType) return false;
    }

    return true;
  });

  // Get semantic color styles based on notification category
  const getSemanticConfig = (type: NotificationItem['type']) => {
    switch (type) {
      case 'alert':
        return {
          icon: ShieldAlert,
          label: 'CLINICAL ALERT',
          badgeStyle: 'bg-[#C96A4B]/20 border-[#C96A4B]/50 text-[#E58567] shadow-[0_0_8px_rgba(201,106,75,0.2)]',
          borderStyle: 'border-l-[#C96A4B] border-[#C96A4B]/30 hover:border-[#C96A4B]/60',
          iconBg: 'bg-[#C96A4B]/15 text-[#E58567] border-[#C96A4B]/40',
          bgGlow: 'hover:bg-[#C96A4B]/5',
          actionBtn: 'bg-[#C96A4B]/20 text-[#E58567] hover:bg-[#C96A4B]/30 border-[#C96A4B]/40'
        };

      case 'appointment':
        return {
          icon: Calendar,
          label: 'APPOINTMENT',
          badgeStyle: 'bg-sky-500/20 border-sky-500/50 text-sky-300 shadow-[0_0_8px_rgba(14,165,233,0.2)]',
          borderStyle: 'border-l-sky-500 border-sky-500/30 hover:border-sky-500/60',
          iconBg: 'bg-sky-500/15 text-sky-300 border-sky-500/40',
          bgGlow: 'hover:bg-sky-950/20',
          actionBtn: 'bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 border-sky-500/40'
        };

      case 'message':
        return {
          icon: MessageSquare,
          label: 'SECURE MESSAGE',
          badgeStyle: 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-[0_0_8px_rgba(99,102,241,0.2)]',
          borderStyle: 'border-l-indigo-500 border-indigo-500/30 hover:border-indigo-500/60',
          iconBg: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/40',
          bgGlow: 'hover:bg-indigo-950/20',
          actionBtn: 'bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border-indigo-500/40'
        };

      case 'payment':
        return {
          icon: CreditCard,
          label: 'PAYMENT',
          badgeStyle: 'bg-[#81A684]/20 border-[#81A684]/50 text-[#9EC4A1] shadow-[0_0_8px_rgba(129,166,132,0.2)]',
          borderStyle: 'border-l-[#81A684] border-[#81A684]/30 hover:border-[#81A684]/60',
          iconBg: 'bg-[#81A684]/15 text-[#9EC4A1] border-[#81A684]/40',
          bgGlow: 'hover:bg-[#81A684]/5',
          actionBtn: 'bg-[#81A684]/20 text-[#9EC4A1] hover:bg-[#81A684]/30 border-[#81A684]/40'
        };

      case 'verification':
        return {
          icon: UserCheck,
          label: 'VERIFICATION',
          badgeStyle: 'bg-[#3B828E]/20 border-[#3B828E]/50 text-[#5EC1D0] shadow-[0_0_8px_rgba(59,130,142,0.2)]',
          borderStyle: 'border-l-[#3B828E] border-[#3B828E]/30 hover:border-[#3B828E]/60',
          iconBg: 'bg-[#3B828E]/15 text-[#5EC1D0] border-[#3B828E]/40',
          bgGlow: 'hover:bg-teal-950/20',
          actionBtn: 'bg-[#3B828E]/20 text-[#5EC1D0] hover:bg-[#3B828E]/30 border-[#3B828E]/40'
        };

      case 'system':
      default:
        return {
          icon: Settings,
          label: 'GOVERNANCE',
          badgeStyle: 'bg-[#5C6B73]/20 border-[#5C6B73]/50 text-[#8EA3AD] shadow-[0_0_8px_rgba(92,107,115,0.2)]',
          borderStyle: 'border-l-[#5C6B73] border-[#5C6B73]/30 hover:border-[#5C6B73]/60',
          iconBg: 'bg-[#5C6B73]/20 text-[#8EA3AD] border-[#5C6B73]/40',
          bgGlow: 'hover:bg-[#5C6B73]/5',
          actionBtn: 'bg-[#5C6B73]/20 text-[#8EA3AD] hover:bg-[#5C6B73]/30 border-[#5C6B73]/40'
        };
    }
  };

  const getPriorityTag = (priority?: NotificationItem['priority']) => {
    switch (priority) {
      case 'urgent':
        return (
          <span className="px-2 py-0.5 bg-[#C96A4B]/20 border border-[#C96A4B]/60 text-[#E58567] font-mono text-[9px] font-bold uppercase rounded-xs animate-pulse">
            URGENT
          </span>
        );
      case 'high':
        return (
          <span className="px-2 py-0.5 bg-sky-500/20 border border-sky-500/50 text-sky-300 font-mono text-[9px] font-bold uppercase rounded-xs">
            HIGH PRIORITY
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-0.5 bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-mono text-[9px] font-bold uppercase rounded-xs">
            STANDARD
          </span>
        );
      case 'low':
      default:
        return (
          <span className="px-2 py-0.5 bg-[#5C6B73]/20 border border-[#5C6B73]/40 text-[#8EA3AD] font-mono text-[9px] font-bold uppercase rounded-xs">
            INFO
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#C96A4B]/15 border border-[#C96A4B]/40 rounded-sm text-[#E58567]">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-cinzel text-2xl font-bold text-[var(--foreground)] tracking-tight">
                NOTIFICATIONS & SYSTEM LOGS
              </h1>
              <p className="text-xs text-[var(--foreground-muted)] font-mono">
                Real-time encrypted dispatch, clinical alerts, and governance notifications.
              </p>
            </div>
          </div>
        </div>

        {/* TOP ACTION BUTTONS */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="px-3 py-2 bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-[var(--border-subtle)] text-[var(--foreground-subtle)] hover:text-[var(--foreground)] rounded-sm font-mono text-xs font-bold transition-all flex items-center gap-1.5"
            title="Refresh Notification Stream"
          >
            <RefreshCw className={`w-4 h-4 text-[#81A684] ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'SYNCING...' : 'REFRESH'}</span>
          </button>

          <button
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0 || loading}
            className={`px-3 py-2 rounded-sm border font-mono text-xs font-bold transition-all flex items-center gap-2 ${
              unreadCount > 0 && !loading
                ? 'bg-[#81A684]/15 border-[#81A684]/40 text-[#9EC4A1] hover:bg-[#81A684]/25 shadow-sm'
                : 'bg-[var(--background-tertiary)] border-[var(--border-subtle)] text-[var(--foreground-subtle)] cursor-not-allowed opacity-50'
            }`}
          >
            <CheckCheck className="w-4 h-4" />
            <span>MARK ALL READ</span>
          </button>

          {readCount > 0 && (
            <button
              onClick={handleClearRead}
              className="px-3 py-2 bg-[var(--background-tertiary)] hover:bg-[#C96A4B]/15 border border-[var(--border-subtle)] hover:border-[#C96A4B]/40 text-[var(--foreground-subtle)] hover:text-[#E58567] rounded-sm font-mono text-xs font-bold transition-all flex items-center gap-2"
              title="Clear all read notifications"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">CLEAR READ</span>
            </button>
          )}
        </div>
      </div>

      {/* STAT SUMMARY METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {loading ? (
          <>
            <StatBlockSkeleton />
            <StatBlockSkeleton />
            <StatBlockSkeleton />
            <StatBlockSkeleton />
          </>
        ) : (
          <>
            <StatBlock
              label="Total Notifications"
              value={notifications.length}
              subtext="Encrypted system dispatches"
              icon={Bell}
              accent="slate"
            />
            <StatBlock
              label="Unread Alerts"
              value={unreadCount}
              subtext={unreadCount > 0 ? 'Requires attention' : 'All caught up'}
              icon={AlertCircle}
              accent={unreadCount > 0 ? 'terracotta' : 'sage'}
            />
            <StatBlock
              label="Clinical & Urgent"
              value={urgentCount}
              subtext="High priority items"
              icon={ShieldAlert}
              accent="amber"
            />
            <StatBlock
              label="Cleared / Read"
              value={readCount}
              subtext="Processed logs"
              icon={CheckCheck}
              accent="sage"
            />
          </>
        )}
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="p-4 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-4 shadow-lg">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* SEARCH INPUT */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground-subtle)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notifications by keyword, title, or reference..."
              className="w-full pl-9 pr-4 py-2 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] focus:border-[#81A684] rounded-sm text-xs text-[var(--foreground)] placeholder-[var(--foreground-subtle)] outline-none font-sans transition-colors"
            />
          </div>

          {/* PRIORITY SELECTOR */}
          <div className="flex items-center gap-2 shrink-0">
            <Filter className="w-4 h-4 text-[var(--foreground-subtle)]" />
            <span className="font-mono text-xs text-[var(--foreground-muted)] hidden sm:inline">PRIORITY:</span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] focus:border-[#81A684] rounded-sm text-xs font-mono text-[var(--foreground)] outline-none"
            >
              <option value="all">ALL PRIORITIES</option>
              <option value="urgent">URGENT</option>
              <option value="high">HIGH</option>
              <option value="medium">STANDARD</option>
              <option value="low">INFO</option>
            </select>
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-2 border-t border-[var(--border-subtle)]/50 custom-scrollbar font-mono text-xs">
          {[
            { id: 'all', label: 'ALL', count: notifications.length },
            { id: 'unread', label: 'UNREAD', count: unreadCount, badgeClass: 'bg-[#C96A4B]/20 text-[#E58567]' },
            { id: 'appointment', label: 'APPOINTMENTS' },
            { id: 'message', label: 'MESSAGES' },
            { id: 'payment', label: 'PAYMENTS' },
            { id: 'alert', label: 'CLINICAL ALERTS' },
            { id: 'system', label: 'GOVERNANCE' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-sm font-bold uppercase transition-all whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#81A684]/20 border border-[#81A684]/60 text-[#A3C9A6] shadow-sm'
                    : 'bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-transparent text-[var(--foreground-subtle)] hover:text-[var(--foreground)]'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-1.5 py-0.2 rounded-xs text-[10px] ${
                      tab.badgeClass || (isActive ? 'bg-[#81A684]/30 text-[#A3C9A6]' : 'bg-[var(--background)] text-[var(--foreground-muted)]')
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* NOTIFICATION LIST CARDS */}
      <div className="space-y-3">
        {loading ? (
          <>
            <NotificationItemSkeleton />
            <NotificationItemSkeleton />
            <NotificationItemSkeleton />
          </>
        ) : filteredNotifications.length === 0 ? (
          <div className="p-12 text-center bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#5C6B73]/15 border border-[#5C6B73]/40 flex items-center justify-center text-[#8EA3AD]">
              <Inbox className="w-6 h-6" />
            </div>
            <h3 className="font-cinzel text-lg font-bold text-[var(--foreground)]">No Notifications Found</h3>
            <p className="text-xs text-[var(--foreground-muted)] max-w-md mx-auto">
              There are no dispatches matching your current filter criteria or search query.
            </p>
            <button
              onClick={() => {
                setActiveTab('all');
                setSearchQuery('');
                setPriorityFilter('all');
              }}
              className="px-4 py-2 bg-[#81A684]/20 border border-[#81A684]/50 text-[#9EC4A1] font-mono text-xs font-bold rounded-sm hover:bg-[#81A684]/30 transition-colors inline-block mt-2"
            >
              RESET ALL FILTERS
            </button>
          </div>
        ) : (
          filteredNotifications.map((n) => {
            const config = getSemanticConfig(n.type);
            const Icon = config.icon;

            return (
              <div
                key={n.id}
                className={`p-5 bg-[var(--background-secondary)] border border-l-4 ${config.borderStyle} rounded-sm transition-all duration-300 ${config.bgGlow} shadow-md relative group ${
                  !n.read ? 'bg-gradient-to-r from-[var(--background-tertiary)]/80 to-[var(--background-secondary)]' : 'opacity-85'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* ICON BLOCK */}
                  <div className={`p-2.5 rounded-sm border shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-105 ${config.iconBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* CONTENT BLOCK */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* TYPE BADGE */}
                        <span className={`px-2 py-0.5 rounded-xs border font-mono text-[9px] font-extrabold uppercase tracking-wider ${config.badgeStyle}`}>
                          {config.label}
                        </span>

                        {/* PRIORITY TAG */}
                        {getPriorityTag(n.priority)}

                        {/* UNREAD INDICATOR */}
                        {!n.read && (
                          <span className="inline-flex items-center gap-1 font-mono text-[9px] text-[#E58567] font-bold">
                            <span className="w-2 h-2 rounded-full bg-[#C96A4B] animate-ping" />
                            UNREAD
                          </span>
                        )}
                      </div>

                      {/* TIMESTAMP */}
                      <div className="flex items-center gap-1 font-mono text-[10px] text-[var(--foreground-subtle)]">
                        <Clock className="w-3 h-3 text-[var(--foreground-subtle)]" />
                        <span>{n.timestamp}</span>
                      </div>
                    </div>

                    {/* TITLE */}
                    <h3 className="font-cinzel text-base font-bold text-[var(--foreground)] tracking-tight">
                      {n.title}
                    </h3>

                    {/* MESSAGE BODY */}
                    <p className="text-xs text-[var(--foreground-muted)] leading-relaxed font-sans">
                      {n.message}
                    </p>

                    {/* ACTIONS & FOOTER */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[var(--border-subtle)]/40 font-mono text-xs">
                      <div>
                        {n.actionUrl && (
                          <Link
                            to={n.actionUrl}
                            className={`px-3 py-1.5 rounded-xs border font-bold uppercase transition-all inline-flex items-center gap-1.5 shadow-sm text-xs ${config.actionBtn}`}
                          >
                            <span>{n.actionText || 'VIEW DETAILS'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>

                      {/* INDIVIDUAL CONTROLS */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleToggleRead(n.id)}
                          className="text-[var(--foreground-subtle)] hover:text-[#9EC4A1] transition-colors flex items-center gap-1 text-[11px]"
                          title={n.read ? 'Mark as Unread' : 'Mark as Read'}
                        >
                          <CheckCheck className={`w-3.5 h-3.5 ${n.read ? 'text-[#81A684]' : ''}`} />
                          <span>{n.read ? 'READ' : 'MARK READ'}</span>
                        </button>

                        <button
                          onClick={() => handleDelete(n.id)}
                          className="text-[var(--foreground-subtle)] hover:text-[#E58567] transition-colors flex items-center gap-1 text-[11px]"
                          title="Delete notification"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>DELETE</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
