import React from 'react';

import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import router from 'next/dist/shared/lib/router/router';
import { Article } from '@/lib/types';

export const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/resources/${article.slug}`)}
      className="group cursor-pointer rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full transform hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-teal-300 text-[10px] font-semibold px-3 py-1 rounded-full border border-teal-500/30 flex items-center gap-1">
          <BookOpen className="w-3 h-3" />
          <span>{article.category}</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
        <div>
          <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
            <span>•</span>
            <span>{article.publishedDate}</span>
          </div>

          <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2 leading-snug">
            {article.title}
          </h4>

          <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 line-clamp-3 leading-relaxed">
            {article.summary}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-7 h-7 rounded-full object-cover"
            />
            <div className="text-left">
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">{article.author.name}</div>
              <div className="text-[10px] text-slate-500">{article.author.role}</div>
            </div>
          </div>

          <span className="text-teal-600 dark:text-teal-400 text-xs font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Read <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
