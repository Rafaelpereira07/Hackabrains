import { useState } from "react"
import {
  BarChart3,
  Users,
  Calendar,
  ClipboardList,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Activity,
  Heart,
  Edit3,
  Trash2,
  FileText,
  Sparkles,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

type Patient = {
  id: string
  name: string
  age: number
  phone?: string
  email?: string
}

type Report = {
  id: string
  title: string
  date: string
  summary: string
}

const initialPatients: Patient[] = [
  { id: "PAC-1001", name: "João Silva", age: 34, phone: "(11) 99999-0001", email: "joao@example.com" },
  { id: "PAC-1002", name: "Maria Santos", age: 28, phone: "(11) 99999-0002", email: "maria@example.com" },
  { id: "PAC-1003", name: "Pedro Oliveira", age: 45, phone: "(11) 99999-0003", email: "pedro@example.com" },
  { id: "PAC-1004", name: "Ana Costa", age: 52, phone: "(11) 99999-0004", email: "ana@example.com" },
]

const fakeReports: Record<string, Report[]> = {
  "PAC-1001": [
    { id: "R-5001", title: "Hemograma", date: "2024-11-02", summary: "Hemograma dentro dos parâmetros normais." },
    { id: "R-5002", title: "Raio-X", date: "2025-01-15", summary: "Sem alterações relevantes." },
  ],
  "PAC-1002": [
    { id: "R-5003", title: "Eletrocardiograma", date: "2025-02-01", summary: "Ritmo sinusal, sem alterações." },
  ],
  "PAC-1003": [{ id: "R-5004", title: "Ultrassom Abdominal", date: "2025-03-10", summary: "Colelitíase observada." }],
  "PAC-1004": [],
}

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [patients, setPatients] = useState<Patient[]>(initialPatients)
  const [searchQuery, setSearchQuery] = useState("")
  const [codeSearch, setCodeSearch] = useState("")
  const [editing, setEditing] = useState<Patient | null>(null)
  const [showReportsFor, setShowReportsFor] = useState<string | null>(null)
  const navigate = useNavigate()

  const openEditModal = (p: Patient) => setEditing(p)
  const closeEditModal = () => setEditing(null)

  const savePatient = (updated: Patient) => {
    setPatients((cur) => cur.map((p) => (p.id === updated.id ? updated : p)))
    closeEditModal()
  }

  const deletePatient = (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este paciente?")) return
    setPatients((cur) => cur.filter((p) => p.id !== id))
  }

  const handleCodeSearch = () => {
    const found = patients.find((p) => p.id.toLowerCase() === codeSearch.trim().toLowerCase())
    if (found) {
      // abrir modal de edição como exemplo
      openEditModal(found)
    } else {
      alert("Paciente não encontrado com esse código")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen bg-linear-to-b from-emerald-600 to-teal-700 text-white transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"} z-40`}>
        <div className="flex items-center justify-between h-20 px-4 sm:px-6 border-b border-emerald-500">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <Heart size={24} />
              <h1 className="text-lg sm:text-xl font-bold">Hackabrains</h1>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-emerald-700 rounded-lg transition">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-2 sm:px-3 py-4 space-y-2">
          {[
            { icon: BarChart3, label: "Dashboard", active: true },
            { icon: Users, label: "Pacientes" },
            { icon: Calendar, label: "Agendamentos" },
            { icon: ClipboardList, label: "Prontuários" },
            { icon: Activity, label: "Atividades" },
            { icon: Settings, label: "Configurações" },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition text-sm sm:text-base ${
                item.active ? "bg-emerald-500 text-white shadow-lg" : "text-emerald-100 hover:bg-emerald-700"
              }`}
            >
              <item.icon size={20} className="shrink-0" />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-2 sm:p-3 border-t border-emerald-500">
          <button onClick={() => navigate('/login')} className="w-full flex items-center gap-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-emerald-100 hover:bg-emerald-700 transition text-sm sm:text-base">
            <LogOut size={20} className="shrink-0" />
            {sidebarOpen && <span className="font-medium">Sair</span>}
          </button>
        </div>
      </aside>

      <main className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        <header className="bg-white border-b border-gray-200 h-20 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex-1 max-w-md">
            <div className="relative hidden sm:block">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Buscar pacientes..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition text-sm" />
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden sm:flex items-center gap-2">
              <input value={codeSearch} onChange={(e) => setCodeSearch(e.target.value)} placeholder="Código do paciente (ex: PAC-1001)" className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none" />
              <button onClick={handleCodeSearch} className="px-3 py-2 bg-emerald-500 text-white rounded-lg text-sm">Buscar</button>
            </div>

            <button className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition">
              <Search size={20} className="text-gray-600" />
            </button>

            <button className="relative p-2 text-gray-600 hover:text-emerald-600 transition">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 sm:pl-6 border-l border-gray-200">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">Dr. Rafael</p>
                <p className="text-xs text-gray-500">Médico Geral</p>
              </div>
              <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">DR</div>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h2>
              <p className="text-gray-500 text-sm sm:text-base mt-1">Visão geral dos seus pacientes e atividades</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => { setPatients((p) => [{ id: `PAC-${Math.floor(1000 + Math.random() * 9000)}`, name: "Novo Paciente", age: 30 }, ...p]) }} className="px-4 py-2 bg-emerald-500 text-white rounded-lg shadow">Adicionar Paciente</button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl shadow-sm p-4 sm:p-6 border border-emerald-200">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles size={24} className="text-emerald-600" />
                  <h3 className="text-lg font-bold text-emerald-900">Análise de IA</h3>
                </div>
                <div className="bg-white rounded-lg p-4 text-sm text-gray-700">
                  <p className="mb-3"><strong>Relatório Automático:</strong> A IA integrada analisa o histórico de todos os pacientes e gera recomendações de tratamento em tempo real.</p>
                  <p className="mb-3"><strong>Plano de Ação:</strong> Próximos passos clinicamente definidos com base em evidências e contexto histórico.</p>
                  <p><strong>Decisão Assistida:</strong> Auxilia o médico na tomada de decisão clínica com análise estruturada e baseada em dados.</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Pacientes</h3>
                  <p className="text-sm text-gray-500">Mostrando {patients.length} pacientes</p>
                </div>

                <div className="space-y-2">
                  {patients.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase())).map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">{p.name.split(' ').map(n=>n[0]).slice(0,2).join('')}</div>
                        <div className="min-w-0 cursor-pointer" onClick={() => navigate(`/patient/${p.id}`)}>
                          <p className="font-medium text-gray-900 truncate">{p.name}</p>
                          <p className="text-xs text-gray-500">{p.id} • {p.age} anos</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button onClick={() => openEditModal(p)} className="p-2 rounded-md hover:bg-gray-100" title="Editar"><Edit3 size={18} /></button>
                        <button onClick={() => deletePatient(p.id)} className="p-2 rounded-md hover:bg-gray-100 text-red-600" title="Excluir"><Trash2 size={18} /></button>
                        <button onClick={() => setShowReportsFor(p.id)} className="p-2 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-2"> <FileText size={16} /> Laudos</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
                <h3 className="text-lg font-bold mb-3">Busca por Código</h3>
                <p className="text-sm text-gray-500 mb-3">Insira o código do paciente para acessá-lo rapidamente.</p>
                <div className="flex gap-2">
                  <input value={codeSearch} onChange={(e)=>setCodeSearch(e.target.value)} placeholder="ex: PAC-1001" className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
                  <button onClick={handleCodeSearch} className="px-3 py-2 bg-emerald-500 text-white rounded-lg">Buscar</button>
                </div>
              </div>

              <div className="mt-4 bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100">
                <h3 className="text-lg font-bold mb-3">Atividade Recente</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>Consulta confirmada com João Silva</div>
                  <div>Novo paciente registrado: Maria Santos</div>
                  <div>Prontuário atualizado: Pedro Oliveira</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closeEditModal}></div>
          <div className="relative z-10 w-full max-w-xl bg-white rounded-xl p-6 sm:p-8 shadow-2xl">
            <h3 className="text-lg font-bold mb-4">Editar Paciente</h3>
            <EditPatientForm patient={editing} onCancel={closeEditModal} onSave={savePatient} />
          </div>
        </div>
      )}

      {/* Reports Modal */}
      {showReportsFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={()=>setShowReportsFor(null)}></div>
          <div className="relative z-10 w-full max-w-2xl bg-white rounded-xl p-6 sm:p-8 shadow-2xl max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Laudos de {patients.find(p=>p.id===showReportsFor)?.name}</h3>
              <button onClick={()=>setShowReportsFor(null)} className="p-2 rounded-md hover:bg-gray-100"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              {(fakeReports[showReportsFor] || []).map(r=> (
                <div key={r.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold">{r.title}</p>
                      <p className="text-xs text-gray-500">{r.date} • ID: {r.id}</p>
                    </div>
                    <button onClick={() => alert(r.summary)} className="text-emerald-600 hover:underline flex items-center gap-2"><FileText size={16}/> Ver resumo</button>
                  </div>
                  <p className="text-sm text-gray-600">{r.summary}</p>
                </div>
              ))}
              {((fakeReports[showReportsFor]||[]).length === 0) && (
                <p className="text-sm text-gray-500">Nenhum laudo disponível para este paciente.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function EditPatientForm({ patient, onCancel, onSave }:{ patient: Patient, onCancel:()=>void, onSave:(p:Patient)=>void }){
  const [form, setForm] = useState<Patient>(patient)

  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSave(form)}} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
        <input value={form.id} onChange={(e)=>setForm({...form,id:e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
        <input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Idade</label>
          <input type="number" value={form.age} onChange={(e)=>setForm({...form,age:Number(e.target.value)})} className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
          <input value={form.phone||''} onChange={(e)=>setForm({...form,phone:e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input value={form.email||''} onChange={(e)=>setForm({...form,email:e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-lg" />
      </div>
      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg border">Cancelar</button>
        <button type="submit" className="px-4 py-2 rounded-lg bg-emerald-500 text-white">Salvar</button>
      </div>
    </form>
  )
}

export default Dashboard