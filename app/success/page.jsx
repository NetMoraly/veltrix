export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a0033] via-black to-black text-white flex items-center justify-center px-4">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-4xl font-bold text-green-400">Платёж прошёл успешно</h1>
        <p className="text-lg text-gray-300">
          Спасибо! Подписка активирована!
        </p>
        <a
          href="/dashboard"
          className="inline-block px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 transition"
        >
          Перейти в личный кабинет
        </a>
      </div>
    </main>
  );
}
