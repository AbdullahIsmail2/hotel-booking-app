import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createPaymentIntent, fetchCurrentUser, fetchHotelById } from "../api";
// import BookingForm from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../Contexts/SearchContext";
import { useParams } from "react-router-dom";
import BookingDetailsSummary from "../Components/BookingDetailsSummary";
// import { Elements } from "@stripe/react-stripe-js";
// import { useAppContext } from "../Contexts/AppContext";

export default function Booking() {
  // const { stripePromise } = useAppContext();
  const search = useSearchContext();
  const { hotelId } = useParams();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: paymentIntentData } = useQuery({
    queryKey: ["createPaymentIntent"],
    queryFn: () =>
      createPaymentIntent(hotelId as string, numberOfNights.toString()),
    enabled: !!hotelId && numberOfNights > 0,
  });
  const { data: hotel } = useQuery({
    queryKey: ["fetchHotelByID"],
    queryFn: () => fetchHotelById(hotelId as string),
    enabled: !!hotelId,
  });

  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => fetchCurrentUser(),
  });

  if (!hotel) return <></>;

  console.log(currentUser);
  console.log(paymentIntentData);

  return (
    <div className="flex flex-col gap-6 px-6 sm:px-0">
      <h1 className="text-3xl font-bold">
        Booking Successful!
      </h1>
        <BookingDetailsSummary
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          adultCount={search.adultCount}
          childCount={search.childCount}
          numberOfNights={numberOfNights}
          hotel={hotel}
        />
        {/* {currentUser && paymentIntentData && (
        <Elements
        stripe={stripePromise}
        options={{
          clientSecret: paymentIntentData.clientSecret,
          }}
          >
          <BookingForm
          currentUser={currentUser}
          paymentIntent={paymentIntentData}
          />
        </Elements>
      )} */}
    </div>
  );
}
