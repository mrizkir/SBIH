import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createArrayPersistOptions, createArraySetter } from './persistUtils'

export const stateDataAngkaKeberlangsunganHidupBayi = create(
    persist(
        (set, get) => ({
            dataAngkaKeberlangsunganHidupBayi: [],
            setDataAngkaKeberlangsunganHidupBayi: createArraySetter('dataAngkaKeberlangsunganHidupBayi', set),
        }),
        {
            name: 'dataAngkaKeberlangsunganHidupBayi', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage),
        ...createArrayPersistOptions('dataAngkaKeberlangsunganHidupBayi'),
        },
    ),
)