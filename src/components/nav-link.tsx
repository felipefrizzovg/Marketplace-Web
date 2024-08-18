import { Link, LinkProps, useLocation } from 'react-router-dom'

export type NavLinkProps = LinkProps

export function NavLink(props: NavLinkProps) {
  const { pathname } = useLocation()

  return (
    <Link
      data-current={pathname === props.to}
      className="flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-grayScale-300 hover:bg-transparent hover:text-orange-base data-[current=true]:bg-shape-shape data-[current=true]:text-orange-base"
      {...props}
    />
  )
}
