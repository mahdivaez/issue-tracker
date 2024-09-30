import React from 'react';
import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes';

interface Props {
  href: string;
  children: React.ReactNode; // Accepts any valid React element, not just strings
}

const Link = ({ href, children }: Props) => {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>
        {children} {/* Can now be any element (JSX), not just strings */}
      </RadixLink>
    </NextLink>
  );
};

export default Link;
