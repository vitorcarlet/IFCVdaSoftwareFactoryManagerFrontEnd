export type ConfigurationsGeneral = {
  items: BusinessConfigs
  success: boolean
  loading?: boolean // Usamos essa essa propriedade como contexto virtual do swr
}

export type BusinessConfigs = {
  shortLink: string
  appIdleTime: number
  appIdleTimeReason: boolean
  appShowGallery: boolean
  appBlockExecutationSameTime: boolean
  appSavePhotoGallery: boolean
  appKmRequired: boolean
  calendarBlockSameTimeAppointment: boolean
  calendarBlockSchedule: boolean
  calendarShowCustomFields: boolean
  companyName: string
  companyRs: string
  companyLogoBluetooth: string
  companyLogoPdf: string
  companyLogoWhite: string
  companyEmail: string
  companySite: string
  companyDocument: string | null
  companyIe: string | null
  companyPhoneA: string
  companyPhoneB: string | null
  companyPhoneC: string | null
  companyCountry: 1
  companyCountryExt: string
  companyState: number
  companyStateExt: string
  companyCity: number
  companyCityExt: string
  companyStreet: string
  companyDistrict: string
  companyLat: number
  companyLng: number
  companyZipcode: string | null
  serviceOrderTechnicianEdit: boolean
  serviceOrderStartEndLocation: boolean
  serviceOrderNumberAuto: boolean
  serviceOrderNextNumber: string | null
  showLocationInPhoto: boolean
  clientsDocumentRequired: boolean
  stockControl: boolean
  stockLowAlert: boolean
  stockDisableTechnicalReserve: boolean
  financialAutomaticTransactions: boolean
  financialTransactionsDays: number
  financialTransactionsRetroactiveDays: number
  notificationsActive: boolean
  notificationsEmailAddress: string[]
  emailHost: string
  emailName: string
  emailSender: string
  emailDiffSenderAuth: boolean
  emailAuthSender: string
  emailPassword: string
  emailPort: number
  emailSecurity: string
  integrationName: string
}

export type BusinessConfigsKeys = keyof BusinessConfigs
