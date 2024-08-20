'use client';

import Image, { StaticImageData } from 'next/image';
import React from 'react';
import coin from '@/public/assets/coin.png';

// Define the type for the RewardCard props
interface RewardCardProps {
  imageSrc: StaticImageData; // or string if you use a URL instead of a static image
  message: string;
  buttonText: string;
}

function RewardCard({ imageSrc, message, buttonText }: RewardCardProps) {
  return (
    <div className="w-[15rem] py-[0.7rem] gap-4  rounded-md flex items-center justify-center flex-col bg-gradient-to-br from-[#89BFDD] to-[#DFB1CC]">
      <div>
        <Image src={imageSrc} alt="coins" />
      </div>
      <div className="text-center font-semibold mt-4 px-3">
        <p>{message}</p>
      </div>
      <div className="mt-2">
        <button className="font-semibold rounded-xl p-3 bg-white">
          {buttonText}
        </button>
      </div>
    </div>
  );
}

// Define the type for the data array used in RewardCardsGrid
interface CardData {
  imageSrc: StaticImageData; // or string if you use a URL instead of a static image
  message: string;
  buttonText: string;
}

export default function RewardCardsGrid() {
  const cards: CardData[] = [
    {
      imageSrc: coin,
      message:
        "Congratulations! You've earned 10 Mand for completing your course",
      buttonText: 'Claim your rewards Now',
    },
    {
      imageSrc: coin,
      message:
        "Congratulations! You've earned 20 Mand for completing another course",
      buttonText: 'Claim your rewards Now',
    },
    {
      imageSrc: coin,
      message:
        "Congratulations! You've earned 20 Mand for completing another course",
      buttonText: 'Claim your rewards Now',
    },
    {
      imageSrc: coin,
      message:
        "Congratulations! You've earned 20 Mand for completing another course",
      buttonText: 'Claim your rewards Now',
    },

    // Add more cards here if needed
  ];

  return (
    <div className="px-[1rem]   grid justify-items-center md:place-items-start gap-4 md:gap-0 grid-cols-1 md:grid-cols-4">
      {cards.map((card, index) => (
        <RewardCard
          key={index}
          imageSrc={card.imageSrc}
          message={card.message}
          buttonText={card.buttonText}
        />
      ))}
    </div>
  );
}
