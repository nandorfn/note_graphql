"use client"
import { useSuspenseQuery } from "@apollo/client";
import gql from "graphql-tag";

const GET_USERS = gql`
  query {
    hello
  }
`

export default function Home() {
  const { data } = useSuspenseQuery(GET_USERS)
  console.log(data.hello);

  return (
    <div>
      <h1>Users</h1>
      <p>{data.hello}</p>
    </div>
  )
}
