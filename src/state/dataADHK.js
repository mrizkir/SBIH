import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataAtasDasarHargaKonstan = create(
    persist(
        (set, get) => ({
            dataAtasDasarHargaKonstan: [],
            setDataAtasDasarHargaKonstan: createArraySetter('dataAtasDasarHargaKonstan', set),
        }),
        {
            name: 'dataAtasDasarHargaKonstan', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataAtasDasarHargaKonstan'),
        },
    ),
)