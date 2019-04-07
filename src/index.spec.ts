import {renderHook, cleanup, act} from 'react-hooks-testing-library'

import useAsyncReducer from '.'

afterEach(cleanup)

describe('use-async-call', () => {
  it('sets the response value to the results of success actions', () => {
    const {result} = renderHook(() => useAsyncReducer<boolean | null>(null))

    expect(result.current[0]).toEqual({
      data: null,
      loading: false,
      error: null
    })

    act(() => {
      result.current[1].request()
    })
    expect(result.current[0]).toEqual({
      data: null,
      loading: true,
      error: null
    })

    act(() => {
      result.current[1].success(true)
    })
    expect(result.current[0]).toEqual({
      data: true,
      loading: false,
      error: null
    })
  })

  it('sets the response value to the results of error actions', () => {
    const {result} = renderHook(() => useAsyncReducer<boolean | null>(null))

    expect(result.current[0]).toEqual({
      data: null,
      loading: false,
      error: null
    })

    act(() => {
      result.current[1].request()
    })
    expect(result.current[0]).toEqual({
      data: null,
      loading: true,
      error: null
    })

    const err = new Error()
    act(() => {
      result.current[1].failure(err)
    })
    expect(result.current[0]).toEqual({
      data: null,
      loading: false,
      error: err
    })
  })

  it('sets the loading state to false after complete callback', () => {
    const {result} = renderHook(() => useAsyncReducer<boolean | null>(null))

    expect(result.current[0]).toEqual({
      data: null,
      loading: false,
      error: null
    })

    act(() => {
      result.current[1].request()
    })
    expect(result.current[0]).toEqual({
      data: null,
      loading: true,
      error: null
    })

    act(() => {
      result.current[1].complete()
    })
    expect(result.current[0]).toEqual({
      data: null,
      loading: false,
      error: null
    })
  })

  it('resets the state on initialize', () => {
    const {result} = renderHook(() => useAsyncReducer<boolean | null>(null))

    expect(result.current[0]).toEqual({
      data: null,
      loading: false,
      error: null
    })

    act(() => {
      result.current[1].success(true)
    })

    expect(result.current[0]).toEqual({
      data: true,
      loading: false,
      error: null
    })

    act(() => {
      result.current[1].initialize()
    })

    expect(result.current[0]).toEqual({
      data: null,
      loading: true,
      error: null
    })
  })
})
