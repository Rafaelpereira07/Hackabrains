import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Home,
  FileText,
  User,
  LogOut,
  Bell,
  Menu,
  X,
  HeartPulse,
  Sparkles,
  Download
} from "lucide-react"

// ── Dados Simulados do Paciente Logado ───────────────────────────────────────
const patientData = {
  id: "PAC-1001",
  name: "João Silva",
  age: 34,
  bloodType: "O+",
  aiInsights: [
    "Sua pressão arterial estável nas últimas consultas indica que a medicação atual está funcionando bem.",
    "Lembrete: Beba pelo menos 2 litros de água hoje para manter a hidratação adequada.",
    "O acompanhamento clínico do seu último exame está recomendado para os próximos 30 dias."
  ],
  recentReports: [
    { id: "R-5001", title: "Hemograma Completo", date: "02 Nov 2024", doctor: "Dr. Rafael" },
    { id: "R-5002", title: "Raio-X de Tórax", date: "15 Jan 2025", doctor: "Dra. Carla" },
  ]
}

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
}

export default function PatientDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const navItems = [
    { icon: Home, label: "Início", active: true },
    { icon: FileText, label: "Meu Histórico" },
    { icon: User, label: "Meu Perfil" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      
      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <HeartPulse size={16} className="text-white" />
          </div>
          <span className="font-bold text-gray-900">ClinIA</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Sidebar (Desktop & Mobile) */}
      <aside className={`
        fixed md:sticky top-0 left-0 z-30 h-screen bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out
        w-64 flex flex-col
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="hidden md:flex items-center gap-2 h-20 px-6 border-b border-gray-100">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <HeartPulse size={16} className="text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">ClinIA</span>
        </div>

        <div className="p-6 pb-2 border-b border-gray-100 flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-lg">
            {getInitials(patientData.name)}
          </div>
          <div>
            <p className="font-semibold text-gray-900 leading-tight">{patientData.name}</p>
            <p className="text-xs text-gray-500">Paciente</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
                item.active 
                  ? "bg-emerald-50 text-emerald-700" 
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => navigate('/')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-red-600 rounded-xl transition-colors text-sm font-medium"
          >
            <LogOut size={20} />
            Sair da conta
          </button>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full">
        
        {/* Top actions */}
        <div className="hidden md:flex justify-end mb-8">
          <button className="relative p-2 text-gray-400 hover:text-emerald-600 transition-colors bg-white rounded-full border border-gray-200 shadow-sm">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
        </div>

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Olá, {patientData.name.split(' ')[0]}!</h1>
          <p className="text-gray-500 mt-1">Como você está se sentindo hoje?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Coluna Principal (Esquerda) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* AI Insights Card */}
            <div className="bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
                <HeartPulse size={120} />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                    <Sparkles size={20} className="text-white" />
                  </div>
                  <h2 className="text-lg font-bold">Assistente de Saúde IA</h2>
                </div>
                <div className="space-y-3">
                  {patientData.aiInsights.map((insight, index) => (
                    <div key={index} className="flex gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm">
                      <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 shrink-0"></div>
                      <p className="text-sm leading-relaxed text-emerald-50 font-medium">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Coluna Secundária (Direita) */}
          <div className="space-y-6">
            
            {/* Recent Reports */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Meus Laudos Recentes</h2>
              <div className="space-y-3">
                {patientData.recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{report.title}</p>
                        <p className="text-xs text-gray-500">{report.date} • {report.doctor}</p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-emerald-600 p-2 transition-colors">
                      <Download size={18} />
                    </button>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                Ver histórico completo
              </button>
            </div>

            {/* Patient Mini-Profile */}
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
              <h3 className="text-sm font-bold text-emerald-900 mb-3">Informações de Saúde</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white p-3 rounded-xl border border-emerald-100/50">
                  <p className="text-emerald-600 text-xs font-semibold mb-1">Idade</p>
                  <p className="font-bold text-gray-900">{patientData.age} anos</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-emerald-100/50">
                  <p className="text-emerald-600 text-xs font-semibold mb-1">Tipo Sanguíneo</p>
                  <p className="font-bold text-gray-900">{patientData.bloodType}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}