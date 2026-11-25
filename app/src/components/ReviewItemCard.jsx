import { useOrder } from '../context/OrderContext'
import { formatMoney } from '../utils/format'
import Icon from './Icon'
import QuantityStepper from './QuantityStepper'

export default function ReviewItemCard({ line }) {
  const { updateQuantity, removeItem } = useOrder()
  const badge = line.quantity > 1 ? `×${line.quantity} Ordered` : line.badge

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm transition-all hover:shadow-md relative overflow-hidden">
      {line.quantity > 1 && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
      )}
      <div className="flex flex-col sm:flex-row sm:items-start gap-space-md">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shrink-0 bg-surface-container relative flex items-center justify-center">
          {line.image ? (
            <img className="w-full h-full object-cover" alt={line.name} src={line.image} />
          ) : (
            <Icon className="text-tertiary text-[28px]">wine_bar</Icon>
          )}
          {badge && (
            <span className="absolute bottom-1 right-1 bg-surface-container-lowest/90 backdrop-blur-sm text-[10px] font-label-sm font-bold text-on-surface px-1.5 py-0.5 rounded">
              {badge}
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">
                {line.name}
              </h2>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-label-sm text-label-sm text-secondary font-medium">
                  {line.size}
                </span>
                <span className="text-outline-variant">•</span>
                <span className="bg-secondary-container/60 text-on-secondary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded-full uppercase">
                  {line.tag}
                </span>
              </div>
            </div>
            <button
              type="button"
              aria-label={`Remove ${line.name}`}
              onClick={() => removeItem(line.key)}
              className="text-outline hover:text-error transition-colors p-1 -mr-1"
            >
              <Icon className="text-[20px]">close</Icon>
            </button>
          </div>

          <div className="mt-4 pt-3 flex items-center justify-between border-t border-surface-container-high">
            <div className="flex items-center gap-3">
              <QuantityStepper
                value={line.quantity}
                onChange={(next) => updateQuantity(line.key, next - line.quantity)}
                min={0}
              />
              <span className="font-body-sm text-body-sm text-outline">
                {formatMoney(line.price)} ea
              </span>
            </div>
            <div className="text-right">
              <div className="font-title-md text-title-md text-on-surface font-bold">
                {formatMoney(line.price * line.quantity)}
              </div>
              <div className="font-label-sm text-label-sm text-outline-variant">
                {line.quantity} × {formatMoney(line.price)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
