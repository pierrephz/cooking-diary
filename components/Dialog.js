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

  const resetState = () => {
    setGuests("");
    setDish("");
    setDate("");
    setNote("");
    setPhoto(null);
    setErrors({});
  };

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
    resetState();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        resetState();
      }
    };

    const handleClickOutside = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target)) {
        onClose();
        resetState();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      resetState();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        ref={dialogRef}
        className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl flex flex-col"
      >
        <h2 className="text-xl font-bold">Add Cooking Entry</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-grow"
          noValidate
        >
          <div className="flex gap-8 py-4 my-4 border-y border-gray-200">
            <div className="flex flex-col w-full">
              <label className="block text-sm font-medium mb-1">
                Upload Photo
              </label>
              {!photo ? (
                <div
                  {...getRootProps()}
                  className={`flex-grow border border-dashed border-gray-300 p-4 rounded-lg cursor-pointer flex flex-col items-center justify-center hover:bg-gray-50 ${
                    errors.photo ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <input {...getInputProps()} />
                  <IconUpload
                    size={32}
                    className="mx-auto text-gray-500 mb-2"
                  />
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
                <div className="relative flex-grow">
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
                    className="absolute top-2 right-2 bg-white text-gray-500 text-sm drop-shadow-md font-semibold border border-gray-100 px-2 py-1 rounded-md hover:bg-gray-50 hover:text-gray-600"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            <div className="flex flex-col w-full gap-6">
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
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <Button
              onClick={() => {
                onClose();
                resetState();
              }}
              variant="neutral"
            >
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
