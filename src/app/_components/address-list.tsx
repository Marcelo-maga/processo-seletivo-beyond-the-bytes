"use client"

import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { AddressModal } from "./address-modal";

export function AddressList() {

    return (
        <main className="flex flex-col gap-4 h-full">
            <div>
                <h1 className="font-bold text-2xl text-zinc-600">
                    Endereços
                </h1>
            </div>

            <AddressModal />

            <ScrollShadow className="w-full h-full">
            </ScrollShadow>
        </main>
    )
}