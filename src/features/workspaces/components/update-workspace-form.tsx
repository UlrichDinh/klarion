'use client';

import { z } from 'zod';
import Image from 'next/image';
import { ArrowLeftIcon, ImageIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { DottedSeparator } from '@/components/dotted-separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { updateWorkspaceSchema } from '../schemas';
import { WorkspaceType } from '../types';
import { useUpdateWorkspace } from '../api/use-update-workspace';
import { useConfirm } from '@/features/workspaces/hooks/use-confirm';
import { useDeleteWorkspace } from '../api/use-delete-workspace';

interface UpdateWorkspaceFormProps {
  onCancel?: () => void;
  initialValues: WorkspaceType;
}

export const UpdateWorkspaceForm = ({
  onCancel,
  initialValues,
}: UpdateWorkspaceFormProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const router = useRouter();
  const { mutate, isPending } = useUpdateWorkspace();
  const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } =
    useDeleteWorkspace();

  const [DeleteDialog, confirmDelete] = useConfirm(
    'Delete Workspace',
    'This action cannot be undone.',
    'destructive'
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
    resolver: zodResolver(updateWorkspaceSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? '',
    },
  });

  const handleDelete = async () => {
    const ok = await confirmDelete();

    if (!ok) return;

    deleteWorkspace(
      { param: { workspaceId: initialValues.$id } },
      {
        onSuccess: () => {
          window.location.href = '/';
        },
      }
    );
  };

  const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
    const finalValues = {
      ...values,
      image: values.image instanceof File ? values.image : '',
    };

    mutate({ form: finalValues, param: { workspaceId: initialValues.$id } });
  };

  // When a file is selected, update the form value.
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('image', file);
    }
    // Reset input value to allow re-selecting the same file.
    e.target.value = '';
  };

  // Trigger file selection when the preview or placeholder is clicked.
  const handlePlaceholderClick = () => {
    inputRef.current?.click();
  };

  const imageField = form.watch('image');

  useEffect(() => {
    if (imageField instanceof File) {
      const url = URL.createObjectURL(imageField);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (typeof imageField === 'string') {
      setPreviewUrl(imageField);
    } else {
      setPreviewUrl(null);
    }
  }, [imageField]);

  return (
    <div className="flex flex-col gap-y-4">
      <DeleteDialog />
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
          <Button
            size="sm"
            variant="secondary"
            onClick={
              onCancel
                ? onCancel
                : () => router.push(`/workspaces/${initialValues.$id}`)
            }
          >
            <ArrowLeftIcon className="size-4" />
            Back
          </Button>
          <CardTitle className="text-xl font-bold">
            {initialValues.name}
          </CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                  inputRef.current.value = '';
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
              <DottedSeparator className="py-7" />
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  size="lg"
                  variant="secondary"
                  onClick={onCancel}
                  disabled={isPending}
                  className={cn(!onCancel && 'invisible')}
                >
                  Cancel
                </Button>
                <Button type="submit" size="lg" disabled={isPending}>
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="w-full h-full border-none shadow-none">
        <CardContent className="p-7">
          <div className="flex flex-col">
            <h3 className="font-bold">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a workspace is a irreversible and will remove all
              associated data.
            </p>
            <DottedSeparator className="py-7" />
            <Button
              className="mt-6 w-fit ml-auto"
              size="sm"
              variant="destructive"
              type="button"
              disabled={isPending || isDeletingWorkspace}
              onClick={handleDelete}
            >
              Delete Workspace
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
