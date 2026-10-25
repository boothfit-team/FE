import type { ReactNode } from 'react'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'

export function QueueCard({ name, description, status, current = false, actions }: {
  name: string; description: string; status: string; current?: boolean; actions?: ReactNode
}) {
  return <Card className="space-y-4">
    {current && <Badge>{status}</Badge>}
    <div className="flex items-center justify-between gap-2"><h3 className="text-section font-bold">{name}</h3>{!current && <Badge>{status}</Badge>}</div>
    <p className="text-body text-muted">{description}</p>
    {actions && <div className="flex gap-2 [&>*]:flex-1">{actions}</div>}
  </Card>
}
