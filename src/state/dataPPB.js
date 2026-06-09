import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataProduksiPerikananBudidaya = create(
    persist(
        (set, get) => ({
            dataProduksiPerikananBudidaya: [],
            setDataProduksiPerikananBudidaya: createArraySetter(
                'dataProduksiPerikananBudidaya',
                set,
            ),
        }),
        {
            name: 'dataProduksiPerikananBudidaya',
            storage: createJSONStorage(() => AsyncStorage),
            ...createArrayPersistOptions('dataProduksiPerikananBudidaya'),
        },
    ),
)
