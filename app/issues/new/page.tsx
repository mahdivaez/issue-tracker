import { Box } from '@radix-ui/themes'
import dynamic from 'next/dynamic'
import Skeleton from 'react-loading-skeleton'
import IssueFormSkeleton from '../_components/IssueFormSkeleton'

const IssueForm = dynamic(() => import('../_components/IssueForm'), { ssr: false , loading: () => <IssueFormSkeleton/>   })

const NewIssuepage = () => {
  return (
        <IssueForm/>
    )
}

export default NewIssuepage