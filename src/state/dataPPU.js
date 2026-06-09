import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataPersentasePendudukUsia = create(
    persist(
        (set, get) => ({
            dataPersentasePendudukUsia: [],
            setDataPersentasePendudukUsia: createArraySetter('dataPersentasePendudukUsia', set),
        }),
        {
            name: 'dataPersentasePendudukUsia', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataPersentasePendudukUsia'),
        },
    ),
)