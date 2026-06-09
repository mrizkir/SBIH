import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataAngkaHarapanHidup = create(
    persist(
        (set, get) => ({
            dataAngkaHarapanHidup: [],
            setDataAngkaHarapanHidup: createArraySetter('dataAngkaHarapanHidup', set),
        }),
        {
            name: 'dataAngkaHarapanHidup', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataAngkaHarapanHidup'),
        },
    ),
)