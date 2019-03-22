# use-async-reducer

An unoppininated hook to help manage async actions in React

![npm](https://img.shields.io/npm/v/use-async-reducer.svg)
[![codecov](https://codecov.io/gh/azmenak/use-async-reducer/branch/master/graph/badge.svg)](https://codecov.io/gh/azmenak/use-async-reducer)
[![Build Status](https://travis-ci.org/azmenak/use-async-reducer.svg?branch=master)](https://travis-ci.org/azmenak/use-async-reducer)
![NPM](https://img.shields.io/npm/l/use-async-reducer.svg)

## Install

```
npm install use-async-reducer
```

## Useage

```ts
import {useEffect} from 'react'
import useAsyncReducer from 'use-async-reducer'

function DataLoadingComponent({id}) {
  const [response, actions] = useAsyncReducer()

  useEffect(() => {
    const fetchData = async () => {
      actions.request()
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
