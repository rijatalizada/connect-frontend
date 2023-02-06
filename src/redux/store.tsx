import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import modalSlice from '../features/modal/modalSlice'

export const store = configureStore({
    reducer: {
        modal: modalSlice
    }
})

export type StoreType = ReturnType<typeof store.getState>