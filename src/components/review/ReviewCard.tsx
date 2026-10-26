import { Divider } from '../ui/Card'

export function ReviewCard({ author, date, rating, children }: { author: string; date: string; rating: number; children: string }) {
  return <article className="space-y-3 py-4">
    <div className="flex flex-wrap items-center gap-2">
      <h3 className="text-body font-bold">{author}</h3><span className="text-caption text-muted">{date}</span>
      <span aria-label={'5점 만점에 ' + rating + '점'} className="ml-auto text-label font-bold text-success">★ {rating.toFixed(1)}</span>
    </div>
    <p className="text-body text-muted">{children}</p><Divider />
  </article>
}
