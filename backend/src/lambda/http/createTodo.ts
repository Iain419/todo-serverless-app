import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import {CreateTodoRequest} from '../../requests/CreateTodoRequest';
import { createTodo } from "../../businessLogic/ToDo";

export const handler = middy(
    async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
      console.log(`Processing event ${event}`)
      const newTodo: CreateTodoRequest = JSON.parse(event.body)
      // TODO: Implement creating a new TODO item
      const authorization = event.headers.Authorization
      const split = authorization.split(' ')
      const jwtToken = split[1]
  
      const todoItem = await createTodo(newTodo, jwtToken)
  
      return {
        statusCode: 201,
        body: JSON.stringify({
          todoItem
        })
      }
    }
  )
  
  handler.use(
    cors({
      credentials: true
    })
  )
  