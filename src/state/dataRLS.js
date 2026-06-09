import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataLamaSekolah = create(
    persist(
        (set, get) => ({
            dataLamaSekolah: [],
            setDataLamaSekolah: createArraySetter('dataLamaSekolah', set),
        }),
        {
            name: 'dataLamaSekolah', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataLamaSekolah'),
        },
    ),
)