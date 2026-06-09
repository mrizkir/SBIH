import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataPertumbuhanPenduduk = create(
    persist(
        (set, get) => ({
            dataPertumbuhanPenduduk: [],
            setDataPertumbuhanPenduduk: createArraySetter('dataPertumbuhanPenduduk', set),
        }),
        {
            name: 'dataPertumbuhanPenduduk', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataPertumbuhanPenduduk'),
        },
    ),
)