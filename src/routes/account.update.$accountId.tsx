import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/account/update/$accountId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/account/update/$accountId"!</div>
}
