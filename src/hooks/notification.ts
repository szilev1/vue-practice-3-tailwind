import { reactive } from 'vue'
import { NotificationType, type Notification } from './types'

export default function useNotification(): {
  displayNotification: (parameters: Omit<Notification, 'open'>) => void
  notification: Notification
} {
  const notification: Notification = reactive({
    message: null,
    open: false,
    type: NotificationType.Success
  })

  function displayNotification(parameters: Omit<Notification, 'open'>) {
    notification.message = parameters.message
    notification.open = true
    notification.type = parameters.type
  }

  return { displayNotification, notification }
}
