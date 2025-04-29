import { Issus } from '@/app/generated/prisma'
import { Button } from '@radix-ui/themes'
import React from 'react'

const DeleteIssueButton = ({issueId}:{issueId:number}) => {
  return (
    <Button color='red'>Delete issue</Button>
  )
}

export default DeleteIssueButton