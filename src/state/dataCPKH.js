import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataCapaianProduksiKomoditiHortikultura = create(
    persist(
        (set, get) => ({
            dataCapaianProduksiKomoditiHortikultura: [],
            setDataCapaianProduksiKomoditiHortikultura: createArraySetter('dataCapaianProduksiKomoditiHortikultura', set),
        }),
        {
            name: 'dataCapaianProduksiKomoditiHortikultura', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataCapaianProduksiKomoditiHortikultura'),
        },
    ),
)