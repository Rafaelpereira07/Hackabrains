import { Users, Brain, ArrowRight, Menu, X, TrendingUp, FileText, Sparkles } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white">
              <Brain size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900">Hackabrains</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-emerald-600 transition">Recursos</a>
            <a href="#about" className="text-gray-600 hover:text-emerald-600 transition">Sobre</a>
            <a href="#contact" className="text-gray-600 hover:text-emerald-600 transition">Contato</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 text-emerald-600 font-medium hover:text-emerald-700 transition"
            >
              Entrar
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg hover:shadow-lg transition"
            >
              Criar Conta
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 p-4 space-y-3">
            <a href="#features" className="block text-gray-600 hover:text-emerald-600 transition py-2">Recursos</a>
            <a href="#about" className="block text-gray-600 hover:text-emerald-600 transition py-2">Sobre</a>
            <a href="#contact" className="block text-gray-600 hover:text-emerald-600 transition py-2">Contato</a>
            <button
              onClick={() => navigate("/login")}
              className="w-full px-6 py-2 text-emerald-600 font-medium hover:bg-emerald-50 rounded-lg transition"
            >
              Entrar
            </button>
            <button
              onClick={() => navigate("/login")}
              className="w-full px-6 py-2 bg-linear-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-lg hover:shadow-lg transition"
            >
              Criar Conta
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-3 sm:px-6 lg:px-8 bg-linear-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full mb-4 sm:mb-6">
            <Sparkles size={16} className="text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-600">Potenciado por Inteligência Artificial</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
            Gestão Inteligente do Atendimento Clínico
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-emerald-600 font-semibold mb-4">Automação e IA na Jornada do Paciente</p>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto">
            Nosso aplicativo de gestão clínica centraliza todo o histórico de saúde e consultas anteriores em um banco de dados unificado. 
            A IA integrada gera automaticamente relatórios estruturados que auxiliam o médico na tomada de decisão clínica e entregam um 
            plano de ação claro com os próximos passos para o paciente.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-linear-to-r from-emerald-500 to-teal-600 text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
            >
              Explorar Dashboard <ArrowRight size={20} />
            </button>
            <button className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-emerald-500 text-emerald-600 text-sm sm:text-base font-semibold rounded-lg hover:bg-emerald-50 transition">
              Saiba Mais
            </button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto">
          <div className="bg-linear-to-br from-emerald-500 to-teal-600 rounded-xl sm:rounded-2xl h-64 sm:h-96 shadow-xl sm:shadow-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <Brain size={200} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="text-white text-center px-4 relative z-10">
              <Sparkles size={48} className="sm:hidden mx-auto mb-3" />
              <Sparkles size={64} className="hidden sm:block mx-auto mb-4" />
              <p className="text-base sm:text-lg font-semibold">Plataforma de Saúde com IA Integrada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12 sm:mb-16">Recursos Principais</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {[
              {
                icon: Users,
                title: "Histórico Unificado",
                description: "Banco de dados centralizado com contexto completo de cada paciente em segundos",
              },
              {
                icon: Brain,
                title: "IA Assistente Clínica",
                description: "Inteligência artificial que auxilia na tomada de decisão com recomendações baseadas em dados",
              },
              {
                icon: FileText,
                title: "Relatórios Automatizados",
                description: "Geração automática de relatórios estruturados com análise completa da consulta",
              },
              {
                icon: TrendingUp,
                title: "Plano de Ação Claro",
                description: "Próximos passos definidos automaticamente para otimizar o tratamento",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-8 hover:shadow-lg transition text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 sm:w-14 h-12 sm:h-14 bg-linear-to-br from-emerald-500 to-teal-600 rounded-lg sm:rounded-xl text-white mb-3 sm:mb-4 group-hover:scale-110 transition">
                  <feature.icon size={24} className="sm:hidden" />
                  <feature.icon size={28} className="hidden sm:block" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-20 px-3 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12 sm:mb-16">Como Funciona</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Histórico Centralizado",
                description: "Todos os dados do paciente — consultas anteriores, exames, medicamentos — ficam em um único lugar acessível em segundos",
              },
              {
                step: "2",
                title: "Análise com IA",
                description: "Nossa inteligência artificial analisa o contexto completo da consulta atual junto com o histórico do paciente",
              },
              {
                step: "3",
                title: "Relatório + Plano",
                description: "A IA gera automaticamente um relatório estruturado e um plano de ação claro para os próximos passos do tratamento",
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl p-6 sm:p-8 border border-gray-100">
                <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 px-3 sm:px-6 lg:px-8 bg-linear-to-br from-emerald-600 to-teal-700 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16">Confiado por Profissionais</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
            {[
              { number: "500+", label: "Profissionais Cadastrados" },
              { number: "10k+", label: "Pacientes Gerenciados" },
              { number: "99.9%", label: "Disponibilidade" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl sm:text-5xl font-bold mb-2">{stat.number}</p>
                <p className="text-sm sm:text-base text-emerald-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">Sobre Hackabrains</h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
            Hackabrains é uma plataforma inovadora desenvolvida para transformar a gestão de saúde através da inteligência artificial. 
            Nosso aplicativo de gestão clínica centraliza todo o histórico de saúde e consultas anteriores em um banco de dados unificado, 
            garantindo que o médico tenha o contexto completo em segundos.
          </p>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
            O grande diferencial é a nossa IA integrada: a partir do histórico e dos dados da consulta atual, a IA atua como uma 
            assistente de decisão clínica. Ela gera automaticamente um relatório estruturado que auxilia o médico a definir o melhor 
            tratamento e entrega um plano de ação claro com os próximos passos para o paciente.
          </p>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            Nossa missão é humanizar a tecnologia em saúde, tornando sistemas complexos simples e acessíveis para todos.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 px-3 sm:px-6 lg:px-8 bg-linear-to-br from-emerald-600 to-teal-700 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Pronto para começar?</h2>
          <p className="text-base sm:text-lg text-emerald-100 mb-6 sm:mb-8">
            Experimente a gestão clínica inteligente. Explore nosso dashboard completo com dados de exemplo.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-6 sm:px-8 py-2.5 sm:py-3 bg-white text-emerald-600 text-sm sm:text-base font-semibold rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
            >
              Ir para Dashboard <ArrowRight size={20} />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-white text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-white/10 transition"
            >
              Entrar
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">Produto</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Recursos</a></li>
              <li><a href="#" className="hover:text-white transition">Preços</a></li>
              <li><a href="#" className="hover:text-white transition">Segurança</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Sobre</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Contato</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition">Termos</a></li>
              <li><a href="#" className="hover:text-white transition">Cookies</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Redes Sociais</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Twitter</a></li>
              <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white transition">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center">
          <p>&copy; 2024 Hackabrains. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default HomePage

