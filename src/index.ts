import {useReducer, useCallback} from 'react'
import {ActionType, getType} from 'typesafe-actions'

import * as actions from './actions'

export * from './actions'
export * from './constants'

export type Loadable<V = any> = {
  loading: boolean
  error: Error | null
  data: V
}

export const reducer = <T extends any>(
  state: Loadable<T>,
  action: ActionType<typeof actions>
): Loadable<any> => {
  switch (action.type) {
    case getType(actions.request):
      return {
        ...state,
        error: null,
        loading: true
      }
    case getType(actions.success):
      return {
        data: action.payload,
        error: null,
        loading: false
      }
    case getType(actions.failure):
      return {
        data: null,
        error: action.payload,
        loading: false
      }
    case getType(actions.complete):
      return {
        ...state,
        loading: false
      }
  }
}

export interface AsyncReducerBoundActions<T = any> {
  /**
   * To be called at the beginning of a request, sets `loading` to `true`
   */
  request(): void
  /**
   * To be called with the data to be saved into the state
   * @param payload Result of the async call
   */
  success(payload: T): void
  /**
   * To be called when the async call fails
   * @param error
   */
  failure(error: Error): void
  /**
   * Can be called when a call fails/complete and the result is being discarded
   */
  complete(): void
}

/**
 * Provides a reducer and actions to manage states of async operations
 * @param initialValue Will set the `data` attribute of the first returned value
 * @returns An array of two values
 *  0. the state of the async operation with the shape
 *  1. object of bound action methods
 *
 * @see [https://github.com/azmenak/use-async-reducer/blob/master/README.md](https://github.com/azmenak/use-async-reducer/blob/master/README.md)
 */
export default function useAsyncReducer<V extends any>(
  initialValue?: V
): [Loadable<V>, AsyncReducerBoundActions<V>] {
  const [state, dispatch] = useReducer(reducer, {
    data: initialValue || null,
    loading: false,
    error: null
  })

  const request = useCallback(() => dispatch(actions.request()), [])
  const success = useCallback(
    (payload: V) => dispatch(actions.success(payload)),
    []
  )
  const failure = useCallback(
    (error: Error) => dispatch(actions.failure(error)),
    []
  )
  const complete = useCallback(() => dispatch(actions.complete()), [])

  return [state, {request, success, failure, complete}]
}
