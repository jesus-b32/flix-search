import Link from "next/link";

// shadcn ui components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { LoginSchema } from "@/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <LoginForm />
    // <div className="flex min-h-screen items-center">
    //   <Card className="mx-auto max-w-sm">
    //     <CardHeader>
    //       <CardTitle className="text-2xl">Login</CardTitle>
    //       <CardDescription>
    //         Enter your email below to login to your account
    //       </CardDescription>
    //     </CardHeader>
    //     <CardContent>
    //       <div className="grid gap-4">
    //         <div className="grid gap-2">
    //           <Label htmlFor="email">Email</Label>
    //           <Input
    //             id="email"
    //             type="email"
    //             placeholder="m@example.com"
    //             required
    //           />
    //         </div>
    //         <div className="grid gap-2">
    //           <div className="flex items-center">
    //             <Label htmlFor="password">Password</Label>
    //             <Link
    //               href="#"
    //               className="ml-auto inline-block text-sm underline"
    //             >
    //               Forgot your password?
    //             </Link>
    //           </div>
    //           <Input id="password" type="password" required />
    //         </div>
    //         <Button type="submit" className="w-full">
    //           Login
    //         </Button>
    //         <Button variant="outline" className="w-full">
    //           Login with Google
    //         </Button>
    //       </div>
    //       <div className="mt-4 text-center text-sm">
    //         Don&apos;t have an account?{" "}
    //         <Link href="/signup" className="underline">
    //           Sign up
    //         </Link>
    //       </div>
    //     </CardContent>
    //   </Card>
    // </div>
  );
}
