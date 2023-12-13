'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '~/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '~/ui/form';
import { Textarea } from '~/ui/textarea';

const IngredientsSchema = z.object({
  ingredients: z.string().trim().min(1, { message: 'Please, enter list of ingredients' }),
});

export default function IngredientsInput() {
  const form = useForm<z.infer<typeof IngredientsSchema>>({
    resolver: zodResolver(IngredientsSchema),
    defaultValues: { ingredients: '' },
  });

  const onSubmit = (data: z.infer<typeof IngredientsSchema>) => {
    const { ingredients } = data;
    console.log(ingredients);
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
          <Button type="submit" className="mt-3 w-[156px]" size="sm">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
