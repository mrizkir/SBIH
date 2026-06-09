import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataTahun = create(
    persist(
        (set, get) => ({
            dataTahun: [],
            setDataTahuns: createArraySetter('dataTahun', set),
        }),
        {
            name: 'dataTahun', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataTahun'),
        },
    ),
)