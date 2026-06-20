import { HeartPulse, Lock, Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

type LoginFormInputs = {
  email: string
  password: string
  remember: boolean
}

export default function Login() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>()

  const onSubmit = async (data: LoginFormInputs) => {
    // Substitua pela chamada real à sua API:
    // const response = await api.post('/auth/login', { email: data.email, password: data.password })
    console.log("Login:", data)
    await new Promise((resolve) => setTimeout(resolve, 800))
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center justify-center w-14 h-14 bg-emerald-600 rounded-2xl mb-4">
              <HeartPulse size={28} className="text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">ClinIA</h1>
            <p className="text-xs text-gray-500 mt-1">Plataforma de Saúde</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* E-mail */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1.5">
                E-mail
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  {...register("email", { required: "E-mail é obrigatório" })}
                  className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-xl focus:ring-2 focus:border-transparent outline-none transition ${
                    errors.email ? "border-red-400 focus:ring-red-400" : "border-gray-200 focus:ring-emerald-500"
                  }`}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            {/* Senha */}
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1.5">
                Senha
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password", { required: "Senha é obrigatória" })}
                  className={`w-full pl-9 pr-3 py-2.5 text-sm border rounded-xl focus:ring-2 focus:border-transparent outline-none transition ${
                    errors.password ? "border-red-400 focus:ring-red-400" : "border-gray-200 focus:ring-emerald-500"
                  }`}
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* Lembrar-me */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("remember")}
                  className="w-3.5 h-3.5 rounded border-gray-300 accent-emerald-600"
                />
                Lembrar-me
              </label>
              <a href="#" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Esqueceu a senha?
              </a>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 rounded-xl transition active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">ou</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
            <p className="text-xs text-emerald-900">
              <span className="font-semibold">Ambiente seguro</span> para profissionais de saúde
            </p>
          </div>

          <p className="text-center text-xs text-gray-500 mt-5">
            Não tem conta?{" "}
            <a href="#" className="text-emerald-600 hover:text-emerald-700 font-semibold">
              Solicitar acesso
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}