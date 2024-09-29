import { Text } from '@radix-ui/themes'
import { space } from 'postcss/lib/list'
 import React, { PropsWithChildren, ReactNode } from 'react'



const ErrorMessage = ({children} : PropsWithChildren) => {
    if (!children) return null
  return (
    <span className="text-red-600">{children}</span>

    )
}

export default ErrorMessage