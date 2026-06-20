import {
  Brain,
  Users,
  FileText,
  ListChecks,
  ArrowRight,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: 'Histórico Unificado',
      description:
        'Banco de dados centralizado com contexto completo de cada paciente em segundos.',
    },
    {
      icon: Brain,
      title: 'IA Assistente Clínica',
      description:
        'Inteligência artificial que auxilia na tomada de decisão com base no histórico clínico.',
    },
    {
      icon: FileText,
      title: 'Relatórios Automáticos',
      description:
        'Geração automática de relatórios estruturados com análise completa da consulta.',
    },
    {
      icon: ListChecks,
      title: 'Plano de Ação Claro',
      description:
        'Próximos passos definidos automaticamente para otimizar o tratamento do paciente.',
    },
  ];

  const steps = [
    {
      step: '1',
      title: 'Histórico Centralizado',
      description:
        'Todos os dados do paciente — consultas anteriores, exames, medicamentos — ficam em um único lugar acessível em segundos.',
    },
    {
      step: '2',
      title: 'Análise com IA',
      description:
        'Nossa inteligência artificial analisa o contexto completo da consulta atual junto com o histórico do paciente.',
    },
    {
      step: '3',
      title: 'Relatório + Plano',
      description:
        'A IA gera automaticamente um relatório estruturado e um plano de ação claro para os próximos passos do tratamento.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
              <Brain size={20} />
            </div>
            <span className="text-lg font-semibold text-gray-900">ClinIA</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm text-gray-600 hover:text-emerald-600 transition"
            >
              Recursos
            </a>
            <a
              href="#how"
              className="text-sm text-gray-600 hover:text-emerald-600 transition"
            >
              Como funciona
            </a>
            <a
              href="#about"
              className="text-sm text-gray-600 hover:text-emerald-600 transition"
            >
              Sobre
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-sm text-emerald-600 font-medium hover:text-emerald-700 transition"
            >
              Entrar
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 text-sm bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition"
            >
              Ver Demo
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 p-4 space-y-3">
            <a
              href="#features"
              className="block text-sm text-gray-600 hover:text-emerald-600 py-2"
            >
              Recursos
            </a>
            <a
              href="#how"
              className="block text-sm text-gray-600 hover:text-emerald-600 py-2"
            >
              Como funciona
            </a>
            <button
              onClick={() => navigate('/login')}
              className="w-full text-sm px-4 py-2 text-emerald-600 font-medium hover:bg-emerald-50 rounded-lg transition"
            >
              Entrar
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full text-sm px-4 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition"
            >
              Ver Demo
            </button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section
        className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 
       from-emerald-50 via-white to-teal-50"
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100 px-3 py-1.5 rounded-full mb-6">
            <Sparkles size={14} className="text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-700">
              Potenciado por Inteligência Artificial
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 mb-4 leading-tight">
            Gestão Inteligente do Atendimento Clínico
          </h1>
          <p className="text-lg text-emerald-600 font-medium mb-4">
            Automação e IA na Jornada do Paciente
          </p>
          <p className="text-base text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            Centralize o histórico completo dos pacientes e deixe a IA gerar
            relatórios clínicos estruturados com plano de ação automatizado para
            auxiliar na tomada de decisão.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white text-sm font-semibold rounded-lg hover:bg-emerald-700 transition hover:scale-105 active:scale-95"
            >
              Explorar Dashboard <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-3 border border-emerald-500 text-emerald-600 text-sm font-semibold rounded-lg hover:bg-emerald-50 transition"
            >
              Entrar na plataforma
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-12">
            Recursos Principais
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-md transition text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-600 rounded-xl text-white mb-4 group-hover:scale-110 transition">
                  <f.icon size={22} />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-12">
            Como Funciona
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-xl p-6 border border-gray-100"
              >
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-semibold text-sm mb-4">
                  {item.step}
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-600 text-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Confiado por Profissionais
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { number: '500+', label: 'Profissionais cadastrados' },
              { number: '10k+', label: 'Pacientes gerenciados' },
              { number: '99.9%', label: 'Disponibilidade' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-semibold mb-2">{s.number}</p>
                <p className="text-sm text-emerald-100">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
            Sobre ClinIA
          </h2>
          <p className="text-base text-gray-600 leading-relaxed mb-4">
            ClinIA é uma plataforma inovadora desenvolvida para transformar a
            gestão de saúde através da inteligência artificial. Nosso aplicativo
            centraliza todo o histórico de saúde e consultas anteriores em um
            banco de dados unificado, garantindo que o médico tenha o contexto
            completo em segundos.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            A IA integrada atua como assistente de decisão clínica — ela gera
            automaticamente um relatório estruturado que auxilia o médico a
            definir o melhor tratamento e entrega um plano de ação claro com os
            próximos passos para o paciente.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-emerald-600 text-white">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Pronto para começar?</h2>
          <p className="text-base text-emerald-100 mb-8">
            Explore o dashboard completo com dados de exemplo e IA real
            integrada.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-emerald-700 text-sm font-semibold rounded-lg hover:shadow-lg transition hover:scale-105 active:scale-95"
            >
              Ir para Dashboard <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-6 py-3 border border-white text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition"
            >
              Entrar
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {[
            { title: 'Produto', links: ['Recursos', 'Preços', 'Segurança'] },
            { title: 'Empresa', links: ['Sobre', 'Blog', 'Contato'] },
            { title: 'Legal', links: ['Privacidade', 'Termos', 'Cookies'] },
            { title: 'Redes', links: ['Twitter', 'LinkedIn', 'Instagram'] },
          ].map((col) => (
            <div key={col.title}>
              <h3 className="text-white text-sm font-semibold mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm hover:text-white transition">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          &copy; 2025 ClinIA. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
