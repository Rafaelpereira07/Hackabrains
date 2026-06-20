import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { 
  ArrowLeft, 
  Sparkles, 
  FileText, 
  CheckCircle, 
  Download, 
  Loader2, 
  Bot,
  FileCheck,
  Activity
} from "lucide-react"

export default function GenerateReport() {
  const navigate = useNavigate()
  
  // Estados para simular a geração do relatório pela IA
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [statusText, setStatusText] = useState("Iniciando motor de IA...")

  // Simulação de carregamento
  useEffect(() => {
    const duration = 6000 // 6 segundos de simulação
    const intervalTime = 100
    const steps = duration / intervalTime

    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      const currentProgress = Math.min((currentStep / steps) * 100, 100)
      setProgress(currentProgress)

      // Atualiza o texto dependendo do progresso para simular o trabalho da IA
      if (currentProgress < 20) {
        setStatusText("Coletando histórico médico...")
      } else if (currentProgress < 45) {
        setStatusText("Processando laudos recentes com IA...")
      } else if (currentProgress < 75) {
        setStatusText("Cruzando dados de tratamentos ativos...")
      } else if (currentProgress < 95) {
        setStatusText("Formatando insights inteligentes...")
      } else if (currentProgress >= 100) {
        setStatusText("Relatório finalizado com sucesso!")
        setIsComplete(true)
        clearInterval(interval)
      }
    }, intervalTime)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 h-16 flex items-center px-4 md:px-8 sticky top-0 z-40">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          <span>Voltar ao Início</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="max-w-xl w-full">
          
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-xl shadow-emerald-900/5 text-center relative overflow-hidden">
            
            {/* Decoração de fundo */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-50 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-teal-50 rounded-full blur-3xl opacity-50"></div>

            <div className="relative z-10">
              
              {/* Ícone Principal animado */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-colors duration-500 ${isComplete ? 'bg-emerald-100 text-emerald-600' : 'bg-linear-to-br from-emerald-500 to-teal-600 text-white shadow-lg'}`}>
                    {isComplete ? <FileCheck size={48} /> : <Bot size={48} className="animate-pulse" />}
                  </div>
                  
                  {!isComplete && (
                    <div className="absolute -top-2 -right-2 bg-white p-1.5 rounded-full shadow-sm text-yellow-500 animate-spin-slow">
                      <Sparkles size={20} />
                    </div>
                  )}
                  {isComplete && (
                    <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-sm text-emerald-500">
                      <CheckCircle size={24} className="fill-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Textos */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {isComplete ? "Relatório Inteligente Gerado!" : "Gerando Relatório..."}
              </h1>
              <p className="text-gray-500 font-medium mb-8 h-6 flex items-center justify-center gap-2">
                {!isComplete && <Loader2 size={16} className="animate-spin text-emerald-600" />}
                {statusText}
              </p>

              {/* Barra de Progresso */}
              {!isComplete ? (
                <div className="space-y-2 mb-8">
                  <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-linear-to-r from-emerald-500 to-teal-500 transition-all duration-200 ease-out rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-right text-sm font-bold text-emerald-600">{Math.round(progress)}%</p>
                </div>
              ) : (
                /* Card de Resumo do Relatório (Aparece ao terminar) */
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-left mb-8 animate-fade-in-up">
                  <h3 className="font-bold text-emerald-900 mb-4 flex items-center gap-2">
                    <Sparkles size={18} className="text-emerald-600" />
                    O que a IA incluiu no documento:
                  </h3>
                  <ul className="space-y-3 text-sm text-emerald-800">
                    <li className="flex items-start gap-2">
                      <Activity size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                      <span>Análise comparativa dos últimos 3 laudos (Hemograma e Raio-X).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Activity size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                      <span>Verificação de interações medicamentosas dos 2 tratamentos ativos.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Activity size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                      <span>Gráfico preditivo de estabilidade da pressão arterial.</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* Botões de Ação */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button 
                  disabled={!isComplete}
                  className={`flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold transition-all ${
                    isComplete 
                      ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg translate-y-0" 
                      : "bg-gray-100 text-gray-400 cursor-not-allowed opacity-70"
                  }`}
                >
                  <Download size={20} />
                  Baixar PDF
                </button>
                
                {isComplete && (
                  <button className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all">
                    <FileText size={20} />
                    Visualizar Online
                  </button>
                )}
              </div>

            </div>
          </div>
          
        </div>
      </main>
      
    </div>
  )
}