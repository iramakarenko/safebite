import { Outlet } from "react-router";

export function Root() {
  return (
    <div className="size-full bg-white max-w-md mx-auto relative shadow-xl">
      <Outlet />
    </div>
  );
}
