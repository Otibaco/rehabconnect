import React from 'react';
import { ArrowUpRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { ResourceArticle } from '@/types/type';

interface ResourceListProps {
  articles: ResourceArticle[];
}

export const ResourceList: React.FC<ResourceListProps> = ({ articles }) => {
  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <Link
          key={article.id}
          href={`/resources#${article.id}`}
          className="group block p-6 bg-[var(--background-secondary)] hover:bg-[var(--background-tertiary)] border border-[var(--border)] hover:border-[var(--gold)] rounded-sm transition-all duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* NUMBER & CATEGORY */}
            <div className="md:col-span-3 flex items-center gap-3">
              <span className="font-mono text-xl font-bold text-[var(--gold)]">
                {article.number}
              </span>
              <span className="px-2.5 py-1 bg-[var(--background)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--gold-light)] uppercase tracking-wider rounded-sm">
                {article.category}
              </span>
            </div>

            {/* TITLE & DESCRIPTION */}
            <div className="md:col-span-8 space-y-1">
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--gold)] transition-colors">
                {article.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[var(--foreground-muted)] line-clamp-2 leading-relaxed">
                {article.description}
              </p>
              <span className="inline-block text-[10px] font-mono text-[var(--foreground-subtle)] pt-1">
                {article.readTime} • {article.publishedDate}
              </span>
            </div>

            {/* ARROW */}
            <div className="md:col-span-1 flex justify-end">
              <div className="p-2 rounded-sm bg-[var(--background)] border border-[var(--border-subtle)] text-[var(--foreground-subtle)] group-hover:text-[var(--gold)] group-hover:border-[var(--gold)] transition-all">
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>

          </div>
        </Link>
      ))}
    </div>
  );
};
