import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataPertumbuhanEkonomi = create(
    persist(
        (set, get) => ({
            dataPertumbuhanEkonomi: [],
            setDataPertumbuhanEkonomi: createArraySetter('dataPertumbuhanEkonomi', set),
        }),
        {
            name: 'dataPertumbuhanEkonomi', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage) // (optional) by default, 'localStorage' is used
        },
    ),
)