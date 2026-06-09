import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataLajuInflasi = create(
    persist(
        (set, get) => ({
            dataLajuInflasi: [],
            setDataLajuInflasi: createArraySetter('dataLajuInflasi', set),
        }),
        {
            name: 'dataLajuInflasi', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataLajuInflasi'),
        },
    ),
)