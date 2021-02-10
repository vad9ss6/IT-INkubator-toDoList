export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'succeeded' as RequestStatusType,
    error: null
}

type InitialStateType = {
    status: RequestStatusType
    error: string | null
}
type ActionTypes = setStatusActionsType | setErrorActionType

export const appReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

type setStatusActionsType = {
    type: 'APP/SET-STATUS'
    status: RequestStatusType
}

export const setStatusAC = (status: RequestStatusType): setStatusActionsType => {
    return {type: 'APP/SET-STATUS', status }
}

type setErrorActionType ={
    type: 'APP/SET-ERROR'
    error: string | null
}
export const setErrorAC = (error: string | null): setErrorActionType =>{
    return {type: 'APP/SET-ERROR', error}
}