"use client";

import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { Plus } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { AddressForm } from "./address-form";

export function AddressModal() {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [isSubmitted, setSubmitted] = useState(false)

    return isDesktop
        ? (
            <ModalAddress setSubmit={setSubmitted}>
                <AddressForm onSubmitEvent={isSubmitted} />
            </ModalAddress>
        )
        : (
            <DrawerAddress setSubmit={setSubmitted}>
                <AddressForm onSubmitEvent={isSubmitted} />
            </DrawerAddress>
        )
}


function DrawerAddress({ setSubmit, children }: { setSubmit: Dispatch<SetStateAction<boolean>>, children: ReactNode }) {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="flat" color="primary" startContent={<Plus />}>
                    Adicionar endereço
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Novo endereço</DrawerTitle>
                    <DrawerDescription>Informe os dados do endereço</DrawerDescription>
                </DrawerHeader>
                {children}
                <DrawerFooter>
                    <Button onPress={() => setSubmit(true)} color="primary">Enviar</Button>
                    <DrawerClose>
                        <Button className="w-full" variant="flat">Cancelar</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

function ModalAddress({ setSubmit, children }: { setSubmit: Dispatch<SetStateAction<boolean>>, children: ReactNode }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} variant="flat" color="primary" startContent={<Plus />}>
                Adicionar endereço
            </Button>
            <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                {children}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => setSubmit(true)}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}
