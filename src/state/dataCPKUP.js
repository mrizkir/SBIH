import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataCapaianProduksiKomoditiUnggulanPerkebunan = create(
    persist(
        (set, get) => ({
            dataCapaianProduksiKomoditiUnggulanPerkebunan: [],
            setDataCapaianProduksiKomoditiUnggulanPerkebunan: createArraySetter('dataCapaianProduksiKomoditiUnggulanPerkebunan', set),
        }),
        {
            name: 'dataCapaianProduksiKomoditiUnggulanPerkebunan', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataCapaianProduksiKomoditiUnggulanPerkebunan'),
        },
    ),
)