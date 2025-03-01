import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/chat')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/chat"!</div>
}
