import { IssuesStatusBadge } from '@/app/components'
import { Issus } from '@/app/generated/prisma'
import { Heading, Flex, Card, Text } from '@radix-ui/themes'
import React from 'react'
import ReactMarkdown from 'react-markdown'

const IssueDetail = ({issue}:{issue :Issus}) => {
  return (
    <>
     <Heading>{issue?.title}</Heading>
        <Flex gap="3" my="2">
          <IssuesStatusBadge status={issue?.status} />
          <Text>{issue?.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose" mt="4">
          <ReactMarkdown>{issue?.description}</ReactMarkdown>
        </Card>
    </>
  )
}

export default IssueDetail