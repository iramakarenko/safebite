import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Welcome } from "./components/Welcome";
import { Register } from "./components/Register";
import { AllergyProfile } from "./components/AllergyProfile";
import { MapView } from "./components/MapView";
import { RestaurantDetails } from "./components/RestaurantDetails";
import { AddRestaurant } from "./components/AddRestaurant";
import { WriteReview } from "./components/WriteReview";
import { NavigationView } from "./components/NavigationView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Welcome },
      { path: "register", Component: Register },
      { path: "allergy-profile", Component: AllergyProfile },
      { path: "map", Component: MapView },
      { path: "restaurant/:id", Component: RestaurantDetails },
      { path: "add-restaurant", Component: AddRestaurant },
      { path: "write-review/:id", Component: WriteReview },
      { path: "navigation/:id", Component: NavigationView },
    ],
  },
]);
