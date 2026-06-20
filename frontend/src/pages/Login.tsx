
import { useState } from "react"
import { HeartPulse, Lock, Mail } from "lucide-react"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implementar autenticação
    console.log({ email, password })
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="w-full max-w-sm sm:max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-2xl p-5 sm:p-8 md:p-10">
          {/* Logo/Header */}
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <div className="flex items-center justify-center w-12 sm:w-16 h-12 sm:h-16 bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 shadow-lg">
              <HeartPulse size={24} className="sm:hidden text-white" />
              <HeartPulse size={32} className="hidden sm:block text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Hackabrains</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Plataforma de Saúde</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail size={16} className="sm:hidden absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Mail size={18} className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock size={16} className="sm:hidden absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Lock size={18} className="hidden sm:block absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 sm:pl-11 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
                />
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm pt-2 gap-2 sm:gap-0">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input type="checkbox" className="w-3 h-3 sm:w-4 sm:h-4 rounded border-gray-300 accent-emerald-600" />
                Lembrar-me
              </label>
              <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium whitespace-nowrap">
                Esqueceu a senha?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4 sm:mt-6 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-sm sm:text-base font-semibold py-2 sm:py-2.5 rounded-lg sm:rounded-xl transition transform hover:scale-105 active:scale-95 shadow-lg"
            >
              Entrar
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-2 sm:gap-3 my-4 sm:my-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-500">ou</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Info Box */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
            <p className="text-xs sm:text-sm text-emerald-900">
              <span className="font-semibold">Ambiente seguro</span> para profissionais de saúde
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-xs sm:text-sm text-gray-500 mt-4 sm:mt-6">
            Não tem conta?{" "}
            <a href="#" className="text-emerald-600 hover:text-emerald-700 font-semibold whitespace-nowrap">
              Solicitar acesso
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login