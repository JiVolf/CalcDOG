import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/clan')({
  component: () => <div>Hello /clan!</div>,
})
