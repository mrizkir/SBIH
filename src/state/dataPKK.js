import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataPerkembanganKondisiKetenagakerjaan = create(
    persist(
        (set, get) => ({
            dataPerkembanganKondisiKetenagakerjaan: [],
            setDataPerkembanganKondisiKetenagakerjaan: createArraySetter('dataPerkembanganKondisiKetenagakerjaan', set),
        }),
        {
            name: 'dataPerkembanganKondisiKetenagakerjaan', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataPerkembanganKondisiKetenagakerjaan'),
        },
    ),
)