import {createStandardAction} from 'typesafe-actions'

import {ACTION_TYPES} from './constants'

export const initialize = createStandardAction(ACTION_TYPES.INITIALIZE)<
  undefined
>()
export const request = createStandardAction(ACTION_TYPES.REQUEST)<undefined>()
export const success = createStandardAction(ACTION_TYPES.SUCCESS)<any>()
export const failure = createStandardAction(ACTION_TYPES.FAILURE)<Error>()
export const complete = createStandardAction(ACTION_TYPES.COMPLETE)<undefined>()
