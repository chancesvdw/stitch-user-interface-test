import { useOrder } from '../context/OrderContext'
import Icon from './Icon'

export default function Toast() {
  const { toastMessage } = useOrder()

  return (
    <div
      className={`fixed bottom-6 right-6 bg-surface-container-highest text-on-surface px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 transition-all duration-300 z-50 ${
        toastMessage
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 pointer-events-none translate-y-3'
      }`}
      role="status"
      aria-live="polite"
    >
      <Icon className="text-secondary text-[20px]">check_circle</Icon>
      <span className="font-body-sm text-body-sm font-semibold">
        {toastMessage || 'Item added to your order'}
      </span>
    </div>
  )
}
