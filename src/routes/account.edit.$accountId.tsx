import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/account/edit/$accountId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/account/edit/$accountId"!</div>
}
