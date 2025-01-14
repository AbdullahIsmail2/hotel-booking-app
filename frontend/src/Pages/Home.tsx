import { useQuery } from "@tanstack/react-query";
import { fetchHotels } from "../api";
import LatestDestinationCard from "../Components/LatestDestinationCard";
import { useState, useEffect } from "react";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 560);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const { data: hotels } = useQuery({
    queryKey: ["hotels"],
    queryFn: () => fetchHotels(),
  });

  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];
  return (
    <>
      {!isMobile ? (
        <div className="space-y-3 px-6">
          <h2 className="text-3xl font-bold">Latest Destinations</h2>
          <p>Most recent destinations added by our hosts</p>
          <div className="grid gap-4">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
              {topRowHotels.map((hotel) => (
                <LatestDestinationCard key={hotel._id} hotel={hotel} />
              ))}
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {bottomRowHotels.map((hotel) => (
                <LatestDestinationCard key={hotel._id} hotel={hotel} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-2xl font-bold p-6">
          We noticed you are on mobile. To access the app please switch to a larger device such as
          a tablet or laptop. Thank you!
        </p>
      )}
    </>
  );
}
