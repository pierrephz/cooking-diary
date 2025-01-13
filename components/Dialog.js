import React, { useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import Button from "./Button";
import Input from "./Input";
import Image from "next/image";
import { IconUpload } from "@tabler/icons-react";

const Dialog = ({ isOpen, onClose, onSubmit }) => {
  const [guests, setGuests] = useState("");
  const [dish, setDish] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const dialogRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    setPhoto(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemovePhoto = () => {
    setPhoto(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!guests) newErrors.guests = "Guests field is required";
    if (!dish) newErrors.dish = "Cooked dish field is required";
    if (!date) newErrors.date = "Date field is required";
    if (!photo) newErrors.photo = "Photo is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const photoUrl = photo ? URL.createObjectURL(photo) : null;
    const post = {
      guests,
      dish,
      date: new Date(date).toISOString(),
      note,
      photoUrl,
    };
    onSubmit(post);
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={dialogRef}
        className="bg-white p-6 rounded-lg shadow-lg divide-y divide-solid w-96"
      >
        <h2 className="text-xl font-bold mb-4">Add Cooking Entry</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2.5"
          noValidate
        >
          <div className="my-6">
            <label className="block text-sm font-medium mb-1">
              Upload Photo
            </label>
            {!photo ? (
              <div
                {...getRootProps()}
                className={`border border-dashed border-gray-300 p-4 rounded-lg cursor-pointer h-48 flex flex-col items-center justify-center hover:bg-gray-50 ${
                  errors.photo ? "border-red-500" : "border-gray-300"
                }`}
              >
                <input {...getInputProps()} />
                <IconUpload size={32} className="mx-auto text-gray-500 mb-2" />
                {isDragActive ? (
                  <p className="text-center text-gray-500 text-sm">
                    Drop the files here, <br /> when it&apos;s still hot.
                  </p>
                ) : (
                  <p className="text-center text-gray-500 text-sm">
                    Drag and drop a photo here, <br /> or click to select one
                  </p>
                )}
                {errors.photo && (
                  <p className="text-red-500 text-sm mt-1">{errors.photo}</p>
                )}
              </div>
            ) : (
              <div className="relative h-48">
                <Image
                  src={URL.createObjectURL(photo)}
                  alt="Selected"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute top-2 right-2 bg-white text-gray-500 border border-gray-100 px-2 py-1 rounded-md hover:bg-gray-50 hover:text-gray-600"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          <Input
            label="Guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            error={errors.guests}
            setErrors={setErrors}
          />
          <Input
            label="Dish"
            value={dish}
            onChange={(e) => setDish(e.target.value)}
            error={errors.dish}
            setErrors={setErrors}
          />
          <Input
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            error={errors.date}
            setErrors={setErrors}
          />
          <Input
            label="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            textarea
            setErrors={setErrors}
          />
          <div className="flex justify-end space-x-4">
            <Button onClick={onClose} variant="neutral">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dialog;
