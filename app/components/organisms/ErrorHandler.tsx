import { Grid, Skeleton, Stack, Text } from "@chakra-ui/react";

type TErrorHandler = {
  data: any,
  loading: boolean,
  error: any,
}

const ErrorHandler = ({ data, loading, error }: TErrorHandler) => {
  const skeletonsCount = 9;

  if (loading) {
    return (
      <Grid 
        templateColumns="repeat(auto-fill, minmax(250px, 1fr))" 
        gap={4}
        w="full"
        maxW="4xl"
        p={4}
      >
        {Array.from({ length: skeletonsCount }).map((_, index) => (
          <Skeleton key={index} w="full" h={150} borderRadius="md" />
        ))}
      </Grid>
    );
  }

  if (error) {
    return (
      <Text mt={"16%"}>Something went wrong, please try again later</Text>
    )
  }
  
  if (data.length < 1) {
    return (
      <Text mt={"16%"}>Your data is empty!</Text>
    )
  }

  return null;
};

export default ErrorHandler;