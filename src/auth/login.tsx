
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  LoaderCircle,
  LockKeyhole,
  Mail,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      // Demo only: replace with your authentication API.
      await new Promise((resolve) => setTimeout(resolve, 800));

      toast.success("Login successful!");
      navigate("/dashboard", { replace: true });
    } catch {
      toast.error("Unable to sign in. Please try again.");
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
            <LockKeyhole className="size-5" />
          </div>

          <span className="text-lg font-semibold tracking-tight">
            Project ni Jan Red
          </span>
        </div>

        {/* Main branding content */}
        <div className="relative z-10 max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium backdrop-blur">
            <ShieldCheck className="size-4" />
            Secure access portal
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
            Everything you need,
            <br />
            all in one place.
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-primary-foreground/75">
            Welcome to your workspace. Sign in to access your dashboard,
            manage your activities, and keep everything organized.
          </p>

          <div className="mt-10 flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="flex size-9 items-center justify-center rounded-full border-2 border-primary bg-white/20 text-xs font-semibold">
                J
              </div>
              <div className="flex size-9 items-center justify-center rounded-full border-2 border-primary bg-white/30 text-xs font-semibold">
                R
              </div>
              <div className="flex size-9 items-center justify-center rounded-full border-2 border-primary bg-white/40 text-xs font-semibold">
                +
              </div>
            </div>

            <p className="text-sm text-primary-foreground/75">
              Your workspace, ready when you are.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-primary-foreground/60">
          <span>© {new Date().getFullYear()} Project ni Jan Red</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5" />
            Protected sign-in
          </span>
        </div>
      </section>

      {/* Right login panel */}
      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-20">
        <div className="w-full max-w-md">
          {/* Mobile branding */}
          <div className="mb-10 flex items-center gap-3 lg:hidden">
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <LockKeyhole className="size-5" />
            </div>

            <div>
              <h1 className="font-bold tracking-tight">
                Project ni Jan Red
              </h1>
              <p className="text-xs text-muted-foreground">
                Secure access portal
              </p>
            </div>
          </div>

          <div className="mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary" />
              Welcome back
            </div>

            <h2 className="text-3xl font-bold tracking-tight">
              Sign in to your account
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Enter your credentials below to access your workspace.
            </p>
          </div>

          <Card className="border-border/70 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Sign in</CardTitle>
            </CardHeader>

            <form onSubmit={handleLogin}>
              <CardContent className="space-y-5">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="h-11 pl-9"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>

                    <button
                      type="button"
                      className="text-xs font-medium text-primary hover:underline"
                      onClick={() =>
                        toast.info("Password reset", {
                          description:
                            "Connect your password recovery flow here.",
                        })
                      }
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="h-11 pl-9 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    <button
                      type="button"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) =>
                        setRememberMe(checked === true)
                      }
                    />

                    <Label
                      htmlFor="remember"
                      className="cursor-pointer text-sm font-normal text-muted-foreground"
                    >
                      Remember me
                    </Label>
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="h-11 w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <LoaderCircle className="mr-2 size-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowUpRight className="ml-2 size-4" />
                    </>
                  )}
                </Button>
              </CardContent>
            </form>

            <CardFooter className="justify-center border-t px-6 py-4">
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </Card>

          <div className="mt-5 rounded-xl border border-border/70 bg-muted/30 p-4">
            <p className="text-sm font-semibold">Online submission</p>
            <p className="mt-1 text-sm leading-5 text-muted-foreground">
              Submit a document online without creating an account.
            </p>
            <Button asChild variant="outline" className="mt-3 w-full">
              <Link to="/guest-online">
                Open online submission
                <ArrowUpRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>

          <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
            By signing in, you agree to follow your organization's
            access and security policies.
          </p>
        </div>
      </section>
    </main>
  );
}
