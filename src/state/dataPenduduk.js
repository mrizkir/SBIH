import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataPenduduk = create(
    persist(
        (set, get) => ({
            dataPenduduk: [],
            setDataPenduduk: createArraySetter('dataPenduduk', set),
        }),
        {
            name: 'dataPenduduk', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataPenduduk'),
        },
    ),
)