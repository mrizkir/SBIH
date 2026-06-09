import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataPS = create(
    persist(
        (set, get) => ({
            dataPS: [],
            setDataPS: createArraySetter('dataPS', set),
        }),
        {
            name: 'dataPS',
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataPS'),
        },
    ),
)
