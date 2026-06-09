import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataIndeksPemberdayaanGender = create(
    persist(
        (set, get) => ({
            dataIndeksPemberdayaanGender: [],
            setDataIndeksPemberdayaanGender: createArraySetter('dataIndeksPemberdayaanGender', set),
        }),
        {
            name: 'dataIndeksPemberdayaanGender', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataIndeksPemberdayaanGender'),
        },
    ),
)