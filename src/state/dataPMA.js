import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataPMA = create(
    persist(
        (set, get) => ({
            dataPMA: [],
            setDataPMA: createArraySetter('dataPMA', set),
        }),
        {
            name: 'dataPMA', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataPMA'),
        },
    ),
)