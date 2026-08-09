import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchPlaceholder?: string;
  searchKey?: keyof T;
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  searchPlaceholder = 'Search records...',
  searchKey
}: DataTableProps<T>) {
  const [query, setQuery] = useState('');

  const filteredData = data.filter((item) => {
    if (!query) return true;
    if (searchKey && item[searchKey]) {
      return String(item[searchKey]).toLowerCase().includes(query.toLowerCase());
    }
    return JSON.stringify(item).toLowerCase().includes(query.toLowerCase());
  });

  return (
    <div className="bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm shadow-xl space-y-4 p-4 sm:p-6 crosshair-corner">
      
      {/* SEARCH BAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-2 border-b border-[var(--border-subtle)]">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-subtle)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-10 pr-4 py-2.5 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm font-sans text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--gold)]"
          />
        </div>

        <div className="font-mono text-xs text-[var(--foreground-subtle)] flex items-center justify-between sm:justify-end gap-2">
          <span>SHOWING {filteredData.length} RECORDS</span>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-sans text-xs border-collapse">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--background-tertiary)] font-mono text-[10px] text-[var(--gold)] uppercase tracking-wider">
              {columns.map((col) => (
                <th key={col.key} className="p-3 font-bold">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--border-subtle)]">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-8 text-center text-[var(--foreground-subtle)] font-mono">
                  No records match your query.
                </td>
              </tr>
            ) : (
              filteredData.map((item, idx) => (
                <tr key={idx} className="hover:bg-[var(--background-tertiary)]/50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="p-3.5 text-[var(--foreground-muted)]">
                      {col.render ? col.render(item) : item[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
