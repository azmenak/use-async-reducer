# use-async-reducer

An unoppininated hook to help manage async actions in React

![npm](https://img.shields.io/npm/v/use-async-reducer.svg)
[![codecov](https://codecov.io/gh/azmenak/use-async-reducer/branch/master/graph/badge.svg)](https://codecov.io/gh/azmenak/use-async-reducer)
[![Build Status](https://travis-ci.org/azmenak/use-async-reducer.svg?branch=master)](https://travis-ci.org/azmenak/use-async-reducer)
![NPM](https://img.shields.io/npm/l/use-async-reducer.svg)

This package provides only a reducer to manage state, see [use-async-call](https://github.com/azmenak/use-async-call) for an abstraction which manages hook lifecycle and boilerplate reduction

## Install

```
npm install use-async-reducer
```

## Useage

### Basic Example

```ts
import {useEffect} from 'react'
import useAsyncReducer from 'use-async-reducer'

function DataLoadingComponent({id}) {
  const [response, actions] = useAsyncReducer()

  useEffect(() => {
    const fetchData = async () => {
      actions.initialize()
      try {
        actions.success(await Api.fetchUser(id))
      } catch (error) {
        action.failure(error)
      }
    }
  }, [id])

  return (
    <>
      {response.loading && <div>Loading...</div>}
      {response.data && <div>{response.data.user.name}</div>}
      {response.error && <div>{response.error.message}</div>}
    </>
  )
}
```

### Example with updating data

```ts
import {useEffect, useCallback} from 'react'
import useAsyncReducer, {Loadable} from 'use-async-reducer'

const LoadingIndicator: React.FC<Loadable<any>> = ({loading, data, error}) => {
  if (error) {
    return `Error: ${error.message}`
  }

  if (loading && data === null) {
    return 'Loading initial data...'
  }

  if (loading) {
    return 'Updating data...'
  }

  return null
}

function DataLoadingComponent({id}) {
  const [response, actions] = useAsyncReducer()

  useEffect(() => {
    const fetchData = async () => {
      actions.initialize()
      try {
        actions.success(await Api.fetchUser(id))
      } catch (error) {
        action.failure(error)
      }
    }
  }, [id])

  const updateData = useCallback(async () => {
    actions.request()
    try {
      actions.success(await Api.fetchUser(id))
    } catch (error) {
      action.failure(error)
    }
  }, [])

  return (
    <>
      <LoadingIndicator {...response} />
      {response.data && (
        <>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <button onClick={updateData}>Refresh Data</button>
        </>
      )}
    </>
  )
}
```
