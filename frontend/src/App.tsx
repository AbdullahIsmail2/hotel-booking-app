import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./Pages/Register";
import SignIn from "./Pages/SignIn";
import AddHotel from "./Pages/AddHotel";
import { useAppContext } from "./Contexts/AppContext";
import MyHotels from "./Pages/MyHotels";
import EditHotel from "./Pages/EditHotel";
import Search from "./Pages/Search";
import Details from "./Pages/Details";
import Booking from "./Pages/Booking";
import Home from "./Pages/Home";

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/details/:hotelId"
          element={
            <Layout>
              <Details />
            </Layout>
          }
        />
        {isLoggedIn && (
          <>
            <Route
              path="/hotel/:hotelId/booking"
              element={
                <Layout>
                  <Booking />
                </Layout>
              }
            />
            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
            <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotels />
                </Layout>
              }
            />
            <Route
              path="/edit-hotel/:hotelId"
              element={
                <Layout>
                  <EditHotel />
                </Layout>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
