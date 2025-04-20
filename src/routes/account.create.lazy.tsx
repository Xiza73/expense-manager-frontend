import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/account/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/account/create"!</div>
}
