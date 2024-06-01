"use client"

import { useAddressStore } from "@/stores/address-store";
import { Address } from "@/types/address";
import { Button, Card, CardBody, CardHeader, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { EllipsisVertical } from 'lucide-react';
import { useState } from "react";
import { AddressModal } from "./address-modal";


export function AddressList() {
    const { addressList } = useAddressStore();
    const [isOpen, setOpen] = useState(false);

    return (
        <main className="flex flex-col gap-4 h-full">
            <div>
                <h1 className="font-bold text-2xl">
                    Endereços
                </h1>
            </div>

            <AddressModal open={isOpen} setOpen={setOpen} isEdit={false} />

            <ScrollShadow className="w-full h-full space-y-2 bg-white">
                {
                    addressList.length > 0 ? (
                        addressList.map(address => (
                            <ListItem address={address} key={address.id} />
                        ))
                    ) : (
                        <div className="h-full w-full flex items-center justify-center">
                            <h1 className="text-zinc-500 font-bold">Cadastre um novo Endereço</h1>
                        </div>
                    )

                }
            </ScrollShadow>
        </main>
    )
}

function ListItem({ address }: { address: Address }) {
    const [isOpen, setOpen] = useState(false);
    const { deleteAddress } = useAddressStore();

    return (
        <>
            <Card className="shadow-lg border">
                <CardHeader className="flex items-start justify-between">
                    <div>
                        <p className="text-xs font-bold text-zinc-400">{address.batch}</p>
                        <p className="font-bold">{address.nickname}</p>
                    </div>
                    <Dropdown>
                        <DropdownTrigger>
                            <Button
                                variant="flat"
                                color="primary"
                                isIconOnly
                            >
                                <EllipsisVertical />
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu>
                            <DropdownItem onPress={() => setOpen(state => !state)} key="edit">Editar</DropdownItem>
                            <DropdownItem
                                key="delete"
                                className="text-danger"
                                color="danger"
                                onPress={() => deleteAddress(address.id)}
                            >
                                Apagar
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </CardHeader>
                <CardBody>
                    <p className="text-sm font-semibold text-zinc-400">{address.landmark}</p>
                </CardBody>
            </Card>
            <AddressModal address={address} open={isOpen} setOpen={setOpen} isEdit={true} />
        </>
    )
}