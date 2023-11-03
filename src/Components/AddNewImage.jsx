/* eslint-disable react/prop-types */
import { memo } from "react";
import { HiPhoto } from "react-icons/hi2";

const AddNewImage = memo(({ className, setImageFiles }) => {
  const handleChange = ({ currentTarget: t }) => {
    if (!t.files.length) return;

    const [file] = t.files;
    if (!file.type.startsWith("image/")) {
      alert("Must be a file of type: Image");
      return;
    }

    if (file.size / 1024 > 2048) {
      alert("Max file size limit: 2048 KB (2 MB)");
      return;
    }

    const reader = new FileReader();
    reader.onloadstart = () => (t.disabled = true);
    reader.onload = () => {
      setImageFiles((imageFiles) => [
        ...imageFiles,
        {
          id: Math.floor(Math.random() * 10 + 100).toString(),
          url: reader.result,
        },
      ]);
    };
    reader.onloadend = () => (t.disabled = false);
    reader.onerror = () => alert(reader.error);
    reader.readAsDataURL(file);
  };

  return (
    <>
      <input
        hidden
        type="file"
        id="image-upload"
        name="image-upload"
        onChange={handleChange}
        accept="image/*"
        className="peer"
      />
      <label
        htmlFor="image-upload"
        className={`relative flex aspect-square w-full cursor-pointer flex-col place-items-center items-center justify-center gap-1 rounded-lg border-2 bg-gray-100 text-center text-gray-800 transition-colors hover:bg-gray-50 peer-disabled:opacity-50 ${className}`}
      >
        <HiPhoto className="inline text-xl" />
        <small className="font-semibold">Add Images</small>
        <div className="absolute inset-0 m-4 rounded-sm border border-dashed border-gray-400"></div>
      </label>
    </>
  );
});

AddNewImage.displayName = "AddNewImage";

export default AddNewImage;
