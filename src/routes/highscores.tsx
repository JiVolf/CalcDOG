import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/highscores')({
  component: () => <div>Hello /highscores!</div>,
})
