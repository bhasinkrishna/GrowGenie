import { useState, useRef } from "react";
import axios from "axios";

export default function UploadPage() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // Handle File Upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
      console.log("File uploaded:", file.name); // Debugging file upload
    }
  };

  // Drag and Drop Upload
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
      console.log("File dropped:", file.name); // Debugging drag and drop
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log("Drag over event triggered"); // Debugging drag over
  };

  // Open Camera
  const openCamera = async () => {
    try {
      setIsCameraActive(true);
      if (stream) {
        stopCamera(); // Stop any existing stream
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = async () => {
          try {
            await videoRef.current?.play();
            console.log("Camera is playing."); // Debugging camera
          } catch (error) {
            console.error("Autoplay error:", error);
          }
        };
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Camera access denied. Please allow camera permissions.");
    }
  };

  // Capture Photo
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (!context) {
        console.error("Canvas context not available");
        return;
      }

      if (video.videoWidth > 0 && video.videoHeight > 0) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL("image/png");
        setImage(imageData);
        console.log("Photo captured:", imageData); // Debugging photo capture
      } else {
        console.error("Video not ready for capturing");
      }
    }
    stopCamera();
  };

  // Stop Camera
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setStream(null);
    console.log("Camera stopped"); // Debugging camera stop
  };

  // Handle Image Upload to Backend
  const uploadImage = async (imageData: string | null) => {
    if (!imageData) return;
  
    const blob = await (await fetch(imageData)).blob(); // Convert base64 to Blob
    const file = new File([blob], "upload.png", { type: "image/png" });
  
    const formData = new FormData();
    formData.append("image", file);

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to submit the form.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        alert("Image uploaded successfully!");
        console.log("Upload successful:", response.data);

        window.location.href = "/detailsform"; // Redirect to the DetailsForm page
        
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred while uploading the image.");
    }
  };

  return (
    <div className="bg-green-50 min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Title */}
            <div className="flex items-center space-x-2">
              <img src="/images/logo.png" alt="Grow Genie Logo" className="w-14 h-14" />
              <span className="text-xl font-semibold">Grow Genie - Upload Your Space</span>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-6">
            <a href="/" className="text-green-600 hover:underline font-medium">Home</a>
            <a href="/about" className="text-green-600 hover:underline font-medium">About</a>
            <a href="/help" className="text-green-600 hover:underline font-medium">Help</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Instructions and Upload Section */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Instructions</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-600">
                <li>Choose a photo of your available space.</li>
                <li>Use a high-quality image with good lighting.</li>
                <li>File size must be less than 25MB.</li>
              </ol>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Upload image to get custom layout</h2>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
                >
                  Choose File
                </button>
                <p className="text-gray-600 mt-2">or use your camera</p>
                <button
                  onClick={openCamera}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mt-4"
                >
                  Capture with Camera
                </button>
              </div>

              {/* Camera Section */}
              {isCameraActive && (
                <div className="mt-4">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="rounded-lg shadow-lg w-full h-auto"
                  ></video>
                  <div className="flex space-x-4 mt-2">
                    <button
                      onClick={capturePhoto}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Capture Photo
                    </button>
                    <button
                      onClick={stopCamera}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                    >
                      Close Camera
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Preview</h2>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                {image ? (
                  <img
                    src={image}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <p>No image selected</p>
                  </div>
                )}
              </div>
              {image && (
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => setImage(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  >
                    Reset Image
                  </button>
                  <button
                    onClick={() => uploadImage(image)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    disabled={loading}
                  >
                    {loading ? "Uploading..." : "Upload Image"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Hidden Canvas for Capturing */}
      <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );
}
