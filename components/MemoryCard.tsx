import { Memory } from '@/types';
import { format } from 'date-fns';
import { Heart, Trash2 } from 'lucide-react';

interface MemoryCardProps {
  memory: Memory;
  isPrivate?: boolean;
  onDelete?: (id: string) => void;
}

export function MemoryCard({ memory, isPrivate, onDelete }: MemoryCardProps) {
  return (
    <div className="group space-y-4">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-sm bg-secondary/30">
        <img 
          src={memory.imageUrl} 
          alt={memory.title || 'Memory'} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {isPrivate && onDelete && (
          <button 
            onClick={() => onDelete(memory.id)}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-red-500/20 backdrop-blur-md text-white/70 hover:text-red-200 rounded-full transition-all opacity-0 group-hover:opacity-100"
            title="Delete memory"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">
            {format(new Date(memory.date), 'MMMM d, yyyy')}
          </p>
          {memory.title && (
            <h3 className="text-lg font-serif font-medium">{memory.title}</h3>
          )}
        </div>
        
        <p className="text-foreground/90 leading-relaxed">
          {memory.description}
        </p>
        
        <div className="pt-2">
          <div className="flex items-start space-x-3 italic text-muted border-l-2 border-primary/20 pl-4 py-1">
            <div className="mt-1">
              <Heart className="w-3 h-3 text-primary/50" />
            </div>
            <div className="space-y-1">
              <span className="font-medium text-primary/70 block text-[10px] uppercase tracking-tighter">
                Why it's meaningful
              </span>
              <p className="text-sm">
                {memory.meaning}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
