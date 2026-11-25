import { Link } from 'react-router-dom'
import { useOrder } from '../context/OrderContext'
import { formatMoney } from '../utils/format'
import Icon from './Icon'
import QuantityStepper from './QuantityStepper'

export default function OrderSummary() {
  const {
    order,
    notes,
    setNotes,
    clearOrder,
    totals,
    orderTypeLabel,
    updateQuantity,
  } = useOrder()

  const handleClear = () => {
    if (window.confirm('Clear your current table order items?')) {
      clearOrder()
    }
  }

  return (
    <aside id="order" className="lg:col-span-5 xl:col-span-4 sticky top-28">
      <div className="bg-surface-container-lowest rounded-2xl shadow-xl p-space-lg flex flex-col">
        <div className="flex items-center justify-between pb-space-sm border-b border-surface-container">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">
                Your Order
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold">
                ({totals.itemCount} items)
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-secondary font-medium flex items-center gap-1 mt-0.5">
              <Icon className="text-[15px]">location_on</Icon>
              <span>{orderTypeLabel}</span>
            </p>
          </div>
          <button
            type="button"
            onClick={handleClear}
            className="text-on-surface-variant hover:text-error transition-colors p-1"
            title="Clear Order"
            aria-label="Clear order"
          >
            <Icon className="text-[20px]">delete_sweep</Icon>
          </button>
        </div>

        <div className="flex flex-col divide-y divide-surface-container py-space-sm max-h-[340px] overflow-y-auto">
          {order.length === 0 && (
            <p className="py-6 text-center font-body-sm text-body-sm text-on-surface-variant">
              Your order is empty. Add something delicious from the menu.
            </p>
          )}
          {order.map((line) => (
            <div key={line.key} className="py-3 flex flex-col gap-1.5">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="font-title-md text-body-lg text-on-surface font-semibold">
                    {line.name}
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                    {line.sizeLabel}
                  </span>
                </div>
                <span className="font-title-md text-title-md text-on-surface font-semibold">
                  {formatMoney(line.price * line.quantity)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <QuantityStepper
                  value={line.quantity}
                  onChange={(next) => updateQuantity(line.key, next - line.quantity)}
                  size="sm"
                  min={0}
                />
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {formatMoney(line.price)} ea
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-space-sm pt-space-xs">
          <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">
            Kitchen &amp; Dietary Notes
          </label>
          <textarea
            className="w-full bg-surface-container-low text-on-surface p-2.5 rounded-lg text-body-sm font-body-sm placeholder:text-on-surface-variant/70 focus:outline-none focus:bg-surface-container-lowest shadow-inner resize-none"
            placeholder="Add kitchen notes (allergies, dressing on side...)"
            rows="2"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>

        <div className="mt-space-md pt-space-sm border-t border-surface-container space-y-1.5">
          <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
            <span>Subtotal</span>
            <span className="font-medium text-on-surface">
              {formatMoney(totals.subtotal)}
            </span>
          </div>
          <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
            <span>Estimated Tax (8.5%)</span>
            <span className="font-medium text-on-surface">
              {formatMoney(totals.tax)}
            </span>
          </div>
          <div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
            <span className="flex items-center gap-1">
              Hospitality Service (10%)
              <Icon className="text-[14px]">info</Icon>
            </span>
            <span className="font-medium text-on-surface">
              {formatMoney(totals.menuService)}
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-surface-container font-title-md text-title-md text-on-surface font-bold">
            <span>Current Total</span>
            <span className="text-primary text-xl font-headline-sm text-headline-sm">
              {formatMoney(totals.menuTotal)}
            </span>
          </div>
        </div>

        <div className="mt-space-md flex flex-col gap-1.5">
          <Link
            to="/checkout"
            className="w-full py-3.5 px-space-md rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-2 group"
          >
            <span>Ready to Pay • {formatMoney(totals.menuTotal)}</span>
            <Icon className="text-[18px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </Icon>
          </Link>
          <p className="text-center font-label-sm text-label-sm text-on-surface-variant">
            Proceed to order review and final submission
          </p>
        </div>
      </div>
    </aside>
  )
}
