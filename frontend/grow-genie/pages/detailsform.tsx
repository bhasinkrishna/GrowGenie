import React, { useState, useRef, } from "react";
import { useRouter } from "next/router";
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const DetailsForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    plantType: "",
    spaceLocation: "",
    sunlight: "",
    wateringFrequency: "",
    climateCondition: "",
    spaceSize: "",
    gardeningExperience: "",
    gardeningMethod: "",
    additionalInfo: "",
  });

  const profileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const token = localStorage.getItem("authToken");
  if (!token) {
    alert("You must be logged in to submit the form.");
    return;
  }

  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  try {
    const response = await fetch(`${baseURL}/api/form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Form submission failed.");
    }

    const data = await response.json();
    console.log("Success:", data);
    router.push("/thank-you");
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Something went wrong while submitting the form.");
  }
};


  return (
    <div className="bg-green-50 min-h-screen">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img
                src="/images/logo.png"
                alt="Grow Genie Logo"
                className="w-14 h-14"
              />
              <span className="text-xl font-semibold">Grow Genie</span>
            </div>
            <div className="flex items-center space-x-6">
            <a href="/" className="text-green-600 hover:underline font-medium">Home</a>
            <a href="/about" className="text-green-600 hover:underline font-medium">About</a>
            <a href="/help" className="text-green-600 hover:underline font-medium">Help</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-4xl border border-gray-200 mx-auto mt-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Tell us about your space and preferences
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            {
              label: "🌱 What type of plants do you want to grow?",
              name: "plantType",
              options: [
                "Vegetables",
                "Herbs",
                "Flowers",
                "Fruits",
                "Others (Specify)",
              ],
            },
            {
              label: "🌈 Where is your space located?",
              name: "spaceLocation",
              options: ["Balcony", "Terrace", "Indoor", "Garden"],
            },
            {
              label: "🌞 How much sunlight does your space receive daily?",
              name: "sunlight",
              options: [
                "Full Sun (6+ hours)",
                "Partial Sun (3-6 hours)",
                "Shade (Less than 3 hours)",
              ],
            },
            {
              label: "💧 How often can you water your plants?",
              name: "wateringFrequency",
              options: ["Daily", "Every 2-3 days", "Once a week"],
            },
            {
              label: "❄️ What is the climate condition in your region?",
              name: "climateCondition",
              options: ["Hot & Dry", "Moderate", "Cool & Humid"],
            },
            {
              label: "📏 What is the approximate size of your available space?",
              name: "spaceSize",
              options: [
                "Small (< 10 sq. ft)",
                "Medium (10-30 sq. ft)",
                "Large (> 30 sq. ft)",
              ],
            },
            {
              label: "🤖 Do you have any prior experience with gardening?",
              name: "gardeningExperience",
              options: ["Yes", "No", "Somewhat"],
            },
            {
              label: "🏡 Would you prefer organic or non-organic gardening methods?",
              name: "gardeningMethod",
              options: ["Organic", "Non-organic", "No Preference"],
            },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <select
                name={field.name}
                value={(formData as any)[field.name]}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select...</option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              📝 Any specific plant preferences or additional information?
            </label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              rows={4}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              placeholder="Enter additional info here..."
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white p-3 rounded-lg w-full hover:bg-green-700"
            >
              Confirm & Submit
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <a href="#" className="text-blue-500 hover:underline">
            Have a question? We're here to help!
          </a>
        </div>
      </div>
    </div>
  );
};

export default DetailsForm;
