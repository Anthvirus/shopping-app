import Image from "next/image";
import Button from "./button";

export default function JerseyCard({ jersey, quantity }) {
  return (
    <div className="rounded-lg hover:shadow-xl delay-200 shadow-md gap-4 flex bg-gray-200 items-center p-2 hover:grayscale-25">
      <Image
        width={100}
        height={100}
        src={jersey.image}
        alt={jersey.description}
        className="w-auto h-auto rounded-[inherit]"
      />
      <div className="flex flex-col justify-between p-1 w-full h-full">
        <div className="flex flex-col gap-2 justify-center items-start">
          <h3 className="text-xl font-semibold">{jersey.name}</h3>
          <p>{jersey.description}</p>
        </div>
        <div className="flex p-2 justify-between items-center">
          <Button jersey={jersey} quantity={quantity} />
          <p className="font-semibold text-3xl">£{jersey.price}</p>
        </div>
      </div>
    </div>
  );
}
