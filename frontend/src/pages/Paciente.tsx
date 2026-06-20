import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ChevronLeft, FileText, Edit3, Sparkles, X, Loader2, RefreshCw } from "lucide-react"
import { useForm } from "react-hook-form"

// ── Tipagens ──────────────────────────────────────────────────────────────────
export type Patient = {
  id: string
  name: string
  age: number
  phone?: string
  email?: string
  condition?: string
  obs?: string
  lastVisit?: string // <-- Campo adicionado para corrigir o erro
}

export type Report = {
  id: string
  title: string
  date: string
  summary: string
}

type ConsultationForm = {
  queixa: string
  sintomas: string
  vitais: string
  obs: string
}

// ── Dados Simulados (Mock Data) ────────────────────────────────────────────────
const initialPatients: Patient[] = [
  { id: "PAC-1001", name: "João Silva", age: 34, phone: "(11) 99999-0001", email: "joao@example.com", condition: "Acompanhamento de Rotina", lastVisit: "15/05/2026" },
  { id: "PAC-1002", name: "Maria Santos", age: 28, phone: "(11) 99999-0002", email: "maria@example.com", condition: "Check-up Cardíaco", lastVisit: "02/06/2026" },
  { id: "PAC-1003", name: "Pedro Oliveira", age: 45, phone: "(11) 99999-0003", email: "pedro@example.com", condition: "Pós-operatório", lastVisit: "18/06/2026" },
  { id: "PAC-1004", name: "Ana Costa", age: 52, phone: "(11) 99999-0004", email: "ana@example.com", condition: "Hipertensão", lastVisit: "10/01/2026" },
]

const mockReports: Record<string, Report[]> = {
  "PAC-1001": [
    { id: "R-5001", title: "Hemograma Completo", date: "2024-11-02", summary: "Hemograma dentro dos parâmetros normais. Sem sinais de anemia." },
  ],
  "PAC-1002": [
    { id: "R-5003", title: "Eletrocardiograma", date: "2025-02-01", summary: "Ritmo sinusal, sem alterações isquêmicas detectadas." },
  ],
}

// ── Simulação do Serviço de IA ─────────────────────────────────────────────────
const generateClinicalReport = async (patient: Patient, reports: Report[], data: ConsultationForm): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`
        <h4>Análise Clínica Integrada</h4>
        <p>Paciente relata <strong>${data.queixa || 'queixas inespecíficas'}</strong>, acompanhado de sintomas de ${data.sintomas || 'difícil caracterização'}. Dados vitais registrados: ${data.vitais || 'Não informados'}.</p>
        
        <h4>Hipótese Diagnóstica Assistida</h4>
        <p>Considerando o histórico de ${patient.condition || 'condições prévias'} e os sintomas atuais, há indícios de quadro inflamatório leve ou exacerbação da condição base.</p>
        
        <h4>Plano de Ação Recomendado</h4>
        <ul>
          <li>Solicitar exames laboratoriais de rotina e marcadores inflamatórios.</li>
          <li>Reavaliação em 15 dias ou retorno imediato em caso de piora.</li>
          <li>Manter tratamento atual com atenção às observações: ${data.obs || 'Nenhuma'}.</li>
        </ul>
      `)
    }, 2000) // Simula 2 segundos de carregamento da IA
  })
}

// ── Funções Auxiliares ─────────────────────────────────────────────────────────
function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
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

function ConsultationModal({ patientName, onClose, onSubmit, isLoading }: { patientName: string, onClose: () => void, onSubmit: (data: ConsultationForm) => void, isLoading: boolean }) {
  const { register, handleSubmit } = useForm<ConsultationForm>()
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={!isLoading ? onClose : undefined} />
      <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl p-6 shadow-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold">Nova consulta</h3>
          {!isLoading && (
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100"><X size={18} /></button>
          )}
        </div>
        <p className="text-xs text-gray-500 mb-5">
          {patientName} — preencha os dados para gerar o relatório com IA
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Queixa principal</label>
            <textarea {...register("queixa", { required: true })} rows={2} placeholder="Descreva o motivo da consulta..." className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Sintomas relatados</label>
            <textarea {...register("sintomas")} rows={2} placeholder="Quais sintomas o paciente está apresentando?" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Dados vitais</label>
            <input {...register("vitais")} placeholder="ex: PA 130/85, FC 78, SpO2 98%" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Observações adicionais</label>
            <textarea {...register("obs")} rows={2} placeholder="Medicamentos em uso, alergias, observações..." className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            {!isLoading && (
              <button type="button" onClick={onClose} className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">Cancelar</button>
            )}
            <button type="submit" disabled={isLoading} className="flex items-center gap-2 px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed">
              {isLoading ? (
                <><Loader2 size={14} className="animate-spin" /> Gerando relatório...</>
              ) : (
                <><Sparkles size={14} /> Gerar Relatório com IA</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Página do Paciente ────────────────────────────────────────────────────────

const PacientePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [patients, setPatients] = useState(initialPatients)
  const [editing, setEditing] = useState(false)
  const [showConsultation, setShowConsultation] = useState(false)
  const [aiReport, setAiReport] = useState<string | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState<string | null>(null)

  const patient = patients.find((p) => p.id === id)

  if (!patient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-xl border border-gray-100 p-8 max-w-sm w-full text-center">
          <p className="text-base font-semibold text-gray-900 mb-2">Paciente não encontrado</p>
          <p className="text-sm text-gray-500 mb-5">Verifique o código ou volte para o dashboard.</p>
          <button onClick={() => navigate("/dashboard")} className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700">
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    )
  }

  const reports = mockReports[patient.id] || []

  const handleSave = (updated: Patient) => {
    setPatients((cur) => cur.map((p) => (p.id === updated.id ? updated : p)))
    setEditing(false)
  }

  const handleConsultation = async (data: ConsultationForm) => {
    setAiLoading(true)
    setAiError(null)
    try {
      // Chama o mock de IA criado acima
      const result = await generateClinicalReport(patient, reports, data)
      setAiReport(result)
      setShowConsultation(false)
    } catch (err) {
      setAiError("Erro ao conectar com a IA. Tente novamente.")
      console.error(err)
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 h-14 flex items-center gap-3 sticky top-0 z-30">
        <button onClick={() => navigate(-1)} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">{patient.name}</p>
          <p className="text-xs text-gray-400 truncate">{patient.id} · {patient.age} anos</p>
        </div>
        <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition">
          <Edit3 size={13} /> Editar
        </button>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold shrink-0">
            {getInitials(patient.name)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-base font-semibold text-gray-900">{patient.name}</p>
            <p className="text-xs text-gray-500">{patient.id} · {patient.age} anos · {patient.condition}</p>
            {patient.lastVisit && <p className="text-xs text-gray-400 mt-0.5">Última consulta: {patient.lastVisit}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-emerald-600" />
                <h2 className="text-sm font-semibold text-emerald-900">Análise de IA — Relatório Assistido</h2>
              </div>

              {aiReport ? (
                <div>
                  <div className="bg-white rounded-lg p-4 text-sm text-gray-700 leading-relaxed ai-report-content [&_h4]:font-semibold [&_h4]:text-emerald-800 [&_h4]:mt-3 [&_h4]:mb-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-0.5 [&_p]:text-gray-600 [&_li]:text-gray-600" dangerouslySetInnerHTML={{ __html: aiReport }} />
                  <button onClick={() => setShowConsultation(true)} className="mt-3 flex items-center gap-1.5 text-xs text-emerald-700 hover:text-emerald-800 font-medium">
                    <RefreshCw size={12} /> Nova consulta
                  </button>
                </div>
              ) : (
                <div>
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                    Gere um relatório clínico estruturado com base no histórico deste paciente e nos dados da consulta atual. A IA analisará o contexto completo e entregará hipóteses diagnósticas e plano de ação.
                  </p>
                  {aiError && <p className="text-xs text-red-600 mb-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{aiError}</p>}
                  <button onClick={() => setShowConsultation(true)} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-xs font-medium rounded-lg hover:bg-emerald-700 transition">
                    <Sparkles size={13} /> Iniciar Consulta e Gerar IA
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Informações do paciente</h2>
              <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                <div><p className="text-xs text-gray-400 mb-0.5">Telefone</p><p className="text-gray-700">{patient.phone || "—"}</p></div>
                <div><p className="text-xs text-gray-400 mb-0.5">E-mail</p><p className="text-gray-700">{patient.email || "—"}</p></div>
                <div><p className="text-xs text-gray-400 mb-0.5">Condição</p><p className="text-gray-700">{patient.condition || "—"}</p></div>
                <div><p className="text-xs text-gray-400 mb-0.5">Última consulta</p><p className="text-gray-700">{patient.lastVisit || "—"}</p></div>
              </div>
              <div><p className="text-xs text-gray-400 mb-0.5">Observações clínicas</p><p className="text-sm text-gray-700 leading-relaxed">{patient.obs || "—"}</p></div>
            </div>
          </div>

          <aside className="bg-white rounded-xl border border-gray-100 p-4 h-fit">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FileText size={14} className="text-emerald-600" /> Laudos ({reports.length})
            </h3>
            {reports.length === 0 ? (
              <p className="text-xs text-gray-400">Nenhum laudo disponível.</p>
            ) : (
              <div className="space-y-2">
                {reports.map((r) => (
                  <div key={r.id} className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-xs font-medium text-gray-900">{r.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{r.date} · {r.id}</p>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">{r.summary}</p>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>

      {editing && <EditPatientModal patient={patient} onClose={() => setEditing(false)} onSave={handleSave} />}
      {showConsultation && <ConsultationModal patientName={patient.name} onClose={() => setShowConsultation(false)} onSubmit={handleConsultation} isLoading={aiLoading} />}
    </div>
  )
}

export default PacientePage