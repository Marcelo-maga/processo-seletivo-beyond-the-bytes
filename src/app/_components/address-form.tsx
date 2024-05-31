"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/react";
import { MessageSquareQuote, ScanBarcode } from 'lucide-react';

const FormSchema = z.object({
    batch: z.string().max(4),
    nickname: z.string().optional(),
    landmark: z.string().optional()
});

type FormType = z.infer<typeof FormSchema>;

export function AddressForm({ onSubmitEvent }: { onSubmitEvent: boolean }) {
  
    const form = useForm<FormType>({
        resolver: zodResolver(FormSchema),
        mode: "onChange",
    });

    const onSubmit: SubmitHandler<FormType> = (data) => {
        console.log(data)
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="px-4 space-y-2">
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
