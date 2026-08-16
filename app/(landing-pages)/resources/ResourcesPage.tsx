"use client"
import React, { useState } from 'react';
import { EditorialHero } from '@/components/editorial/EditorialHero';
import { FinalCTA } from '@/components/editorial/FinalCTA';
import { resourceArticles } from '@/lib/data';
import { Search, BookOpen, Clock, ArrowUpRight, X, Sparkles } from 'lucide-react';
import { ResourceArticle } from '@/types/type';

export const ResourcesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<ResourceArticle | null>(null);

  const categories = ['All', 'Education', 'Family Support', 'Recovery', 'Substance Use', 'Mental Wellbeing'];

  const filteredArticles = resourceArticles.filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-0">
      
      {/* HERO */}
      <EditorialHero
        number="01"
        sectionLabel="KNOWLEDGE BASE & GUIDES"
        title="RESOURCES & EDUCATION."
        subtitle="Evidence-based insights, educational articles, and recovery advice for individuals and families."
        breadcrumb="Resources"
      />

      {/* FILTER & SEARCH BAR */}
      <section className="py-12 bg-[var(--background-secondary)] border-b border-[var(--border)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* SEARCH */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-subtle)]" />
              <input
                type="text"
                placeholder="Search articles, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-[var(--background-tertiary)] border border-[var(--border)] rounded-sm text-xs font-sans text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:outline-none focus:border-[var(--gold)]"
              />
            </div>

            {/* CATEGORIES */}
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs overflow-x-auto pb-2 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-sm transition-all shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[var(--gold)] text-[#080907] font-bold shadow-lg'
                      : 'bg-[var(--background-tertiary)] hover:bg-[var(--border)] text-[var(--foreground-muted)] border border-[var(--border-subtle)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ARTICLE ROWS */}
      <section className="py-24 md:py-36 bg-[var(--background)] border-b border-[var(--border)] relative overflow-hidden">
        
        {/* Grid */}
        <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
          
          <div className="flex items-center justify-between font-mono text-xs text-[var(--foreground-subtle)] border-b border-[var(--border-subtle)] pb-4">
            <span>SHOWING {filteredArticles.length} ARTICLES</span>
            <span>ACTIVE FILTER: {selectedCategory.toUpperCase()}</span>
          </div>

          <div className="space-y-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setActiveArticle(article)}
                className="group cursor-pointer p-8 bg-[var(--background-secondary)] hover:bg-[var(--background-tertiary)] border border-[var(--border)] hover:border-[var(--gold)] rounded-sm transition-all duration-300 relative crosshair-corner shadow-xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  <div className="md:col-span-3 flex items-center gap-4">
                    <span className="font-mono text-3xl font-extrabold text-[var(--gold)] group-hover:scale-105 transition-transform">
                      {article.number}
                    </span>
                    <span className="px-3 py-1 bg-[var(--background)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--gold-light)] font-bold uppercase tracking-wider rounded-sm">
                      {article.category}
                    </span>
                  </div>

                  <div className="md:col-span-8 space-y-2">
                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[var(--foreground)] group-hover:text-[var(--gold)] transition-colors">
                      {article.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[var(--foreground-muted)] line-clamp-2 leading-relaxed">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-4 text-[10px] font-mono text-[var(--foreground-subtle)] pt-1">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[var(--gold)]" />
                        {article.readTime}
                      </span>
                      <span>•</span>
                      <span>{article.publishedDate}</span>
                    </div>
                  </div>

                  <div className="md:col-span-1 flex justify-end">
                    <div className="p-3 rounded-sm bg-[var(--background)] border border-[var(--border-subtle)] text-[var(--foreground-subtle)] group-hover:text-[var(--gold)] group-hover:border-[var(--gold)] transition-all">
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* READ ARTICLE MODAL */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-3xl w-full bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm p-6 sm:p-10 shadow-2xl space-y-6 my-8 relative crosshair-corner">
            
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
              <span className="px-3 py-1 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--gold)] font-bold uppercase rounded-sm">
                {activeArticle.category}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-2 text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--foreground)] leading-snug">
              {activeArticle.title}
            </h2>

            <div className="space-y-4 font-sans text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed border-t border-[var(--border-subtle)] pt-6 max-h-[60vh] overflow-y-auto pr-2">
              {activeArticle.content.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between">
              <span className="font-mono text-xs text-[var(--gold)] font-bold">
                REHAB NIGERIA RESOURCE LIBRARY
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="px-6 py-2.5 bg-[var(--gold)] text-[#080907] font-mono text-xs font-bold rounded-sm hover:bg-[var(--gold-light)] transition-colors"
              >
                CLOSE ARTICLE
              </button>
            </div>

          </div>
        </div>
      )}

      {/* FINAL CTA */}
      <FinalCTA />

    </div>
  );
};
