import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataIndeksDayaBeli = create(
    persist(
        (set, get) => ({
            dataIndeksDayaBeli: [],
            setDataIndeksDayaBeli: createArraySetter('dataIndeksDayaBeli', set),
        }),
        {
            name: 'dataIndeksDayaBeli', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataIndeksDayaBeli'),
        },
    ),
)