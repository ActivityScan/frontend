import { Middleware } from '@reduxjs/toolkit'
import { RootState } from '../index'
import { updateSport } from '../searchSlice'

function isSportsAction(action: unknown): action is { type: string } {
  return (
    typeof action === 'object' &&
    action !== null &&
    'type' in action &&
    typeof (action as { type: string }).type === 'string' &&
    (action as { type: string }).type.startsWith('sports/')
  )
}
export const sportMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action: unknown) => {
    const result = next(action)

    if (isSportsAction(action)) {
      const state = store.getState()
      store.dispatch(updateSport(state.sports.selectedSports))
    }
    return result
  }
