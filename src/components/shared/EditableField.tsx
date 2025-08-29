"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, Loader2, Pencil, X } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { CopyText } from "@/components/shared/CopyText";
import { cn } from "@/lib/utils";

interface EditableFieldProps {
    value: string;
    onSave: (newValue: string) => Promise<void>;
    placeholder?: string;
    inputType?: "input" | "textarea";
    className?: string;
    variant?: "default" | "minimal";
    isPending?: boolean;
}

const truncateText = (text: string, maxLength: number) =>
    text.length <= maxLength ? text : text.slice(0, maxLength) + "...";

export function EditableField({
                                  value,
                                  onSave,
                                  placeholder,
                                  inputType = "input",
                                  className,
                                  variant = "default",
                                  isPending = false,
                              }: EditableFieldProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editingValue, setEditingValue] = useState(value);

    const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
    const prevPending = useRef(isPending);

    useEffect(() => {
        if (prevPending.current && !isPending && isEditing) {
            setIsEditing(false);
        }
        prevPending.current = isPending;
    }, [isPending, isEditing]);

    useEffect(() => {
        if (!isEditing) return;

        inputRef.current?.focus();

        if (inputType === "textarea" && inputRef.current) {
            inputRef.current.style.height = "auto";
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
        }
    }, [isEditing, inputType]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (inputType === "textarea") {
            e.target.style.height = "auto";
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
        setEditingValue(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey && !isPending) {
            e.preventDefault();
            save();
        }
        if (e.key === "Escape") cancel();
    };

    const save = async () => {
        try {
            await onSave(editingValue);
        } catch (err) {
            console.error("Falha ao salvar:", err);
        }
    };

    const cancel = () => {
        setEditingValue(value);
        setIsEditing(false);
    };

    const Field = inputType === "textarea" ? Textarea : Input;

    if (isEditing) {
        return (
            <div
                className={cn(
                    "flex w-auto items-start rounded-md border border-input bg-background p-1 shadow-sm transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/40",
                    className
                )}
            >
                <Field
                    ref={inputRef}
                    value={editingValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    disabled={isPending}
                    placeholder={placeholder}
                    className="flex-1 resize-none overflow-hidden border-0 bg-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                />
                <div className={cn(inputType === "textarea" ? "flex flex-col items-end" : "flex items-center")}>
                    <IconButton
                        icon={<X className="h-4 w-4" />}
                        color="text-red-600 hover:text-red-800"
                        onClick={cancel}
                        disabled={isPending}
                    />
                    <IconButton
                        icon={isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                        color="text-green-600 hover:text-green-800"
                        onClick={save}
                        disabled={isPending}
                    />
                </div>
            </div>
        );
    }

    return (
        <div
            className={cn(
                "flex items-center gap-2",
                variant === "default" && "rounded-md border border-input bg-background shadow-sm text-sm text-muted-foreground",
                className
            )}
        >
      <span
          onClick={() => setIsEditing(true)}
          className={cn(
              "cursor-pointer text-left text-muted-foreground",
              inputType === "textarea" && "w-40 block overflow-hidden text-ellipsis whitespace-pre-wrap break-keep",
              variant === "default" && "flex-1 pl-1",
              variant === "minimal" && "truncate whitespace-nowrap text-card-foreground hover:underline py-1"
          )}
      >
        {variant === "minimal"
            ? truncateText(value || placeholder || "", 30)
            : value || placeholder}
      </span>

            <CopyText text={value} className="shrink-0" position="none" />

            {variant === "default" && (
                <IconButton
                    icon={<Pencil className="h-4 w-4" />}
                    color="text-gray-600 hover:text-gray-800"
                    onClick={() => setIsEditing(true)}
                    disabled={isPending}
                />
            )}
        </div>
    );
}

function IconButton({
                        icon,
                        color,
                        onClick,
                        disabled,
                    }: {
    icon: React.ReactNode;
    color: string;
    onClick: () => void;
    disabled?: boolean;
}) {
    return (
        <Button
            variant="ghost"
            size="icon"
            className={cn("h-9 w-8", color)}
            onClick={onClick}
            disabled={disabled}
        >
            {icon}
        </Button>
    );
}
