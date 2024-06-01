"use client";

import { useAddressStore } from "@/stores/address-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/react";
import { MessageSquareQuote, ScanBarcode } from 'lucide-react';
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { v4 as uuidv4 } from "uuid";
import { Address } from "@/types/address";

const FormSchema = z.object({
    batch: z.string().max(4),
    nickname: z.string().min(4),
    landmark: z.string().optional()
});

type FormType = z.infer<typeof FormSchema>;

export function AddressForm({ onSubmitEvent, defaultValues, callback }: { onSubmitEvent: boolean, defaultValues?: Address, callback: () => void }) {

    const { addAddress, updateAddress } = useAddressStore();

    const form = useForm<FormType>({
        resolver: zodResolver(FormSchema),
        mode: "onChange",
        defaultValues
    });

    useEffect(() => {
        if (onSubmitEvent) {
            form.handleSubmit(async (data) => {
                if (defaultValues) {
                    updateAddress(data, defaultValues.id)
                    return
                }

                const id = uuidv4();
                addAddress({ id, batch: data.batch, landmark: data.landmark, nickname: data.nickname });
            })();

            callback();
        }

        return () => {
            onSubmitEvent = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onSubmitEvent])

    return (
        <form className="px-4 space-y-2">
            <div className="flex gap-2">
                <Input
                    {...form.register("batch")}
                    maxLength={4}
                    label="Lote"
                    required
                    placeholder="Informe o hash"
                    labelPlacement="outside"
                    startContent={
                        <ScanBarcode className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                />
                <Input
                    {...form.register("nickname")}
                    label="Apelido"
                    required
                    placeholder="Informe o apelido"
                    labelPlacement="outside"
                    startContent={
                        <MessageSquareQuote className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                />
            </div>
            <Textarea
                {...form.register("landmark")}
                label="Ponto de referência"
                labelPlacement="outside"
                placeholder="Descreva um ponto de referência"
            />
        </form>
    );
}
