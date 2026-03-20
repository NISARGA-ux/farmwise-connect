import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [village, setVillage] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [landSize, setLandSize] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          otp,
          village,
          district,
          state,
          landSize,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Login failed");
      }

      toast({
        title: "Welcome back",
        description: `Hello ${data?.user?.name || "Farmer"}, your dashboard is ready.`,
      });

      navigate("/dashboard");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to login right now";
      toast({
        title: "Login failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px circle at 10% 10%, hsl(var(--sun)) 0%, hsl(var(--cream)) 40%, hsl(var(--background)) 70%)",
        }}
      />
      <div className="container py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary shadow-soft">
              OTP login for verified farmers
            </div>
            <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl">
              Sign in to KrishiMitra and track every acre with clarity
            </h1>
            <p className="max-w-xl text-base text-muted-foreground md:text-lg">
              Use your phone number and the demo OTP to access your personalized dashboard, crop
              schedules, and market insights in minutes.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="card-gradient shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Fast OTP login</CardTitle>
                  <CardDescription>Use 1234 as the demo OTP</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Secure access without remembering passwords.
                </CardContent>
              </Card>
              <Card className="glass-card shadow-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Localized profile</CardTitle>
                  <CardDescription>Share optional farm details</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  Get smarter crop suggestions tailored to your region.
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Enter your phone number and OTP to continue.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="Enter 10 digit number"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="otp">OTP</Label>
                  <Input
                    id="otp"
                    type="password"
                    inputMode="numeric"
                    placeholder="Enter OTP (1234)"
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                    required
                  />
                </div>

                <div className="rounded-lg border border-border/60 bg-muted/40 p-4 space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Optional profile details</p>
                    <p className="text-xs text-muted-foreground">Helps us personalize your dashboard.</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Farmer name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="village">Village</Label>
                      <Input
                        id="village"
                        type="text"
                        placeholder="Village"
                        value={village}
                        onChange={(event) => setVillage(event.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district">District</Label>
                      <Input
                        id="district"
                        type="text"
                        placeholder="District"
                        value={district}
                        onChange={(event) => setDistrict(event.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        type="text"
                        placeholder="State"
                        value={state}
                        onChange={(event) => setState(event.target.value)}
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="landSize">Land Size</Label>
                      <Input
                        id="landSize"
                        type="text"
                        placeholder="e.g. 3 acres"
                        value={landSize}
                        onChange={(event) => setLandSize(event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
                <p className="text-xs text-muted-foreground">
                  By continuing you agree to receive OTP messages for authentication.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Login;
