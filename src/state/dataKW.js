import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataKunjunganWisata = create(
    persist(
        (set, get) => ({
            dataKunjunganWisata: [],
            setDataKunjunganWisata: createArraySetter('dataKunjunganWisata', set),
        }),
        {
            name: 'dataKunjunganWisata', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataKunjunganWisata'),
        },
    ),
)