import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataPersentaseTingkatKemantapanJalan = create(
    persist(
        (set, get) => ({
            dataPersentaseTingkatKemantapanJalan: [],
            setDataPersentaseTingkatKemantapanJalan: createArraySetter('dataPersentaseTingkatKemantapanJalan', set),
        }),
        {
            name: 'dataPersentaseTingkatKemantapanJalan', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataPersentaseTingkatKemantapanJalan'),
        },
    ),
)