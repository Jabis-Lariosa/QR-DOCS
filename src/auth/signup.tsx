
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Building2,
  Eye,
  EyeOff,
  FileCheck2,
  LockKeyhole,
  Mail,
  UserRound,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type SignupForm = {
  fullName: string;
  email: string;
  department: string;
  password: string;
  confirmPassword: string;
};

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<SignupForm>({
    fullName: "",
    email: "",
    department: "",
    password: "",
    confirmPassword: "",
  });

  const updateField = (field: keyof SignupForm, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      toast.error("Please accept the terms and conditions.");
      return;
    }

    setLoading(true);

    try {
      // Demo only: connect your registration API here.
      await new Promise((resolve) => setTimeout(resolve, 600));

      toast.info(
        "Signup form validated. Connect your registration API to continue."
      );
    } catch {
      toast.error("Unable to create your account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background lg:grid lg:grid-cols-2">
      {/* Left branding panel */}
      <section className="sticky top-0 hidden h-screen flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex xl:p-14">
        {/* Decorative background elements */}
        <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 size-96 rounded-full bg-white/5 blur-3xl" />

        {/* Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl border border-white/20 bg-white/10">
            <FileCheck2 className="size-6" />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight">Jan Red</h1>
            <p className="text-xs text-slate-400">
              Document Tracking System ni Jan Red
            </p>
          </div>
        </div>

        {/* Branding content */}
        <div className="relative z-10 max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-300 backdrop-blur">
            <ShieldCheck className="size-4 text-grey-400" />
            Secure document coordination
          </div>

          <h2 className="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
            Every document.
            <br />
            Every department.
            <br />
            One platform.
          </h2>

          <p className="mt-6 max-w-md text-base leading-7 text-slate-400">
            Send, receive, and track official documents between departments
            with organized records and QR-based receipt verification.
          </p>

          <div className="mt-10 space-y-5">
            {[
              "Department-based document access",
              "Centralized sending and receiving records",
              "QR-based document receipt verification",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-grey-500/15 text-grey-400">
                  <FileCheck2 className="size-3.5" />
                </div>
                <span className="text-sm text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between gap-4 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} DocuQR</span>
          <span className="flex items-center gap-1.5">
            <LockKeyhole className="size-3.5" />
            Secure access
          </span>
        </div>
      </section>

      {/* Right signup panel */}
      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-16">
        <div className="w-full max-w-md">
          {/* Mobile branding */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex size-11 items-center justify-center rounded-xl bg-slate-950 text-white">
              <FileCheck2 className="size-6" />
            </div>

            <div>
              <h1 className="font-bold tracking-tight">DocuQR</h1>
              <p className="text-xs text-muted-foreground">
                Document Tracking System
              </p>
            </div>
          </div>

          <div className="mb-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" />
              Registration
            </div>

            <h2 className="text-3xl font-bold tracking-tight">
              Join your department
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Create your account to access your department's document
              management workspace.
            </p>
          </div>

          <Card className="border-border/70 shadow-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-lg">Create an account</CardTitle>
              <CardDescription>
                Enter your details below to get started.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <div className="relative">
                    <UserRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="fullName"
                      autoComplete="name"
                      placeholder="Enter your full name"
                      className="h-11 pl-9"
                      value={form.fullName}
                      onChange={(e) =>
                        updateField("fullName", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Official email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="name@agency.gov.ph"
                      className="h-11 pl-9"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Department */}
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <select
                      id="department"
                      className="flex h-11 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"
                      value={form.department}
                      onChange={(e) =>
                        updateField("department", e.target.value)
                      }
                      required
                    >
                      <option value="" disabled>
                        Select your department
                      </option>
                      <option value="administration">Administration</option>
                      <option value="finance">Finance</option>
                      <option value="human-resources">Human Resources</option>
                      <option value="records">Records Management</option>
                      <option value="planning">Planning and Development</option>
                      <option value="other">Other Department</option>
                    </select>
                  </div>
                  <p className="text-xs leading-5 text-muted-foreground">
                    Access should be restricted to documents authorized for
                    your department.
                  </p>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="At least 8 characters"
                      className="h-11 pr-10"
                      value={form.password}
                      onChange={(e) =>
                        updateField("password", e.target.value)
                      }
                      minLength={8}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Re-enter your password"
                      className="h-11 pr-10"
                      value={form.confirmPassword}
                      onChange={(e) =>
                        updateField("confirmPassword", e.target.value)
                      }
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3 pt-1">
                  <Checkbox
                    id="terms"
                    checked={acceptedTerms}
                    onCheckedChange={(checked) =>
                      setAcceptedTerms(checked === true)
                    }
                    className="mt-0.5"
                  />
                  <Label
                    htmlFor="terms"
                    className="cursor-pointer text-sm font-normal leading-5 text-muted-foreground"
                  >
                    I agree to the agency's terms of use and document
                    handling policies.
                  </Label>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="h-11 w-full bg-slate-950 font-semibold text-white hover:bg-slate-800"
                  disabled={loading}
                >
                  {loading ? (
                    "Processing..."
                  ) : (
                    <>
                      Create account
                      <ArrowRight className="ml-2 size-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 border-t pt-5">
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          <p className="mt-5 text-center text-xs leading-5 text-muted-foreground">
            Access is subject to your agency's account and authorization
            policies.
          </p>
        </div>
      </section>
    </main>
  );
}
