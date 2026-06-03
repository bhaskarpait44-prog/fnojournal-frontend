"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle2 } from "lucide-react";
import { signupSchema, SignupFormValues } from "@/lib/validations";

import { useUserStore } from "@/lib/stores/user-store";
import { apiClient } from "@/lib/api-client";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "monthly";
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { setProfile } = useUserStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { terms: false }
  });

  const passwordValue = watch("password", "");

  useEffect(() => {
    let strength = 0;
    if (passwordValue.length > 5) strength += 1;
    if (passwordValue.length > 7) strength += 1;
    if (/[A-Z]/.test(passwordValue)) strength += 1;
    if (/[0-9]/.test(passwordValue) && /[^A-Za-z0-9]/.test(passwordValue)) strength += 1;
    setPasswordStrength(strength);
  }, [passwordValue]);

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await apiClient('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ email: data.email, password: data.password, name: data.fullName, plan }),
      });
      
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Signup failed');
      
      setProfile(json.user);
      router.push("/app/dashboard");
    } catch (err: any) {
      setError(err.message || "An error occurred during signup.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-background border-border/50 shadow-2xl mt-12 mb-12">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight text-white">Create an account</CardTitle>
        <CardDescription className="text-muted-foreground">
          Start your 7-day free trial. No credit card required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {plan && (
          <div className="mb-6 p-3 rounded-lg border border-primary/30 bg-primary/10 flex justify-between items-center">
            <span className="text-sm text-slate-300">Selected Plan:</span>
            <span className="text-sm font-semibold text-primary capitalize">{plan}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-white">Full Name</Label>
            <Input 
              id="fullName" 
              placeholder="John Doe" 
              className="bg-slate-900 border-slate-800 text-white"
              {...register("fullName")}
            />
            {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="m@example.com" 
              className="bg-slate-900 border-slate-800 text-white"
              {...register("email")}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">Password</Label>
            <Input 
              id="password" 
              type="password" 
              className="bg-slate-900 border-slate-800 text-white"
              {...register("password")}
            />
            {passwordValue.length > 0 && (
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4].map((level) => (
                  <div 
                    key={level} 
                    className={`h-1 flex-1 rounded-full ${
                      passwordStrength >= level 
                        ? (passwordStrength < 3 ? 'bg-yellow-500' : 'bg-green-500') 
                        : 'bg-slate-800'
                    }`}
                  />
                ))}
              </div>
            )}
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
            <Input 
              id="confirmPassword" 
              type="password" 
              className="bg-slate-900 border-slate-800 text-white"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
          </div>

          <div className="flex items-center space-x-2 pt-2">
            <input 
              type="checkbox" 
              id="terms" 
              className="h-4 w-4 rounded border-slate-800 bg-slate-900 text-primary focus:ring-primary"
              {...register("terms")}
            />
            <Label htmlFor="terms" className="text-sm text-muted-foreground font-normal">
              I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            </Label>
          </div>
          {errors.terms && <p className="text-sm text-red-500 mt-1">{errors.terms.message}</p>}
          
          {error && <div className="p-3 rounded-md bg-red-500/10 border border-red-500/50 text-sm text-red-500">{error}</div>}

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-4" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create account"}
          </Button>
        </form>
        
      </CardContent>
      <CardFooter className="flex justify-center text-center">
        <div className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Login
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}