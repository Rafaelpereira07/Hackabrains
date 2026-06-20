import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ChevronLeft, FileText, Edit3, Sparkles } from "lucide-react"

type Paciente = {
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

const initialPacientes: Paciente[] = [
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

const PacientePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const Paciente = initialPacientes.find((p) => p.id === id)

  if (!Paciente) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-xl shadow p-6 max-w-lg w-full text-center">
          <p className="text-lg font-semibold">Paciente não encontrado</p>
          <p className="text-sm text-gray-500 mt-2">Verifique o código ou volte para a lista de pacientes.</p>
          <div className="mt-4">
            <button onClick={() => navigate('/dashboard')} className="px-4 py-2 bg-emerald-500 text-white rounded-lg">Voltar ao Dashboard</button>
          </div>
        </div>
      </div>
    )
  }

  const reports = fakeReports[Paciente.id] || []

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 rounded-md hover:bg-gray-100"><ChevronLeft /></button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{Paciente.name}</h1>
            <p className="text-sm text-gray-500">Código: {Paciente.id} • {Paciente.age} anos</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={20} className="text-emerald-600" />
                <h2 className="text-lg font-semibold text-emerald-900">Análise de IA - Relatório Automático</h2>
              </div>
              <div className="bg-white rounded-lg p-4 space-y-3 text-sm text-gray-700">
                <div>
                  <p className="font-semibold text-emerald-800">Diagnóstico Assistido:</p>
                  <p className="text-gray-600">Com base no histórico de {Paciente.name} e contexto clínico, a IA sugere acompanhamento contínuo com foco em prevenção.</p>
                </div>
                <div>
                  <p className="font-semibold text-emerald-800">Plano de Ação:</p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 mt-1">
                    <li>Retorno em 30 dias para reavaliação</li>
                    <li>Solicitar exames complementares conforme protocolo</li>
                    <li>Orientar estilo de vida saudável</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-emerald-800">Próximas Recomendações:</p>
                  <p className="text-gray-600">Monitorar pressão arterial e glicemia regularmente. Reavaliar medicações conforme resultado dos exames.</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Detalhes</h2>
                <div className="flex items-center gap-2">
                  <button onClick={() => alert('Editar (demo)')} className="px-3 py-2 bg-emerald-50 text-emerald-700 rounded-md flex items-center gap-2"><Edit3 size={16}/>Editar</button>
                </div>
              </div>

              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <p className="font-medium">Telefone</p>
                  <p className="text-gray-500">{Paciente.phone || '—'}</p>
                </div>
                <div>
                  <p className="font-medium">E-mail</p>
                  <p className="text-gray-500">{Paciente.email || '—'}</p>
                </div>
                <div>
                  <p className="font-medium">Observações</p>
                  <p className="text-gray-500">Paciente em acompanhamento contínuo com histórico de consultas regulares.</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold mb-3">Laudos</h3>
            <div className="space-y-3">
              {reports.length === 0 && <p className="text-sm text-gray-500">Nenhum laudo disponível.</p>}
              {reports.map((r) => (
                <div key={r.id} className="border border-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{r.title}</p>
                      <p className="text-xs text-gray-500">{r.date} • {r.id}</p>
                    </div>
                    <button onClick={() => alert(r.summary)} className="text-emerald-600 hover:underline flex items-center gap-2"><FileText size={16}/>Resumo</button>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default PacientePage
