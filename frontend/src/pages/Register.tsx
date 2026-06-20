import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, UserPlus, User, Briefcase } from 'lucide-react'
import { authService } from '../services/api'

type RegisterForm = {
  email: string
  password: string
  role: 'PATIENT' | 'DOCTOR'
  firstName: string
  lastName: string
  cpf?: string
  dateOfBirth?: string
  phone?: string
  specialty?: string
  licenseNumber?: string
}

export default function Register() {
  const navigate = useNavigate()
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RegisterForm>({ defaultValues: { role: 'PATIENT' } })
  const role = watch('role')

  const onSubmit = async (data: RegisterForm) => {
    try {
        console.log(data)
      await authService.register(data)
      alert('Cadastro realizado com sucesso. Faça login.')
      navigate('/login')
    } catch (err: any) {
      console.error('register error', err?.response || err)
      const msg = err?.response?.data?.error || 'Erro ao criar conta'
      alert(msg)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 bg-emerald-600 rounded-2xl mb-3 flex items-center justify-center text-white">
              <UserPlus size={26} />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Criar Conta</h1>
            <p className="text-xs text-gray-500 mt-1">Cadastre-se como paciente ou médico</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Tipo de conta</label>
              <div className="flex gap-2">
                <label className={`flex-1 p-2 rounded-lg text-sm border ${role === 'PATIENT' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-gray-200'}`}>
                  <input {...register('role')} type="radio" value="PATIENT" className="hidden" />
                  <div className="flex items-center gap-2"><User size={14} /> Paciente</div>
                </label>
                <label className={`flex-1 p-2 rounded-lg text-sm border ${role === 'DOCTOR' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-gray-200'}`}>
                  <input {...register('role')} type="radio" value="DOCTOR" className="hidden" />
                  <div className="flex items-center gap-2"><Briefcase size={14} /> Médico</div>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Nome</label>
              <input {...register('firstName', { required: true })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl" placeholder="Nome" />
              {errors.firstName && <p className="text-xs text-red-500 mt-1">Nome obrigatório</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Sobrenome</label>
              <input {...register('lastName', { required: true })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl" placeholder="Sobrenome" />
              {errors.lastName && <p className="text-xs text-red-500 mt-1">Sobrenome obrigatório</p>}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">E-mail</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input {...register('email', { required: true })} type="email" className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl" placeholder="seu@email.com" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Senha</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input {...register('password', { required: true, minLength: 6 })} type="password" className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl" placeholder="Senha" />
              </div>
            </div>

            {role === 'PATIENT' && (
              <>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">CPF</label>
                      <input {...register('cpf', { required: role === 'PATIENT' })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl" placeholder="000.000.000-00" />
                      {errors.cpf && <p className="text-xs text-red-500 mt-1">CPF obrigatório</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Data de nascimento</label>
                      <input {...register('dateOfBirth', { required: role === 'PATIENT' })} type="date" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl" />
                      {errors.dateOfBirth && <p className="text-xs text-red-500 mt-1">Data de nascimento obrigatória</p>}
                    </div>
              </>
            )}

            {role === 'DOCTOR' && (
              <>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Especialidade</label>
                  <input {...register('specialty', { required: role === 'DOCTOR' })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl" placeholder="Cardiologia" />
                  {errors.specialty && <p className="text-xs text-red-500 mt-1">Especialidade obrigatória</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">CRM / Registro</label>
                  <input {...register('licenseNumber', { required: role === 'DOCTOR' })} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl" placeholder="123456" />
                  {errors.licenseNumber && <p className="text-xs text-red-500 mt-1">CRM / registro obrigatório</p>}
                </div>
              </>
            )}

            <div className="flex items-center justify-between">
              <button type="button" onClick={() => navigate('/login')} className="text-sm text-gray-500 hover:text-emerald-600">Já tenho conta</button>
              <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-xl hover:bg-emerald-700">{isSubmitting ? 'Cadastrando...' : 'Criar Conta'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
