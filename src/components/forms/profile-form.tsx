'use client'
import React, { useState , useEffect} from 'react'
import { Form, useForm } from 'react-hook-form'
import { z } from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { EditUserProfileSchema } from '@/lib/types'
import { FormControl, FormField, FormItem, FormLabel, FormMessage, } from '../ui/form'
import { Button } from '../ui/button'
import { Loader2, User } from 'lucide-react'
import { FormProvider } from 'react-hook-form';
import { Input } from '../ui/input'
import { currentUser } from '@clerk/nextjs/server'


type Props = {
  user: any
  onUpdate?: any
}

const ProfileForm = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof EditUserProfileSchema>>({
    mode: 'onChange',
    resolver: zodResolver(EditUserProfileSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })
  const handleSubmit = async (
    values: z.infer<typeof EditUserProfileSchema>
    ) => {
      setIsLoading (true)
      await onUpdate(values. name)
      setIsLoading (false)
    }
    useEffect ( () => {
    form.reset({ name: '', email: '' })
    },[User] )

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          disabled={isLoading}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">User full name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Name"
                  
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={true}
                  placeholder="Email"
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="self-start hover:bg-[#2F006B] hover:text-white "
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving
            </>
          ) : (
            'Save User Settings'
          )}
        </Button>
      </form>
    </FormProvider>
)
  
}
export default ProfileForm

function onUpdate(name: string) {
  throw new Error('Function not implemented.')
}
