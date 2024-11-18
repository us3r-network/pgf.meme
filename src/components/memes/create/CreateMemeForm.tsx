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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PGF_CONTRACT_CHAIN, PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";
import { usePGFFactoryContractLaunch } from "@/hooks/contract/usePGFFactoryContract";
import useLoadTopics from "@/hooks/topic/useLoadTopics";
import { toast } from "@/hooks/use-toast";
import { PGFToken } from "@/services/contract/types";
import { postMeme } from "@/services/meme/api";
import { TopicData } from "@/services/topic/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Address } from "viem";
import { z } from "zod";
import OnChainActionButtonWarper from "../trade/OnChainActionButtonWarper";
import { useSound } from "use-sound";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Meme coin name must be at least 2 characters.",
  }),
  symbol: z.string().min(2, {
    message: "Meme coin symbol must be at least 2 characters.",
  }),
  imageFile: z
    .instanceof(File)
    .refine((file) => file.size !== 0, "Please upload an image"),
  description: z.string().min(20, {
    message: "Meme coin description must be at least 20 characters.",
  }),
  topicId: z.number().optional(),
});

export function CreateMemeForm({onSuccess}:{onSuccess?: (transactionReceipt: any) => void;}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      symbol: "",
      imageFile: new File([""], "filename"),
      description: "",
      topicId: undefined,
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
  const [play] = useSound("/audio/V.mp3");
  let newToken = useRef<PGFToken>();
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log("create token submit", data);
    newToken.current = {
      contractAddress: "0x",
      chainId: PGF_CONTRACT_CHAIN_ID,
      ...data,
    };
    play();
    launch(data.name, data.symbol);
  };

  useEffect(() => {
    // console.log("isSuccess", isSuccess, transactionReceipt, newToken.current);
    if (isSuccess && transactionReceipt && newToken.current) {
      newToken.current.contractAddress = transactionReceipt.logs[0]
        .address as Address;
      // console.log(newToken);
      postMeme(newToken.current);
      console.log("Launch token successful!", transactionReceipt);
      onSuccess?.(transactionReceipt);
      toast({
        title: "Launch Token",
        description: (
          <pre className="m-2 w-80 p-4">
            <p>Launch token successful!</p>
            {PGF_CONTRACT_CHAIN?.blockExplorers && (
              <p>
                <a
                  href={`${PGF_CONTRACT_CHAIN.blockExplorers.default.url}/tx/${transactionReceipt.transactionHash}`}
                  target="_blank"
                >
                  View Detail
                </a>
              </p>
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
        description: <pre className="m-2 w-80 p-4">Launch token failed!</pre>,
      });
    }
  }, [writeError, transationError]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-col gap-4">
              <FormLabel>Meme coin</FormLabel>
              <FormControl>
                <Input placeholder="Enter your meme coin’s name" {...field} />
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
              <FormLabel>Meme coin symbol</FormLabel>
              <FormControl>
                <Input placeholder="Enter your meme coin’s symbol" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageFile"
          render={({ field }) => (
            <FormItem className="flex-col gap-4">
              <FormLabel>Image</FormLabel>
              <FormControl>
                {/* <Input placeholder="Enter the image uri" {...field} /> */}
                <UploadImage
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                />
              </FormControl>
              <FormDescription>
                <p>
                  Accepted formats are PNG, JPG, or GIF, maximum file size is
                  5MB.
                </p>
                <p>
                  Recommended image dimensions are 800x800px for best display
                  quality.
                </p>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex-col gap-4">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add a short description for your meme coin"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topicId"
          render={({ field }) => (
            <FormItem className="flex-col gap-4">
              <FormLabel>Topic</FormLabel>
              <FormControl>
                <SelectMemeTopic
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormDescription className="text-center text-base">
          <p>* Transaction fees:pgf (1%), Vitalik (15%), Charity Pool (5%).</p>
          <p>* Your meme coin can be purchased across multiple blockchains.</p>
        </FormDescription>
        <OnChainActionButtonWarper
          className="w-full"
          size="lg"
          targetChainId={PGF_CONTRACT_CHAIN_ID}
          warpedButton={
            <Button
              type="submit"
              size="lg"
              disabled={isPending}
              className="w-full"
            >
              {isPending ? "Creating..." : "Create"}
            </Button>
          }
        />
      </form>
    </Form>
  );
}

function SelectMemeTopic({
  defaultValue,
  onValueChange,
}: {
  defaultValue?: number;
  onValueChange: (value: number) => void;
}) {
  const { loading, items: topics, loadItems } = useLoadTopics();
  useEffect(() => {
    loadItems();
  }, []);
  // console.log("topics", topics);
  const [selectedTopic, setSelectedTopic] = useState<TopicData>();
  useEffect(() => {
    // console.log("selectValue", selectedTopic, topics);
    if (selectedTopic) {
      onValueChange(selectedTopic.id);
    }
  }, [selectedTopic]);
  return (
    <Select
      onValueChange={(value) => {
        const t = topics.find((topic) => topic.id.toString() === value);
        setSelectedTopic(t);
      }}
      value={selectedTopic?.name}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select Topic" />
      </SelectTrigger>
      <SelectContent>
        {topics.map((topic) => (
          <SelectItem value={topic.id.toString()}>{topic.name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function UploadImage({
  defaultValue,
  onValueChange,
}: {
  defaultValue?: File;
  onValueChange: (value: File) => void;
}) {
  const [selectedImage, setSelectedImage] = useState<string>();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
        onValueChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-row gap-4">
      <Input
        id="meme-image"
        type="file"
        accept="image/*"
        placeholder="Accepted formats are PNG, JPG, or GIF, maximum file size is 5MB"
        onChange={handleImageChange}
        className="cursor-pointer"
      />
      {selectedImage && (
        <img
          src={selectedImage}
          alt="Selected meme"
          className="size-12 rounded-md object-contain"
        />
      )}
    </div>
  );
}
