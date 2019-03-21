import {useReducer, useCallback} from 'react'
import {createAsyncAction, ActionType, getType} from 'typesafe-actions'

type Loadable<V = any> = {
  loading: boolean
  error: Error | null
  data: V
}

enum ACTION_TYPES {
  REQUEST = 'REQUEST',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE'
}

const actions = createAsyncAction(
  ACTION_TYPES.REQUEST,
  ACTION_TYPES.SUCCESS,
  ACTION_TYPES.FAILURE
)<undefined, Object, Error>()

const reducer = (
  state: Loadable<any>,
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
  }
}

interface AsyncReducerBoundActions {
  request(): void
  success(payload: any): void
  failure(error: Error): void
}

export default function useAsyncReducer<V extends any>(
  initialValue?: V
): [Loadable<V>, AsyncReducerBoundActions] {
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

  return [state, {request, success, failure}]
}
