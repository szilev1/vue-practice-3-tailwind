export interface Notification {
  message: string | null
  open: boolean
  type: NotificationType
}

export enum NotificationType {
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Success = 'success'
}
