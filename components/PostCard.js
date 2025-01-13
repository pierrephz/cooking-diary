import React from "react";
import Image from "next/image";

const PostCard = ({ photoUrl, guests, dish, date, note }) => {
  return (
    <div className="w-full max-w-2xl bg-white shadow-md border rounded-xl p-4 mb-4 flex">
      {photoUrl && (
        <div className="mr-4">
          <div className="relative w-80 h-96">
            <Image
              src={photoUrl}
              alt={dish}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      )}
      <div className="w-full">
        <div className="mb-2">
          <h2 className="text-xl font-bold">{dish}</h2>
          <p className="text-gray-600">{new Date(date).toLocaleDateString()}</p>
        </div>
        <div className="mb-2">
          <p className="text-gray-800">Guests: {guests}</p>
        </div>
        {note && (
          <div className="mb-2">
            <p className="text-gray-800">Note: {note}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
