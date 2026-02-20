'use client'
import NextLink, { LinkProps } from 'next/link'
import { AnchorHTMLAttributes } from 'react'

type AppLinkProps = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>

// Drop-in replacement for next/link — disables RSC prefetch to prevent
// 404 noise on Cloudflare Pages static export
export default function AppLink({ prefetch = false, ...props }: AppLinkProps) {
  return <NextLink prefetch={prefetch} {...props} />
}
