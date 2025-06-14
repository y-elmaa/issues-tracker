'use client'
import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusFilterWrapper from '../components/IssueStatusFilterWrapper'

const IssuesAction = () => {
  return (
    <Flex  justify='between'>
      <IssueStatusFilterWrapper/>
            <Button>
              <Link href={"/issues/new"}>New Issue</Link>
            </Button>
          </Flex>
  )
}

export default IssuesAction