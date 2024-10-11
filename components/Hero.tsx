import Helix from "@/public/assets/Helix.png";
import sphere from "@/public/assets/sphere.png";
import star from "@/public/assets/star.png";
import star2 from "@/public/assets/star2.png";
import star3 from "@/public/assets/star3.png";
import Rectangle from "@/public/assets/Rectangle.png";
import Ellipse1 from "@/public/assets/Ellipse1.png";
import Ellipse2 from "@/public/assets/Ellipse2.png";
import Ellipse3 from "@/public/assets/Ellipse3.png";
import Image from "next/image";
import Link from "next/link";
import Card from "./Card";

export default function Hero() {
  const courses = [
    {
      id: 1,
      thumbnail: "/assets/moonxImg1.png",
      category: "Blockchain",
      title: "Introduction to Blockchain Technology",
      reward: 50,
      description:
        "Learn about the fundamentals of blockchain technology. Understand how it works, its history, and its potential applications across various industries. This course is perfect for beginners looking to grasp the basics",
      rating: 4.9,
      viewers: 100000,
    },
    {
      id: 2,
      thumbnail: "/assets/moonxImg2.jpeg",
      category: "Finance and Digital Assets",
      title: "Decentralized Applications (dAPPs)",
      reward: 50,
      description:
        "Learn about the fundamentals of blockchain technology. Understand how it works, its history, and its potential applications across various industries. This course is perfect for beginners looking to grasp the basics",
      rating: 4.9,
      viewers: 100000,
    },
    {
      id: 3,
      thumbnail: "/assets/moonxImg3.jpeg",
      category: "Development and Programming",
      title: "Web3.js for Developers",
      reward: 50,
      description:
        "Learn about the fundamentals of blockchain technology. Understand how it works, its history, and its potential applications across various industries. This course is perfect for beginners looking to grasp the basics",
      rating: 4.9,
      viewers: 100000,
    },
    {
      id: 4,
      thumbnail: "/assets/moonxImg4.png",
      category: "Finance and Digital Assets",
      title: "DeFi (Decentralized Finance) Fundamentals",
      reward: 50,
      description:
        "Learn about the fundamentals of blockchain technology. Understand how it works, its history, and its potential applications across various industries. This course is perfect for beginners looking to grasp the basics",
      rating: 4.9,
      viewers: 100000,
    },
    {
      id: 5,
      thumbnail: "/assets/moonxImg1.png",
      category: "Blockchain",
      title: "Introduction to Blockchain Technology",
      reward: 50,
      description:
        "Learn about the fundamentals of blockchain technology. Understand how it works, its history, and its potential applications across various industries. This course is perfect for beginners looking to grasp the basics",
      rating: 4.9,
      viewers: 100000,
    },
    {
      id: 6,
      thumbnail: "/assets/moonxImg1.png",
      category: "Blockchain",
      title: "Introduction to Blockchain Technology",
      reward: 50,
      description:
        "Learn about the fundamentals of blockchain technology. Understand how it works, its history, and its potential applications across various industries. This course is perfect for beginners looking to grasp the basics",
      rating: 4.9,
      viewers: 100000,
    },
    {
      id: 7,
      thumbnail: "/assets/moonxImg1.png",
      category: "Blockchain",
      title: "Introduction to Blockchain Technology",
      reward: 50,
      description:
        "Learn about the fundamentals of blockchain technology. Understand how it works, its history, and its potential applications across various industries. This course is perfect for beginners looking to grasp the basics",
      rating: 4.9,
      viewers: 100000,
    },
    {
      id: 8,
      thumbnail: "/assets/moonxImg1.png",
      category: "Blockchain",
      title: "Introduction to Blockchain Technology",
      reward: 50,
      description:
        "Learn about the fundamentals of blockchain technology. Understand how it works, its history, and its potential applications across various industries. This course is perfect for beginners looking to grasp the basics",
      rating: 4.9,
      viewers: 100000,
    },
  ];

  return (
    <section className="relative  bg-[#00122C] md:pb-20 overflow-hidden">
      {/* Ellipse 1 */}
      <div className="absolute top-[25%] left-[25%] right-[25%] bottom-[50%] z-0 pointer-events-none">
        <Image
          src={Ellipse1}
          alt="Ellipse1"
          /*           layout="fill" */
          height={800}
          width={1000}
        />
      </div>
      {/* Ellipse 2 */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0 pointer-events-none">
        <Image src={Ellipse2} alt="Ellipse2" layout="contain" />
      </div>
      {/* Ellipse 3 */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0 pointer-events-none">
        <Image src={Ellipse3} alt="Ellipse3" layout="cover" />
      </div>

      <div className="relative">
        <div className="flex">
          <div className="w-[20%] pt-10 md:w-[25%] md:pt-19">
            <div className="flex  md:mt-8 justify-center items-center md:h-[174px]">
              <Image src={sphere} alt="sphere" height={120} />
            </div>
            <div className="mt-16 pt-36 md:mt-28 md:pt-12">
              <Image
                src={Rectangle}
                alt="Rectangle"
                height={150}
                width={150}
                className="transform rotate-180 filter blur brightness-10"
              />
            </div>
          </div>
          <div className="w-[60%] pt-5 md:w-[50%] md:pt-8">
            <h1 className="mt-3 md:mt-5 text-white text-xl md:text-6xl font-plus-jakarta-sans font-bold text-center">
              Welcome to Moon X <br /> Your Gateway to
              <br /> Decentralized learning
            </h1>
            <p className="text-gray-400 mb-7 text-xs md:text-xl mt-5 tracking-tight font-plus-jakarta-sans font-normal text-center">
              Unlock the Future: Learn, Earn and Empower
              <br />
              Your Web3 Journey on MoonX
            </p>
            <div className="flex md:mt-7 mx-auto justify-center items-center">
              <Link href={"/courses"}>
                <button className="md:py-4 py-2 px-5 text-white md:text-lg md:px-8 rounded-md bg-gradient-to-r from-[#EB7568] via-[#FAB142] to-[#FAB142]">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div className="w-[20%] md:w-[25%]">
            <div className="md:-m-8 mr-9  md:ml-[38%] z-40">
              <Image
                src={star}
                alt="star"
                className="relative"
                width={70}
                height={50}
              />
            </div>
            <div className="md:mt-7 ml-[70%]">
              <Image src={star3} alt="star3" />
            </div>

            <div className=" md:w-[70%] md:ml-[30%] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-purple-400 to-purple-300 opacity-70 rounded-full filter blur-lg mix-blend-hard-light"></div>
              <div className="h-full w-full mt-16 pt-16 md:h-auto">
                <Image src={Helix} alt="Helix" height={300} width={300} />
              </div>
            </div>

            <div className="mt-8 pt-8 mr-9 md:mt-0 md:ml-[20%]">
              <Image src={star2} alt="star2" className="relative" />
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-[2rem] text-[#fff] font-bold  mb-[2rem]">Courses</h1>
      <div className=" grid grid-cols-4 mx-auto gap-3 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 ">
        {courses.map((course, index) => (
          <Card course={course} key={index} />
        ))}
      </div>
    </section>
  );
}
