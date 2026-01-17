import type { HTMLAttributes } from 'react';

export function YouTube({ id }: { id: string }) {
  return (
    <div className="my-6">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        className="w-full aspect-video rounded-xl border border-fd-border"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}