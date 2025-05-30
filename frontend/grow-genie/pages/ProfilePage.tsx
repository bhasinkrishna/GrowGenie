import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface FormData {
  name: string;
  plantType: string;
  spaceLocation: string;
  sunlight: string;
  wateringFrequency: string;
  climateCondition: string;
  spaceSize: string;
  gardeningExperience: string;
  gardeningMethod: string;
  additionalInfo: string;
  location: string;
  soilType: string;
}

export default function ProfilePage() {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [editedData, setEditedData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [layoutImageUrl, setLayoutImageUrl] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndForm = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/logins");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/form/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        setUserName(data.name);
        setFormData(data);
        setEditedData(data);

        // Detect image extensions
        detectImage("http://localhost:5000/uploads/", data.name, setUploadedImageUrl);
        detectImage("http://localhost:5000/usergallery/", data.name, setLayoutImageUrl);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    const detectImage = async (
      baseUrl: string,
      userName: string,
      setter: (url: string | null) => void
    ) => {
      const extensions = ["jpeg", "jpg", "png", "webp"];
      for (const ext of extensions) {
        const url = `${baseUrl}${userName}.${ext}`;
        try {
          const res = await fetch(url);
          if (res.ok) {
            setter(url);
            return;
          }
        } catch (e) {
          // Ignore error
        }
      }
      setter(null); // No image found
    };

    fetchUserAndForm();
  }, [router]);

  const handleSave = async () => {
    const token = localStorage.getItem("authToken");
    if (!token || !editedData) return;

    try {
      const res = await fetch("http://localhost:5000/api/form/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedData),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const updated = await res.json();
      setFormData(updated);
      setEditedData(updated);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating profile. Please try again.");
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    if (!editedData) return;
    setEditedData({ ...editedData, [field]: value });
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/logins");
  };

  if (loading) return <div className="p-10 text-center">Loading profile...</div>;
  if (!formData) return <div className="p-10 text-center text-red-600">No data found.</div>;

  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      {/* Nav Bar */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/images/logo.png" alt="Grow Genie Logo" className="w-12 h-12" />
            <h1 className="text-xl sm:text-2xl font-bold text-green-700">Grow Genie</h1>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
           {([["Soil Type", "soilType"], ["Climate", "climateCondition"], ["Watering", "wateringFrequency"]] as [string, keyof FormData][]).map(
  ([label, key]) => (
    <p key={key}>
      <strong>{label}:</strong>{" "}
      {isEditing ? (
        <input
          className="border p-1 rounded w-full mt-1"
          value={editedData ? editedData[key] : ""}
          onChange={(e) => handleChange(key, e.target.value)}
        />
      ) : (
        formData ? formData[key] : ""
      )}
    </p>
  )
)}


            {isEditing ? (
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                onClick={handleSave}
              >
                Save Changes
              </button>
            ) : (
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </button>
            )}
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="p-6 max-w-7xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            Namaste 🙏, {userName || "User"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="font-semibold text-lg mb-2">Uploaded Space</h2>
            {uploadedImageUrl ? (
              <img
                src={uploadedImageUrl}
                alt="Uploaded Space"
                className="rounded-xl w-full h-48 object-cover mb-4"
              />
            ) : (
              <p className="text-gray-500">No space image found.</p>
            )}
            <button
              onClick={() => router.push("/upload")}
              className="w-full border border-green-600 text-green-700 py-2 rounded-lg hover:bg-white"
            >
              Upload New Space
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="font-semibold text-lg mb-2">Your Layout Plan</h2>
            {layoutImageUrl ? (
              <img
                src={layoutImageUrl}
                alt="Layout"
                className="rounded-xl w-full h-48 object-cover mb-4"
              />
            ) : (
              <p className="text-gray-500">No layout image found.</p>
            )}
            <button
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              onClick={() => layoutImageUrl && window.open(layoutImageUrl, "_blank")}
            >
              View in Fullscreen
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plant Suggestions */}
          <div className="bg-white rounded-2xl shadow p-4">
  <h2 className="font-semibold text-lg mb-4">Suggestions</h2>
  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
    
    <div className="flex flex-col items-center">
      <img
        src="/images/rose.png" 
        alt="Rose"
        className="w-12 h-12 mb-1 rounded-full"
      />
      <span className="text-sm text-center">Rose</span>
    </div>

    
    <div className="flex flex-col items-center">
      <img
        src="/images/sunflower.png" 
        alt="Sunflower"
        className="w-12 h-12 mb-1 rounded-full"
      />
      <span className="text-sm text-center">Sunflower</span>
    </div>

   
    <div className="flex flex-col items-center">
      <img
        src="/images/jasmine.jpeg"
        alt="Jasmine"
        className="w-12 h-12 mb-1 rounded-full"
      />
      <span className="text-sm text-center">Jasmine</span>
    </div>
  </div>


          </div>

          {/* Your Inputs */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="font-semibold text-lg mb-2">Your Inputs</h2>
        {[["Plants", "plantType"], ["Location", "location"], ["Space", "spaceLocation"], ["Size", "spaceSize"]].map(
  ([label, key]) => (
    <p key={key}>
      <strong>{label}:</strong>{" "}
      {isEditing ? (
        <input
          className="border p-1 rounded w-full mt-1"
          value={(editedData as any)?.[key] || ""}
          onChange={(e) => handleChange(key as keyof FormData, e.target.value)}
        />
      ) : (
        (formData as any)[key]
      )}
    </p>
  )
)}

          </div>

          {/* Soil & Climate */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="font-semibold text-lg mb-2">Soil & Climate</h2>
          {([["Soil Type", "soilType"], ["Climate", "climateCondition"], ["Watering", "wateringFrequency"]] as [string, keyof FormData][]).map(
  ([label, key]) => (
    <p key={key}>
      <strong>{label}:</strong>{" "}
      {isEditing ? (
        <input
          className="border p-1 rounded w-full mt-1"
          value={editedData ? editedData[key] : ""}
          onChange={(e) => handleChange(key, e.target.value)}
        />
      ) : (
        formData ? formData[key] : ""
      )}
    </p>
  )
)}

          </div>

          {/* Farming Tips */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h2 className="font-semibold text-lg mb-2">Farming Tips</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Tip 1: Water your plants regularly.</li>
              <li>Tip 2: Ensure proper sunlight exposure.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
