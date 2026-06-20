import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Home,
  FileText,
  User,
  LogOut,
  Menu,
  X,
  HeartPulse,
  Search,
  Filter,
  Download,
  Stethoscope,
  Pill,
  ChevronLeft
} from "lucide-react"

// ── Dados Simulados do Paciente ─────────────────────────────────────────────
const patientName = "João Silva"

// ── Dados Simulados do Histórico ────────────────────────────────────────────
const historyData = [
  {
    id: "H-1001",
    type: "exam",
    title: "Hemograma Completo",
    date: "02 Nov 2024",
    doctor: "Dr. Rafael",
    location: "Laboratório São Lucas",
    status: "Concluído"
  },
  {
    id: "H-1002",
    type: "consultation",
    title: "Consulta de Rotina - Clínico Geral",
    date: "15 Out 2024",
    doctor: "Dra. Carla",
    location: "Clínica Vida Plena",
    status: "Realizada"
  },
  {
    id: "H-1003",
    type: "prescription",
    title: "Receita Médica - Losartana 50mg",
    date: "15 Out 2024",
    doctor: "Dra. Carla",
    location: "Clínica Vida Plena",
    status: "Ativa"
  },
  {
    id: "H-1004",
    type: "exam",
    title: "Raio-X de Tórax",
    date: "10 Jul 2024",
    doctor: "Dr. Marcos",
    location: "Centro de Imagem Avançada",
    status: "Concluído"
  },
  {
    id: "H-1005",
    type: "consultation",
    title: "Consulta - Cardiologia",
    date: "05 Jul 2024",
    doctor: "Dr. Marcos",
    location: "Instituto do Coração",
    status: "Realizada"
  }
]

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
}

// Helper para definir os ícones e cores com base no tipo de registro
const getTypeConfig = (type: string) => {
  switch (type) {
    case 'exam':
      return { icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' }
    case 'consultation':
      return { icon: Stethoscope, color: 'text-emerald-600', bg: 'bg-emerald-50' }
    case 'prescription':
      return { icon: Pill, color: 'text-purple-600', bg: 'bg-purple-50' }
    default:
      return { icon: FileText, color: 'text-gray-600', bg: 'bg-gray-50' }
  }
}

export default function PatientHistory() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("all") // all, exam, consultation, prescription
  const navigate = useNavigate()

  const navItems = [
    { icon: Home, label: "Início", path: "/dashboard" },
    { icon: FileText, label: "Meu Histórico", active: true, path: "/historico" },
    { icon: User, label: "Meu Perfil", path: "/perfil" },
  ]

  // Filtra os dados com base na pesquisa e nos botões de filtro
  const filteredHistory = historyData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.doctor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = activeFilter === "all" || item.type === activeFilter
    return matchesSearch && matchesFilter
  })

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
            {getInitials(patientName)}
          </div>
          <div>
            <p className="font-semibold text-gray-900 leading-tight">{patientName}</p>
            <p className="text-xs text-gray-500">Paciente</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
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
      <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
        
        {/* Header Section */}
        <div className="mb-8">
          <button 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors mb-4"
          >
            <ChevronLeft size={16} />
            Voltar para o Início
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Meu Histórico Médico</h1>
          <p className="text-gray-500 mt-1">Acompanhe todos os seus exames, consultas e receitas em um só lugar.</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-6 space-y-4">
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Buscar por médico, exame ou clínica..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <Filter size={18} className="text-gray-400 shrink-0 mr-2" />
            {[
              { id: "all", label: "Todos" },
              { id: "consultation", label: "Consultas" },
              { id: "exam", label: "Exames" },
              { id: "prescription", label: "Receitas" },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeFilter === filter.id 
                    ? "bg-gray-900 text-white" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item) => {
              const { icon: Icon, color, bg } = getTypeConfig(item.type)
              
              return (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-emerald-200 transition-colors group flex flex-col md:flex-row md:items-center gap-4">
                  
                  {/* Icon & Date */}
                  <div className="flex items-center gap-4 md:w-48 shrink-0">
                    <div className={`${bg} ${color} p-3 rounded-xl`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{item.date.split(' ')[0]}</p>
                      <p className="text-xs font-medium text-gray-500 uppercase">{item.date.split(' ').slice(1).join(' ')}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.doctor} • {item.location}</p>
                  </div>

                  {/* Actions & Status */}
                  <div className="flex items-center justify-between md:justify-end gap-4 mt-2 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 text-gray-600">
                      {item.status}
                    </span>
                    <button className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-2 rounded-lg transition-colors">
                      <Download size={16} />
                      <span className="md:hidden">Baixar</span>
                    </button>
                  </div>

                </div>
              )
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 border-dashed">
              <FileText size={48} className="mx-auto text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-900">Nenhum registro encontrado</h3>
              <p className="text-gray-500 text-sm mt-1">Tente ajustar seus filtros ou termo de pesquisa.</p>
            </div>
          )}
        </div>

      </main>
    </div>
  )
}