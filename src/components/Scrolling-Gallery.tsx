'use client';
import  { useState, useEffect } from "react";

// Array of Unsplash images for random display
const images = [
  "public/Images23/img3.jpg",
  "public/Images23/img4.jpg",
  "public/Images23/img5.jpg",
  "public/Images23/img6.jpg",
  "public/Images23/img7.jpg",
  "public/Images23/img8.jpg",
  "public/Images23/img9.jpg",
  "public/Images23/img10.jpg",
  "public/Images23/img11.jpg",
  "public/Images23/img1.HEIC",
  "public/Images23/img2.HEIC",
];

const ScrollingGallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);

  const openModal = (imageSrc: string) => {
    setCurrentImage(imageSrc);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentImage(null);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    // Attach event listener if the modal is open
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    // Cleanup event listener on component unmount or when modal is closed
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative overflow-hidden ">
      {/* First Row */}
      <div className="flex gap-6 animate-scroll">
        {images.map((src, index) => (
          <div key={`row1-${index}`} className="min-w-[300px] h-[200px] rounded-lg overflow-hidden">
            <img
              src={src}
              alt={`Random image ${index}`}
              width={300}
              height={200}
              className="object-cover w-full h-full cursor-pointer"
              onClick={() => openModal(src)}
            />
          </div>
        ))}
      </div>

      {/* Second Row */}
      <div className="flex gap-6 animate-scroll-second mt-6">
        {images.map((src, index) => (
          <div key={`row2-${index}`} className="min-w-[300px] h-[200px] rounded-lg overflow-hidden">
            <img
              src={src}
              alt={`Random image ${index}`}
              width={300}
              height={200}
              className="object-cover w-full h-full cursor-pointer"
              onClick={() => openModal(src)}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {isOpen && currentImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative">
            <img
              src={currentImage}
              alt="Preview"
              width={800}
              height={600}
              className="object-contain rounded-lg"
            />
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-gray-700 p-2 rounded-full"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScrollingGallery;
