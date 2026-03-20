import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Edit,
  Plus,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Dashboard = () => {
  const navigate = useNavigate();
  /* ---------------- DATA STATE ---------------- */
  const [user, setUser] = useState<any>(null);
  const [crops, setCrops] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      try {
        const userRes = await fetch("http://localhost:5000/api/user/me");
        if (userRes.status === 401) {
          navigate("/login");
          return;
        }
        const userData = await userRes.json();
        if (!isMounted) return;
        setUser(userData);

        const cropsRes = await fetch("http://localhost:5000/api/crops");
        const cropsData = await cropsRes.json();
        if (!isMounted) return;
        setCrops(cropsData);
      } catch (error) {
        navigate("/login");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  /* ---------------- DASHBOARD UI ---------------- */

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            Namaste, {user?.name || "Farmer"}
          </h1>

          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {user?.village}, {user?.district}
          </p>
        </div>

        <Button
          variant="secondary"
          onClick={() => {
            setUser(null);
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </div>

      <div className="p-6 space-y-6">

        <Tabs defaultValue="crops">

          <TabsList>
            <TabsTrigger value="crops">My Crops</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* CROPS */}

          <TabsContent value="crops">
            <Card>
              <CardHeader className="flex justify-between flex-row">
                <CardTitle>Saved Crops</CardTitle>

                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </CardHeader>

              <CardContent className="space-y-3">

                {crops.map((crop) => (
                  <div
                    key={crop.id}
                    className="flex justify-between p-3 bg-muted rounded"
                  >

                    <div>
                      <p className="font-medium">{crop.name}</p>

                      <p className="text-sm text-muted-foreground">
                        {crop.variety} • {crop.area}
                      </p>
                    </div>

                    <div className="text-sm flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {crop.season}
                    </div>

                  </div>
                ))}

              </CardContent>
            </Card>
          </TabsContent>

          {/* PROFILE */}

          <TabsContent value="profile">

            <Card>

              <CardHeader className="flex justify-between flex-row">
                <CardTitle>Profile</CardTitle>

                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
              </CardHeader>

              <CardContent className="grid md:grid-cols-2 gap-4">

                <p><b>Name:</b> {user?.name}</p>
                <p><b>Phone:</b> {user?.phone}</p>
                <p><b>Village:</b> {user?.village}</p>
                <p><b>Land:</b> {user?.landSize}</p>

              </CardContent>

            </Card>

          </TabsContent>

        </Tabs>

      </div>

    </div>
  );
};

export default Dashboard;
