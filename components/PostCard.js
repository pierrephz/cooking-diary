import React from "react";
import Image from "next/image";
import { IconChefHat, IconCalendarWeek } from "@tabler/icons-react";

const PostCard = ({ photoUrl, guests, dish, date, note }) => {
  return (
    <div className="w-full max-w-2xl p-4 flex">
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
      <div className="w-full flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">{guests}</h2>
          <div className="flex items-center">
            <IconChefHat size={24} className="mr-2" />
            <p className="text-lg font-medium text-gray-800">{dish}</p>
          </div>
          <div className="flex items-center text-lg text-gray-400">
            <IconCalendarWeek size={24} className="mr-2" />
            <p className="text-lg font-medium">
              {new Date(date).toLocaleDateString()}
            </p>
          </div>
        </div>
        {note && (
          <div className="p-4 bg-gray-100 rounded-lg mt-4">
            <p className="text-gray-800">
              <b>Note:</b> {note}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
