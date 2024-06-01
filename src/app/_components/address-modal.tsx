"use client";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { AddressForm } from "./address-form";
import { Address } from "@/types/address";

export function AddressModal({ isEdit = false, open, setOpen, address }: {
    address?: Address
    isEdit: boolean,
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}) {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [isSubmitted, setSubmitted] = useState(false);

    const callback = () => {
        setSubmitted(state => !state)
        setOpen(state => !state)
    }

    return isDesktop ? (
        <ModalAddress isEdit={isEdit} open={open} setOpen={setOpen} setSubmit={setSubmitted}>
            <AddressForm
                defaultValues={address}
                callback={callback}
                onSubmitEvent={isSubmitted}
            />
        </ModalAddress>
    ) : (
        <DrawerAddress isEdit={isEdit} open={open} setOpen={setOpen} setSubmit={setSubmitted}>
            <AddressForm
                defaultValues={address}
                callback={callback}
                onSubmitEvent={isSubmitted}
            />
        </DrawerAddress>
    );
}

function DrawerAddress({
    isEdit,
    setSubmit,
    open,
    setOpen,
    children,
}: {
    isEdit: boolean;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setSubmit: Dispatch<SetStateAction<boolean>>;
    children: ReactNode;
}) {
    return (
        <Drawer open={open} onOpenChange={setOpen}>
            {
                !isEdit ? (
                    <DrawerTrigger asChild>
                        <Button variant="flat" color="primary" startContent={<Plus />}>
                            Adicionar endereço
                        </Button>
                    </DrawerTrigger>
                ) : null
            }
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{isEdit ? "Editar Endereço" : "Novo endereço"}</DrawerTitle>
                    <DrawerDescription>Informe os dados do endereço</DrawerDescription>
                </DrawerHeader>
                {children}
                <DrawerFooter>
                    <Button onPress={() => setSubmit(true)} color="primary">
                        Enviar
                    </Button>
                    <DrawerClose>
                        <Button onPress={() => setOpen(state => !state)} className="w-full" variant="flat">
                            Cancelar
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

function ModalAddress({
    isEdit,
    setSubmit,
    open,
    setOpen,
    children,
}: {
    isEdit: boolean;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    setSubmit: Dispatch<SetStateAction<boolean>>;
    children: ReactNode;
}) {
    return (
        <>
            {
                !isEdit ? (
                    <Button
                        onPress={() => setOpen(state => !state)}
                        variant="flat"
                        color="primary"
                        startContent={<Plus />}
                    >
                        Adicionar endereço
                    </Button>
                ) : null
            }
            <Modal size="2xl" isOpen={open} onOpenChange={setOpen}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {isEdit ? "Editar Endereço" : "Novo endereço"}
                            </ModalHeader>
                            <ModalBody>{children}</ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancelar
                                </Button>
                                <Button color="primary" onPress={() => setSubmit(true)}>
                                    Enviar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
