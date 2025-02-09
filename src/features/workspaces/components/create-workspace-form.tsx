"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createWorkspaceSchema } from "@/features/workspaces/schemas";
import { useCreateWorkspace } from "@/features/workspaces/server/api/use-create-workspace";
import { useRouter } from "next/navigation";

type CreateWorkspaceFormProps = {
  onCancel?: () => void;
}

export const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProps) => {
  const router = useRouter();
  const { mutate, isPending } = useCreateWorkspace();
  const inputRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof createWorkspaceSchema>>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof createWorkspaceSchema>) => {
    mutate({ form: values }, {
      onSuccess: ({ data }) => {
        form.reset();
        router.push(`/workspaces/${data.id}`);
      },
    });
  };

  // When a file is selected, update the form value.
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
    }
    // Reset input value to allow re-selecting the same file.
    e.target.value = "";
  };

  // Trigger file selection when the preview or placeholder is clicked.
  const handlePlaceholderClick = () => {
    inputRef.current?.click();
  };

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const imageField = form.watch("image");

  useEffect(() => {
    if (imageField instanceof File) {
      const url = URL.createObjectURL(imageField);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    else if (typeof imageField === "string") {
      setPreviewUrl(imageField);
    }
    else {
      setPreviewUrl(null);
    }
  }, [imageField]);

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Create a new workspace
        </CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Workspace Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter workspace name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <div className="flex flex-col gap-y-2">
                    <div className="flex items-center gap-x-5">
                      <div
                        onClick={handlePlaceholderClick}
                        className="relative w-[72px] h-[72px] cursor-pointer rounded-md overflow-hidden"
                      >
                        {previewUrl ? (
                          <Image
                            src={previewUrl}
                            alt="Workspace Icon"
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-full h-full bg-gray-200">
                            <ImageIcon className="w-9 h-9 text-neutral-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm">Workspace Icon</p>
                        <p className="text-sm text-muted-foreground">
                          JPG, PNG, SVG or JPEG, max 1MB
                        </p>
                        <input
                          type="file"
                          accept=".jpg, .png, .jpeg, .svg"
                          ref={inputRef}
                          onChange={handleImageChange}
                          disabled={isPending}
                          className="hidden"
                        />
                        {previewUrl ? (
                          <Button
                            variant="destructive"
                            type="button"
                            disabled={isPending}
                            size="xs"
                            className="w-fit mt-2"
                            onClick={() => {
                              field.onChange(null);
                              if (inputRef.current) {
                                inputRef.current.value = "";
                              }
                            }}
                          >
                            Remove
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )}
              />
            </div>
            <DottedSeparator className="py-8" />
            <div className="flex items-center justify-between">
              <Button
                type="button"
                size="lg"
                variant="secondary"
                onClick={onCancel}
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button type="submit" size="lg" disabled={isPending}>
                Create Workspace
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
