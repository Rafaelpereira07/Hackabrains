import { useState } from "react"
import { useForm } from "react-hook-form"
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  Heart,
  Edit3,
  Trash2,
  Plus,
  Eye,
  CheckCircle2,
  Clock,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

// ── Tipagens Atualizadas ───────────────────────────────────────────────────────
export type Patient = {
  id: string
  name: string
  age: number
  phone?: string
  email?: string
  condition?: string // Campo adicionado
  obs?: string       // Campo adicionado
}

export type Report = {
  id: string
  title: string
  date: string
  summary: string
}

type Tab = "dashboard" | "patients" | "schedule" | "reports"

// ── Dados Simulados (Mock Data) ────────────────────────────────────────────────
const initialPatients: Patient[] = [
  { id: "PAC-1001", name: "João Silva", age: 34, phone: "(11) 99999-0001", email: "joao@example.com", condition: "Acompanhamento de Rotina" },
  { id: "PAC-1002", name: "Maria Santos", age: 28, phone: "(11) 99999-0002", email: "maria@example.com", condition: "Check-up Cardíaco" },
  { id: "PAC-1003", name: "Pedro Oliveira", age: 45, phone: "(11) 99999-0003", email: "pedro@example.com", condition: "Pós-operatório" },
  { id: "PAC-1004", name: "Ana Costa", age: 52, phone: "(11) 99999-0004", email: "ana@example.com", condition: "Hipertensão" },
]

const mockReports: Record<string, Report[]> = {
  "PAC-1001": [
    { id: "R-5001", title: "Hemograma Completo", date: "2024-11-02", summary: "Hemograma dentro dos parâmetros normais. Sem sinais de anemia." },
  ],
  "PAC-1002": [
    { id: "R-5003", title: "Eletrocardiograma", date: "2025-02-01", summary: "Ritmo sinusal, sem alterações isquêmicas detectadas." },
  ],
}

const scheduleItems = [
  { time: "09:00", patient: "Maria Santos", type: "Retorno", status: "Confirmado" },
  { time: "10:30", patient: "Pedro Oliveira", type: "Primeira Consulta", status: "Aguardando" },
  { time: "14:00", patient: "Ana Costa", type: "Exame de Rotina", status: "Confirmado" },
]

const activityItems = [
  { text: "Laudo de Hemograma gerado por IA para João Silva", time: "Há 10 minutos" },
  { text: "Consulta de Maria Santos confirmada", time: "Há 1 hora" },
  { text: "Novo paciente registrado (Ana Costa)", time: "Há 2 horas" },
]

// ── Funções Auxiliares ─────────────────────────────────────────────────────────
function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

// ── Modais ───────────────────────────────────────────────────────────────────
function EditPatientModal({ patient, onClose, onSave }: { patient: Patient, onClose: () => void, onSave: (p: Patient) => void }) {
  const { register, handleSubmit } = useForm<Patient>({ defaultValues: patient })
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold">Editar paciente</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit(onSave)} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Nome</label>
            <input {...register("name")} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Idade</label>
              <input type="number" {...register("age", { valueAsNumber: true })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Telefone</label>
              <input {...register("phone")} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">E-mail</label>
            <input {...register("email")} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Condição</label>
            <input {...register("condition")} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Observações</label>
            <textarea {...register("obs")} rows={3} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">Cancelar</button>
            <button type="submit" className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function AddPatientModal({ onClose, onAdd }: { onClose: () => void; onAdd: (p: Patient) => void }) {
  const { register, handleSubmit } = useForm<Omit<Patient, "id">>()
  const onSubmit = (data: Omit<Patient, "id">) => {
    onAdd({ ...data, id: `PAC-${Math.floor(1000 + Math.random() * 9000)}` })
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold">Novo paciente</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={18} /></button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Nome completo</label>
            <input {...register("name", { required: true })} placeholder="Nome do paciente" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Idade</label>
              <input type="number" {...register("age", { valueAsNumber: true })} placeholder="0" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Telefone</label>
              <input {...register("phone")} placeholder="(00) 00000-0000" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">E-mail</label>
            <input {...register("email")} placeholder="email@exemplo.com" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Condição / motivo</label>
            <input {...register("condition")} placeholder="ex: Hipertensão" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">Cancelar</button>
            <button type="submit" className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Cadastrar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Abas do Dashboard ─────────────────────────────────────────────────────────

function OverviewTab({ patients, onView }: { patients: Patient[]; onView: (id: string) => void }) {
  const totalReports = Object.values(mockReports).flat().length
  const confirmed = scheduleItems.filter((s) => s.status === "Confirmado").length

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-base font-semibold text-gray-900">Bem-vindo, Dr. Silva</h2>
        <p className="text-sm text-gray-500">Visão geral do atendimento clínico de hoje</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Pacientes ativos", value: patients.length, icon: Users },
          { label: "Consultas hoje", value: confirmed, icon: Calendar },
          { label: "Laudos disponíveis", value: totalReports, icon: FileText },
        ].map((m) => (
          <div key={m.label} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
            <p className="text-2xl font-semibold text-gray-900">{m.value}</p>
            <p className="text-xs text-gray-500 mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Users size={16} className="text-emerald-600" /> Pacientes recentes
          </h3>
          {patients.slice(0, 4).map((p) => (
            <div key={p.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                  {getInitials(p.name)}
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.condition || 'Sem condição listada'}</p>
                </div>
              </div>
              <button onClick={() => onView(p.id)} className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">Ver →</button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
            <Clock size={16} className="text-emerald-600" /> Atividade recente
          </h3>
          {activityItems.map((a, i) => (
            <div key={i} className="flex items-start gap-2.5 py-2 border-b border-gray-50 last:border-0">
              <CheckCircle2 size={14} className="text-emerald-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-gray-700">{a.text}</p>
                <p className="text-xs text-gray-400">{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PatientsTab({ patients, onView, onEdit, onDelete, onAdd }: { patients: Patient[]; onView: (id: string) => void; onEdit: (p: Patient) => void; onDelete: (id: string) => void; onAdd: () => void }) {
  const [q, setQ] = useState("")
  const filtered = patients.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.id.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold">Pacientes</h2>
          <p className="text-xs text-gray-500">{patients.length} registrados</p>
        </div>
        <button onClick={onAdd} className="flex items-center gap-1.5 px-3 py-2 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700 transition">
          <Plus size={14} /> Novo paciente
        </button>
      </div>

      <div className="relative">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Buscar por nome ou código..." value={q} onChange={(e) => setQ(e.target.value)} className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && <p className="text-center text-sm text-gray-400 py-8">Nenhum paciente encontrado.</p>}
        {filtered.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0">
                {getInitials(p.name)}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                <p className="text-xs text-gray-400 truncate">{p.id} · {p.age} anos · {p.condition || 'Sem condição listada'}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0 ml-2">
              <button onClick={() => onView(p.id)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-emerald-600" title="Ver paciente"><Eye size={15} /></button>
              <button onClick={() => onEdit(p)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700" title="Editar"><Edit3 size={15} /></button>
              <button onClick={() => { if (confirm("Tem certeza que deseja excluir este paciente?")) onDelete(p.id) }} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500" title="Excluir"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScheduleTab() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-semibold">Agendamentos</h2>
        <p className="text-xs text-gray-500">Consultas de hoje</p>
      </div>
      <div className="space-y-2">
        {scheduleItems.map((s, i) => (
          <div key={i} className="flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-100">
            <div className="text-sm font-semibold text-emerald-600 w-12 shrink-0">{s.time}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{s.patient}</p>
              <p className="text-xs text-gray-400">{s.type}</p>
            </div>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${s.status === "Confirmado" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{s.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ReportsTab({ patients }: { patients: Patient[] }) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-base font-semibold">Prontuários e Laudos</h2>
        <p className="text-xs text-gray-500">Todos os registros disponíveis</p>
      </div>
      {patients.map((p) => {
        const reps = mockReports[p.id] || []
        return (
          <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-4">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                {getInitials(p.name)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{p.name}</p>
                <p className="text-xs text-gray-400">{p.id} · {reps.length} laudos</p>
              </div>
            </div>
            {reps.length === 0 ? (
              <p className="text-xs text-gray-400">Nenhum laudo disponível.</p>
            ) : (
              <div className="space-y-2">
                {reps.map((r) => (
                  <div key={r.id} className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-xs font-medium text-gray-900">{r.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{r.date} · {r.id}</p>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{r.summary}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ── Dashboard Principal ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [patients, setPatients] = useState<Patient[]>(initialPatients)
  const [activeTab, setActiveTab] = useState<Tab>("dashboard")
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null)
  const [addingPatient, setAddingPatient] = useState(false)
  const navigate = useNavigate()

  const navItems: { icon: React.ElementType; label: string; tab: Tab }[] = [
    { icon: LayoutDashboard, label: "Dashboard", tab: "dashboard" },
    { icon: Users, label: "Pacientes", tab: "patients" },
    { icon: Calendar, label: "Agendamentos", tab: "schedule" },
    { icon: FileText, label: "Prontuários", tab: "reports" },
  ]

  const savePatient = (updated: Patient) => {
    setPatients((cur) => cur.map((p) => (p.id === updated.id ? updated : p)))
    setEditingPatient(null)
  }

  const addPatient = (p: Patient) => {
    setPatients((cur) => [p, ...cur])
    setAddingPatient(false)
  }

  const deletePatient = (id: string) => {
    setPatients((cur) => cur.filter((p) => p.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 h-14 flex items-center px-4 gap-3">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 hover:bg-gray-100 rounded-lg transition">
          <Menu size={18} className="text-gray-600" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Heart size={14} className="text-white" />
          </div>
          {sidebarOpen && <span className="text-sm font-semibold text-gray-900">ClinIA</span>}
        </div>
        <div className="flex-1" />
        <button className="relative p-1.5 text-gray-500 hover:text-emerald-600 transition">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>
        <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
          <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 text-xs font-medium">DS</div>
          <span className="text-xs text-gray-600 hidden sm:block">Dr. Silva</span>
        </div>
      </header>

      <div className="flex pt-14 min-h-screen">
        <aside className={`fixed left-0 top-14 bottom-0 bg-white border-r border-gray-200 z-30 transition-all duration-300 flex flex-col ${sidebarOpen ? "w-52" : "w-14"}`}>
          <nav className="flex-1 p-2 space-y-1">
            {navItems.map((item) => (
              <button key={item.tab} onClick={() => setActiveTab(item.tab)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition text-sm ${activeTab === item.tab ? "bg-emerald-50 text-emerald-700 font-medium" : "text-gray-600 hover:bg-gray-50"}`}>
                <item.icon size={18} className="shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
          <div className="p-2 border-t border-gray-200">
            {/* ROTA DE SAÍDA CORRIGIDA DE /homepage PARA / */}
            <button onClick={() => navigate("/")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-50 transition text-sm">
              <LogOut size={18} className="shrink-0" />
              {sidebarOpen && <span>Sair</span>}
            </button>
          </div>
        </aside>

        <main className={`flex-1 p-5 transition-all duration-300 ${sidebarOpen ? "ml-52" : "ml-14"}`}>
          <div className="max-w-4xl mx-auto">
            {/* ROTA DE PACIENTE CORRIGIDA DE /paciente/${id} PARA /patient/${id} */}
            {activeTab === "dashboard" && <OverviewTab patients={patients} onView={(id) => navigate(`/patient/${id}`)} />}
            {activeTab === "patients" && <PatientsTab patients={patients} onView={(id) => navigate(`/patient/${id}`)} onEdit={(p) => setEditingPatient(p)} onDelete={deletePatient} onAdd={() => setAddingPatient(true)} />}
            {activeTab === "schedule" && <ScheduleTab />}
            {activeTab === "reports" && <ReportsTab patients={patients} />}
          </div>
        </main>
      </div>

      {editingPatient && <EditPatientModal patient={editingPatient} onClose={() => setEditingPatient(null)} onSave={savePatient} />}
      {addingPatient && <AddPatientModal onClose={() => setAddingPatient(false)} onAdd={addPatient} />}
    </div>
  )
}