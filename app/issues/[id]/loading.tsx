import { Box, Card, Flex } from "@radix-ui/themes";
import React from "react";

import {Skeleton} from '@/app/components';

const loading = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex gap="3" my="2">
        <Skeleton />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default loading;
