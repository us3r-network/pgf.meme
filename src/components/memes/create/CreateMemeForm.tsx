"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PGF_CONTRACT_CHAIN } from "@/constants/pgf";
import { usePGFFactoryContractLaunch } from "@/hooks/contract/usePGFFactoryContract";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Meme coin name must be at least 2 characters.",
  }),
  symbol: z.string().min(2, {
    message: "Meme coin symbol must be at least 2 characters.",
  }),
  imageUri: z.string().url({
    message: "Meme coin image must be a valid uri.",
  }),
  description: z.string().min(20, {
    message: "Meme coin description must be at least 20 characters.",
  }),
});

export function CreateMemeForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      symbol: "",
      imageUri: "",
      description: "",
    },
  });

  const {
    launch,
    transactionReceipt,
    status,
    writeError,
    transationError,
    isPending,
    isSuccess,
  } = usePGFFactoryContractLaunch();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log("create token submit", data);
    launch(data.name, data.symbol);
  };

  useEffect(() => {
    if (isSuccess && transactionReceipt) {
      toast({
        title: "Token launch",
        description: (
          <pre className="mt-2 w-[340px] p-4">
            Launch token successful!
            {PGF_CONTRACT_CHAIN?.blockExplorers && (
              <a
                className="text-white"
                href={`${PGF_CONTRACT_CHAIN.blockExplorers.default.url}${transactionReceipt.transactionHash}`}
              >
                View Detail
              </a>
            )}
          </pre>
        ),
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (writeError || transationError) {
      console.log("Launch token failed", writeError, transationError);
      toast({
        title: "Token launch",
        variant: "destructive",
        description: (
          <pre className="mt-2 w-[340px] p-4">
            Launch token failed!
          </pre>
        ),
      });
    }
  }, [writeError, transationError]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-col gap-4">
              <FormLabel className="text-[#16181d] text-2xl">
                Meme coin
              </FormLabel>
              <FormControl>
                <Input
                  className="h-12 px-8 rounded-xl border border-[#16181d] text-[#626976] text-base font-normal leading-snug"
                  placeholder="Enter your meme coin’s name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="symbol"
          render={({ field }) => (
            <FormItem className="flex-col gap-4">
              <FormLabel className="text-[#16181d] text-2xl">
                Meme coin symbol
              </FormLabel>
              <FormControl>
                <Input
                  className="h-12 px-8 rounded-xl border border-[#16181d] text-[#626976] text-base font-normal leading-snug"
                  placeholder="Enter your meme coin’s symbol"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUri"
          render={({ field }) => (
            <FormItem className="flex-col gap-4">
              <FormLabel className="text-[#16181d] text-2xl">Image</FormLabel>
              <FormControl>
                <Input
                  className="h-12 px-8 rounded-xl border border-[#16181d] text-[#626976] text-base font-normal leading-snug"
                  placeholder="Enter the image uri"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex-col gap-4">
              <FormLabel className="text-[#16181d] text-2xl">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  className="h-12 px-8 rounded-xl border border-[#16181d] text-[#626976] text-base font-normal leading-snug"
                  placeholder="Add a short description for your meme coin"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="self-stretch h-[68px] flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch text-center text-[#16181d] text-base font-normal leading-snug">
            *Transaction fees:pgf (1%), Vitalik (15%), Charity Pool (5%).
          </div>
          <div className="self-stretch h-[22px] flex-col justify-start items-start gap-4 flex">
            <div className="self-stretch text-center text-[#16181d] text-base font-normal leading-snug">
              *Your meme coin can be purchased across multiple blockchains.
            </div>
          </div>
        </div>
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-12 bg-[#16181d] rounded-[30px] justify-center items-center gap-2.5 flex"
        >
          <div className="text-[#fefaf6] text-xl font-bold">Create & Share</div>
        </Button>
        <FormDescription className="self-stretch text-center text-[#626976] text-base font-normal">
          Share your meme coin link to earn 4% commission on every trade through
          your referral.
        </FormDescription>
      </form>
    </Form>
  );
}
