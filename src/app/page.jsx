"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useGlobalContext } from "@/context/GlobalContext";

const formSchema = z.object({
  image: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  fatherName: z.string().min(2, "Father's name must be at least 2 characters"),
  motherName: z.string().min(2, "Mother's name must be at least 2 characters"),
  address : z.string().min(2, "address must be at least 2 characters"),
  mobileNumber1: z.string().min(10, "Mobile number must be 10 digits"),
  mobileNumber2: z.string().min(10, "Mobile number must be 10 digits"),
});

export default function Home() {

  // const { setFormData } = useGlobalContext();

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: "",
      name: "",
      fatherName: "",
      address: "",
      motherName: "",
      mobileNumber1: "",
      mobileNumber2: "",
    },
  });

  const onSubmit = (values) => {
    // setFormData(values)
    localStorage.setItem("cardData", JSON.stringify(values))
    router.push(`/preview`);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        form.setValue("image", reader.result);
      };
      reader.readAsDataURL(file);
    }

  };
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>ID Card Generator</CardTitle>
          <CardDescription>Fill in the details to generate your ID card</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="cursor-pointer"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fatherName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Father's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter father's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="motherName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mother's Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter mother's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobileNumber1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number 1</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Enter mobile number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobileNumber2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number 2</FormLabel>
                    <Input type="tel" placeholder="Enter alternate mobile number" {...field} />
                    <FormControl>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">Generate ID Card</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
