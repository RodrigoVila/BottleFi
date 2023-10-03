export const NotFound = () => {
  return (
    <div className="w-full h-screen bg-black center">
      <div className="flex-col gap-8 text-center center">
        <h1 className="text-2xl font-bold">404 - Not Found</h1>
        <p className="mx-4 text-xl font-semibold">
          The page you're looking for may have been moved or doesn't exist
        </p>
      </div>
    </div>
  );
};
