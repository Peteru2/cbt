export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="h-20 w-20 rounded-full border-4 border-slate-700" />

          <div className="absolute inset-0 h-20 w-20 rounded-full border-4 border-transparent border-t-green-500 animate-spin" />
        </div>

        <div className="text-center">
          <h2 className="text-white text-2xl font-bold">
            Preparing Examination
          </h2>

          <p className="text-slate-400 mt-2">
            Loading questions and session data...
          </p>
        </div>
      </div>
    </main>
  );
}