
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
  Phone,
  KeyRound,
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

type AccountType = "client" | "office";

type SignupForm = {
  fullName: string;
  email: string;
  phone: string;
  invitationCode: string;
  password: string;
  confirmPassword: string;
};

const initialForm: SignupForm = {
  fullName: "",
  email: "",
  phone: "",
  invitationCode: "",
  password: "",
  confirmPassword: "",
};

export default function Signup() {
  const [accountType, setAccountType] =
    useState<AccountType>("client");

  const [form, setForm] = useState<SignupForm>(initialForm);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateField = (
    field: keyof SignupForm,
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (accountType === "office" && !form.invitationCode.trim()) {
      toast.error("An office invitation code is required.");
      return;
    }

    if (!acceptedTerms) {
      toast.error("Please accept the terms and conditions.");
      return;
    }

    setLoading(true);

    try {
      const endpoint =
        accountType === "client"
          ? "/api/auth/register/client"
          : "/api/auth/register/office/invite";

      const payload =
        accountType === "client"
          ? {
              fullName: form.fullName,
              email: form.email,
              phone: form.phone,
              password: form.password,
              role: "external_client",
            }
          : {
              fullName: form.fullName,
              email: form.email,
              password: form.password,
              invitationCode: form.invitationCode,
            };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to create your account."
        );
      }

      toast.success(
        accountType === "client"
          ? "Client account created successfully!"
          : "Office account created successfully!"
      );

      setForm(initialForm);
      setAcceptedTerms(false);

    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background lg:grid lg:grid-cols-2">

      {/* LEFT BRANDING PANEL */}
      <section className="sticky top-0 hidden h-screen flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground lg:flex xl:p-14">

        <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 size-96 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl border border-white/20 bg-white/10">
            <FileCheck2 className="size-6" />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight">
              DocuQR
            </h1>
            <p className="text-xs text-slate-400">
              Document Tracking System
            </p>
          </div>
        </div>

        <div className="relative z-10 max-w-xl">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-300">
            <ShieldCheck className="size-4" />
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
            Submit, receive, and track official documents
            through a centralized document management system.
          </p>

          <div className="mt-10 space-y-5">
            {[
              "Secure external client submissions",
              "Department-based document access",
              "Centralized document tracking",
              "QR-based receipt verification",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <FileCheck2 className="size-3.5" />
                </div>
                <span className="text-sm text-slate-300">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between gap-4 text-xs text-slate-500">
          <span>© {new Date().getFullYear()} DocuQR</span>
          <span className="flex items-center gap-1.5">
            <LockKeyhole className="size-3.5" />
            Secure access
          </span>
        </div>
      </section>

      {/* RIGHT SIGNUP PANEL */}
      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-16">

        <div className="w-full max-w-md">

          {/* MOBILE BRANDING */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex size-11 items-center justify-center rounded-xl bg-slate-950 text-white">
              <FileCheck2 className="size-6" />
            </div>

            <div>
              <h1 className="font-bold tracking-tight">
                DocuQR
              </h1>
              <p className="text-xs text-muted-foreground">
                Document Tracking System
              </p>
            </div>
          </div>

          {/* HEADING */}
          <div className="mb-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" />
              Account Registration
            </div>

            <h2 className="text-3xl font-bold tracking-tight">
              Create your account
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Select the type of account you want to register.
            </p>
          </div>

          {/* ACCOUNT TYPE SELECTOR */}
          <div className="mb-5 grid grid-cols-2 gap-3">

            <button
              type="button"
              onClick={() => {
                setAccountType("client");
                setForm(initialForm);
              }}
              className={`rounded-xl border p-4 text-left transition-all ${
                accountType === "client"
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "hover:border-primary/50"
              }`}
            >
              <UserRound className="mb-3 size-6 text-primary" />

              <h3 className="text-sm font-semibold">
                External Client
              </h3>

              <p className="mt-1 text-xs text-muted-foreground">
                Public registration
              </p>
            </button>

            <button
              type="button"
              onClick={() => {
                setAccountType("office");
                setForm(initialForm);
              }}
              className={`rounded-xl border p-4 text-left transition-all ${
                accountType === "office"
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "hover:border-primary/50"
              }`}
            >
              <Building2 className="mb-3 size-6 text-primary" />

              <h3 className="text-sm font-semibold">
                Office Account
              </h3>

              <p className="mt-1 text-xs text-muted-foreground">
                Invitation required
              </p>
            </button>

          </div>

          {/* REGISTRATION CARD */}
          <Card className="border-border/70 shadow-sm">

            <CardHeader className="space-y-1">
              <CardTitle className="text-lg">
                {accountType === "client"
                  ? "External Client Registration"
                  : "Office Account Registration"}
              </CardTitle>

              <CardDescription>
                {accountType === "client"
                  ? "Register to submit and track your documents."
                  : "Enter your invitation details to activate your office account."}
              </CardDescription>
            </CardHeader>

            <CardContent>

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* FULL NAME */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    Full name
                  </Label>

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

                {/* EMAIL */}
                <div className="space-y-2">
                  <Label htmlFor="email">
                    {accountType === "client"
                      ? "Email address"
                      : "Official email address"}
                  </Label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder={
                        accountType === "client"
                          ? "Enter your email address"
                          : "name@agency.gov.ph"
                      }
                      className="h-11 pl-9"
                      value={form.email}
                      onChange={(e) =>
                        updateField("email", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                {/* CLIENT PHONE */}
                {accountType === "client" && (
                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Contact Number
                    </Label>

                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="09XX XXX XXXX"
                        className="h-11 pl-9"
                        value={form.phone}
                        onChange={(e) =>
                          updateField("phone", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                )}

                {/* OFFICE INVITATION */}
                {accountType === "office" && (
                  <div className="space-y-2">
                    <Label htmlFor="invitationCode">
                      Office Invitation Code
                    </Label>

                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                      <Input
                        id="invitationCode"
                        placeholder="Enter your invitation code"
                        className="h-11 pl-9"
                        value={form.invitationCode}
                        onChange={(e) =>
                          updateField(
                            "invitationCode",
                            e.target.value
                          )
                        }
                        required
                      />
                    </div>

                    <p className="text-xs leading-5 text-muted-foreground">
                      Office accounts can only be created using
                      a valid invitation issued by an authorized
                      administrator.
                    </p>
                  </div>
                )}

                {/* PASSWORD */}
                <div className="space-y-2">
                  <Label htmlFor="password">
                    Password
                  </Label>

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
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
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

                {/* CONFIRM PASSWORD */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Confirm password
                  </Label>

                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={
                        showConfirmPassword ? "text" : "password"
                      }
                      autoComplete="new-password"
                      placeholder="Re-enter your password"
                      className="h-11 pr-10"
                      value={form.confirmPassword}
                      onChange={(e) =>
                        updateField(
                          "confirmPassword",
                          e.target.value
                        )
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

                {/* TERMS */}
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
                    I agree to the agency's terms of use and
                    document handling policies.
                  </Label>
                </div>

                {/* SUBMIT */}
                <Button
                  type="submit"
                  className="h-11 w-full bg-slate-950 font-semibold text-white hover:bg-slate-800"
                  disabled={loading}
                >
                  {loading ? (
                    "Processing..."
                  ) : (
                    <>
                      {accountType === "client"
                        ? "Create Client Account"
                        : "Register Office Account"}

                      <ArrowRight className="ml-2 size-4" />
                    </>
                  )}
                </Button>

              </form>

              {/* LOGIN LINK */}
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
            {accountType === "client"
              ? "External client accounts are intended for document submission and tracking."
              : "Office account registration is restricted to authorized invitees."}
          </p>

        </div>
      </section>
    </main>
  );
}
