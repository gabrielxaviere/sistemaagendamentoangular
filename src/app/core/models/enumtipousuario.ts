export const TipoUsuario = {
  ADMIN: { value: 0, description: 'Nível 0 - ADMIN' },
  PROFISSIONAL_SAUDE: { value: 1, description: 'Nível 1 - PROFISSIONAL_SAUDE' },
  PACIENTE: { value: 2, description: 'Nível 2 - PACIENTE' },
  ATENDENTE: { value: 3, description: 'Nível 3 - ATENDENTE' },
} as const;
