import { useEffect, useState } from "react";
interface Image {
  id: number;
  url: string;
}
const Gallery = () => {
  const [images, setImages] = useState<Image[]>([]);
  console.log(images);
  useEffect(() => {
    try {
      fetch("imglinks.json")
        .then((res) => res.json())
        .then((data) => setImages(data));
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="grid grid-cols-5 gap-5">
      {images?.map((img, index) => (
        <div
          key={img.id}
          className={`${index === 0 ? "col-span-2 row-span-2" : "col-span-1"}`}
        >
          <img
            src={img.url}
            alt={`Image ${img.id}`}
            className="w-full h-full"
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;
