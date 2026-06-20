import { useState, useEffect } from "react"
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
  Download,
  Pill,
  Clock,
  Printer
} from "lucide-react"
import { dashboardService, setAuthToken } from "../services/api"

// ── Dados Simulados do Paciente Logado ───────────────────────────────────────
const patientData = {
  id: "PAC-1001",
  name: "João Silva",
  age: 34,
  bloodType: "O+",
  activeTreatments: [
    {
      id: "TRT-001",
      medication: "Losartana 50mg",
      dosage: "1 comprimido",
      frequency: "A cada 12 horas",
      duration: "Uso contínuo"
    },
    {
      id: "TRT-002",
      medication: "Vitamina D 10.000 UI",
      dosage: "1 cápsula",
      frequency: "1x por semana",
      duration: "Por 8 semanas"
    }
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
  const [data, setData] = useState<any>(patientData)
  const navigate = useNavigate()

  useEffect(() => {
    const t = localStorage.getItem('token')
    if (t) setAuthToken(t)

    const fetchPatientDashboard = async () => {
      try {
        const res = await dashboardService.getPatientDashboard()
        const resp = res.data
        // map backend shape to local patientData
        const mapped = {
          id: resp?.profile?.id || patientData.id,
          name: `${resp?.profile?.firstName || 'João'} ${resp?.profile?.lastName || 'Silva'}`,
          age: patientData.age,
          bloodType: patientData.bloodType,
          activeTreatments: patientData.activeTreatments,
          recentReports: (resp?.reportsHistory || []).map((r: any) => ({ id: r.id, title: r.title, date: r.createdAt || r.date, doctor: r.doctor ? `${r.doctor.firstName} ${r.doctor.lastName}` : r.doctor })),
        }
        setData(mapped)
      } catch (err) {
        // keep mock data on error
      }
    }

    fetchPatientDashboard()
  }, [])

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
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/relatorio-geral')}
            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
          >
            <Printer size={20} />
          </button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
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
            {getInitials(data.name)}
          </div>
          <div>
            <p className="font-semibold text-gray-900 leading-tight">{data.name}</p>
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
        <div className="hidden md:flex justify-end items-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/relatorio-geral')}
            className="flex items-center gap-2 bg-white border border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-4 py-2 rounded-lg font-medium transition-colors text-sm shadow-sm"
          >
            <Printer size={18} />
            Gerar Relatório
          </button>
          <button className="relative p-2 text-gray-400 hover:text-emerald-600 transition-colors bg-white rounded-full border border-gray-200 shadow-sm">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
          </button>
        </div>

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Olá, {data.name.split(' ')[0]}!</h1>
          <p className="text-gray-500 mt-1">Como você está se sentindo hoje?</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Coluna Principal (Esquerda) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Active Treatments Card */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-emerald-50 p-2.5 rounded-xl text-emerald-600">
                  <Pill size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Tratamentos Ativos</h2>
                  <p className="text-sm text-gray-500">Suas medicações e terapias em andamento</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {data.activeTreatments.map((treatment) => (
                  <div key={treatment.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 hover:bg-emerald-50/50 transition-colors rounded-xl border border-gray-100">
                    <div className="mb-3 sm:mb-0">
                      <p className="font-bold text-gray-900">{treatment.medication}</p>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                        <span className="font-medium">{treatment.dosage}</span>
                        <span className="text-gray-300">•</span>
                        <span>{treatment.duration}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
                      <Clock size={16} className="text-emerald-600" />
                      <span className="text-sm font-medium text-gray-700">{treatment.frequency}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Coluna Secundária (Direita) */}
          <div className="space-y-6">
            
            {/* Recent Reports */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Meus Laudos Recentes</h2>
              <div className="space-y-3">
                {data.recentReports.map((report) => (
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
              <button 
                onClick={() => navigate('/meu-historico')}
                className="w-full mt-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                Ver histórico completo
              </button>
            </div>

            {/* Patient Mini-Profile */}
            <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
              <h3 className="text-sm font-bold text-emerald-900 mb-3">Informações de Saúde</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white p-3 rounded-xl border border-emerald-100/50">
                  <p className="text-emerald-600 text-xs font-semibold mb-1">Idade</p>
                  <p className="font-bold text-gray-900">{data.age} anos</p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-emerald-100/50">
                  <p className="text-emerald-600 text-xs font-semibold mb-1">Tipo Sanguíneo</p>
                  <p className="font-bold text-gray-900">{data.bloodType}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}