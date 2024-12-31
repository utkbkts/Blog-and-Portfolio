import { useEffect } from "react";
import { redirect } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export const AdminLoaders = ({ requiredRole }) => {
  const { user, isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn || user?.publicMetadata.role !== requiredRole) {
      redirect("/");
    }
  }, [isLoaded, isSignedIn, user, requiredRole]);

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return null;
};
