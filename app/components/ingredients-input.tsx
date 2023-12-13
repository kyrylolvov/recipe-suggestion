'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { getRecipe } from '~/api/ingredients';
import { Button } from '~/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/ui/form';
import { Textarea } from '~/ui/textarea';

const IngredientsSchema = z.object({
  ingredients: z.string().trim().min(1, { message: 'Please, enter list of ingredients' }),
});

export default function IngredientsInput() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: getRecipe,
    onSuccess: (data) => queryClient.setQueryData(['recipe'], data.data),
  });

  const form = useForm<z.infer<typeof IngredientsSchema>>({
    resolver: zodResolver(IngredientsSchema),
    defaultValues: { ingredients: '' },
  });

  const onSubmit = (data: z.infer<typeof IngredientsSchema>) => {
    const { ingredients } = data;

    queryClient.setQueryData(['recipe'], '');
    mutateAsync(ingredients);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4" noValidate>
        <FormField
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Enter ingredients, separated by commas..." className="resize-none" {...field} />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" className="mt-3 w-[156px]" size="sm" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? 'Loading...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
