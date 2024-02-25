import React from "react";
import { Spinner } from "@nextui-org/react";

const LoadingUI = () => {
  return (
    <main className="container mx-auto">
      <div className="flex justify-center h-screen">
        <Spinner color="default" size="lg" />
      </div>
    </main>
  );
};

export default LoadingUI;
