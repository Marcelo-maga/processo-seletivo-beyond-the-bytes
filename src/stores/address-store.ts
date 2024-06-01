import { Address } from "@/types/address";
import { create } from "zustand";

interface AddressStore {
  addressList: Address[];
  addAddress: (newAddress: Address) => void;
  updateAddress: (updatedAddress: Partial<Address>, id: string) => void;
  deleteAddress: (id: string) => void;
}

export const useAddressStore = create<AddressStore>()((set) => ({
  addressList: [
    {
      id: "teste1",
      batch: "4321",
      nickname: "Armazém do buracão",
      landmark: "Perto do buracão",
    },
  ],
  addAddress: (newAddress) => {
    set((state) => ({
      addressList: [...state.addressList, newAddress],
    }));
  },

  updateAddress: (updatedAddress, id) => {
    set((state) => ({
      addressList: state.addressList.map((address) =>
        address.id === id ? { ...address, ...updatedAddress } : address
      ),
    }));
  },

  deleteAddress: (id) => {
    set((state) => ({
      addressList: state.addressList.filter((address) => address.id !== id),
    }));
  },
}));
