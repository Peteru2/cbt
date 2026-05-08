export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="h-16 w-16 rounded-full border-4 border-slate-700 border-t-blue-500 animate-spin" />

        <div className="text-center">
          <h2 className="text-white text-2xl font-bold">
            Loading Instructions
          </h2>

          <p className="text-slate-400 mt-2">
            Preparing examination guidelines...
          </p>
        </div>
      </div>
    </main>
  );
}