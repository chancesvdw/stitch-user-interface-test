import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { winePairing } from '../data/menu'
import { useOrder } from '../context/OrderContext'
import { formatMoney } from '../utils/format'
import Icon from '../components/Icon'
import ReviewItemCard from '../components/ReviewItemCard'

const paymentOptions = [
  {
    id: 'card',
    title: 'Pre-authorized Card',
    subtitle: '•••• 4288 (Exp 08/28)',
    icon: 'VISA',
    iconClass: 'bg-surface-container-highest text-on-surface font-label-sm text-[10px] font-bold tracking-tighter',
    trailing: 'check_circle',
  },
  {
    id: 'apple',
    title: 'Apple Pay',
    subtitle: 'One-tap contactless verification',
    icon: 'phone_iphone',
    iconClass: 'bg-on-surface text-surface',
    trailingLabel: 'Fast',
  },
  {
    id: 'server',
    title: 'Pay Server at Table',
    subtitle: 'Cash, split bill, or concierge folio',
    icon: 'room_service',
    iconClass: 'bg-surface-container-highest text-on-surface',
    trailingLabel: 'At Exit',
  },
]

export default function CheckoutPage() {
  const {
    order,
    totals,
    notes,
    paymentMethod,
    setPaymentMethod,
    gratuity,
    setGratuity,
    ecoCutlery,
    setEcoCutlery,
    coursedService,
    setCoursedService,
    addItem,
    orderSubmitted,
    setOrderSubmitted,
  } = useOrder()
  const [customTipOpen, setCustomTipOpen] = useState(false)
  const [customTip, setCustomTip] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const handleGratuity = (value) => {
    if (value === 'custom') {
      setCustomTipOpen(true)
      setGratuity(Number(customTip) || 0)
      return
    }
    setCustomTipOpen(false)
    setGratuity(value)
  }

  const handleCustomTip = (value) => {
    setCustomTip(value)
    setGratuity(Number(value) || 0)
  }

  const handleSubmit = () => {
    if (submitting || orderSubmitted) return
    setSubmitting(true)
    timerRef.current = setTimeout(() => {
      setSubmitting(false)
      setOrderSubmitted(true)
    }, 1200)
  }

  const buttonLabel = orderSubmitted
    ? 'Order Received • Fire Table 14!'
    : submitting
      ? 'Transmitting to Kitchen...'
      : `SUBMIT ORDER (${formatMoney(totals.checkoutTotal)})`

  return (
    <main className="w-full pt-20 bg-surface min-h-[calc(100vh-280px)]">
      <div className="flex flex-col w-full">
        <div className="relative w-full overflow-hidden">
          <div className="absolute -top-32 right-12 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-96 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-[1240px] mx-auto px-margin py-space-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-space-md">
              <Link
                to="/"
                className="group inline-flex items-center gap-2 font-label-md text-label-md text-secondary hover:text-primary transition-colors"
              >
                <Icon className="text-[18px] transition-transform group-hover:-translate-x-1">
                  arrow_back
                </Icon>
                <span>Back to Menu (Modify Items)</span>
              </Link>
              <div className="flex items-center gap-3 self-start md:self-auto">
                <div className="flex items-center gap-2 bg-surface-container px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                    Kitchen Queue Active
                  </span>
                </div>
                <div className="bg-surface-container-high px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                  <Icon className="text-[16px] text-primary">receipt_long</Icon>
                  <span className="font-label-md text-label-md text-on-surface font-semibold tracking-tight">
                    Order #LS-8492
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-space-xs pb-space-lg flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest font-bold">
                    Checkout Step 2 of 2
                  </span>
                  <span className="text-outline-variant">•</span>
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-medium">
                    Table 14 — Seaside Terrace
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                  Review Your Order &amp; Ready to Pay
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1.5 leading-relaxed">
                  Please verify your selections, portion specifications, and
                  culinary notes prior to transmitting directly to Chef
                  Vincenzo’s hearth.
                </p>
              </div>
              <div className="flex items-center gap-3 bg-surface-container-lowest p-3 rounded-xl shadow-sm self-start lg:self-auto">
                <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-fixed flex items-center justify-center">
                  <Icon className="text-[22px]">timer</Icon>
                </div>
                <div>
                  <div className="font-label-sm text-label-sm uppercase text-secondary font-bold tracking-wider">
                    Fire-to-Table Est.
                  </div>
                  <div className="font-title-md text-title-md text-on-surface">
                    20 – 25 mins
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start pb-space-xl">
              <div className="lg:col-span-7 flex flex-col gap-space-md">
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className="font-headline-sm text-headline-sm text-on-surface">
                      Curated Selections
                    </span>
                    <span className="bg-surface-container text-on-surface-variant font-label-sm text-label-sm px-2.5 py-0.5 rounded-full font-semibold">
                      {totals.itemCount} Items ({totals.portions} Portions)
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider hidden sm:inline">
                    Pricing DOP / Direct Kitchen Line
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {order.length === 0 && (
                    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm text-center font-body-md text-body-md text-on-surface-variant">
                      No items yet. Head back to the menu to build your order.
                    </div>
                  )}
                  {order.map((line) => (
                    <ReviewItemCard key={line.key} line={line} />
                  ))}
                </div>

                {notes && (
                  <div className="bg-surface-container-low rounded-xl p-space-md">
                    <div className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold mb-1">
                      Your Kitchen Notes
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {notes}
                    </p>
                  </div>
                )}

                <div
                  id="pairing"
                  className="mt-space-sm bg-gradient-to-br from-surface-container-low via-surface-container to-secondary-container/20 p-space-md rounded-xl flex items-center justify-between gap-space-md scroll-mt-32"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0">
                      <Icon className="text-[20px]">wine_bar</Icon>
                    </div>
                    <div>
                      <div className="font-title-md text-title-md text-on-surface">
                        Complementary Wine Pairings?
                      </div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">
                        Chef suggests a glass of Vermentino di Sardegna with
                        Calamari &amp; Tagliolini.
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      addItem(winePairing, winePairing.sizes[0], 1)
                    }
                    className="px-3.5 py-1.5 rounded-full bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors shrink-0 shadow-sm"
                  >
                    Add Glass +$16
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-space-md lg:sticky lg:top-24">
                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-md">
                  <div className="flex items-center justify-between pb-space-sm">
                    <span className="font-headline-sm text-headline-sm text-on-surface">
                      Payment &amp; Finalize
                    </span>
                    <Icon className="text-secondary text-[22px]">
                      verified_user
                    </Icon>
                  </div>

                  <div className="space-y-space-sm pt-space-xs pb-space-md">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-bold block">
                      Method of Settlement
                    </span>
                    {paymentOptions.map((option) => {
                      const active = paymentMethod === option.id
                      return (
                        <label
                          key={option.id}
                          className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all ${
                            active
                              ? 'bg-surface-container-low'
                              : 'bg-surface-container-lowest hover:bg-surface-container-low'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="payment_method"
                              checked={active}
                              onChange={() => setPaymentMethod(option.id)}
                              className="w-4 h-4 accent-primary"
                            />
                            <div
                              className={`w-8 h-6 rounded flex items-center justify-center ${option.iconClass}`}
                            >
                              {option.icon === 'VISA' ? (
                                option.icon
                              ) : (
                                <Icon className="text-[16px]">{option.icon}</Icon>
                              )}
                            </div>
                            <div>
                              <div className="font-label-md text-label-md text-on-surface font-semibold">
                                {option.title}
                              </div>
                              <div className="font-body-sm text-body-sm text-on-surface-variant">
                                {option.subtitle}
                              </div>
                            </div>
                          </div>
                          {option.trailing && active ? (
                            <Icon className="text-primary text-[20px]">
                              {option.trailing}
                            </Icon>
                          ) : option.trailingLabel ? (
                            <span className="font-label-sm text-label-sm text-outline">
                              {option.trailingLabel}
                            </span>
                          ) : null}
                        </label>
                      )
                    })}
                  </div>

                  <div className="pt-space-sm pb-space-md space-y-2.5 bg-surface-container-low/60 -mx-space-lg px-space-lg py-space-sm">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={ecoCutlery}
                        onChange={(event) => setEcoCutlery(event.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded accent-secondary"
                      />
                      <span className="font-body-sm text-body-sm text-on-surface">
                        Include eco-friendly compostable cutlery &amp; linen
                        napkins
                      </span>
                    </label>
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={coursedService}
                        onChange={(event) =>
                          setCoursedService(event.target.checked)
                        }
                        className="mt-0.5 w-4 h-4 rounded accent-secondary"
                      />
                      <span className="font-body-sm text-body-sm text-on-surface">
                        Serve dishes “As Ready” (Coursed Mediterranean flow)
                      </span>
                    </label>
                  </div>

                  <div className="pt-space-md pb-space-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-label-sm text-label-sm uppercase text-outline font-bold">
                        Kitchen &amp; Hospitality Gratuity
                      </span>
                      <span className="font-label-sm text-label-sm text-secondary font-medium">
                        {gratuity}% Selected ({formatMoney(totals.tip)})
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 p-1 bg-surface-container-low rounded-xl">
                      {[15, 18, 20].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => handleGratuity(value)}
                          className={`py-1.5 text-center font-label-md text-label-md rounded-lg transition-colors ${
                            !customTipOpen && gratuity === value
                              ? 'bg-secondary text-on-secondary font-bold shadow-sm'
                              : 'text-on-surface-variant hover:bg-surface-container'
                          }`}
                        >
                          {value}%
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleGratuity('custom')}
                        className={`py-1.5 text-center font-label-md text-label-md rounded-lg transition-colors ${
                          customTipOpen
                            ? 'bg-secondary text-on-secondary font-bold shadow-sm'
                            : 'text-on-surface-variant hover:bg-surface-container'
                        }`}
                      >
                        Custom
                      </button>
                    </div>
                    {customTipOpen && (
                      <div className="mt-2 flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="Tip %"
                          value={customTip}
                          onChange={(event) => handleCustomTip(event.target.value)}
                          className="w-24 bg-surface-container-low text-on-surface p-2 rounded-lg text-body-sm font-body-sm focus:outline-none"
                        />
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Enter a percentage
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-space-sm pb-space-md space-y-2">
                    <div className="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
                      <span>Food &amp; Beverage Subtotal ({totals.portions} items)</span>
                      <span className="font-medium text-on-surface">
                        {formatMoney(totals.subtotal)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
                      <span>Coastal Municipal Tax (8.5%)</span>
                      <span className="font-medium text-on-surface">
                        {formatMoney(totals.tax)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-body-md text-body-md text-on-surface-variant">
                      <span>Service &amp; Culinary Staff ({gratuity}%)</span>
                      <span className="font-medium text-on-surface">
                        {formatMoney(totals.tip)}
                      </span>
                    </div>
                    <div className="pt-space-sm mt-space-sm bg-surface-container-low p-space-md rounded-xl flex items-baseline justify-between">
                      <div>
                        <div className="font-label-sm text-label-sm uppercase text-outline font-bold tracking-wider">
                          Total Due Now
                        </div>
                        <div className="font-body-sm text-body-sm text-secondary">
                          All taxes &amp; gratuity included
                        </div>
                      </div>
                      <div className="font-display-lg text-display-lg text-primary font-bold tracking-tight">
                        {formatMoney(totals.checkoutTotal)}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting || orderSubmitted}
                    className={`w-full mt-space-sm py-4 px-6 rounded-full text-on-primary font-title-md text-title-md transition-all duration-200 shadow-md flex items-center justify-center gap-2 group ${
                      orderSubmitted
                        ? 'bg-secondary'
                        : 'bg-primary hover:bg-primary-container hover:shadow-lg'
                    } disabled:cursor-default`}
                  >
                    {submitting ? (
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    ) : (
                      <Icon className="text-[20px] transition-transform group-hover:scale-110">
                        {orderSubmitted ? 'check' : 'lock'}
                      </Icon>
                    )}
                    <span className="tracking-wide">{buttonLabel}</span>
                  </button>

                  <div className="mt-3 flex items-center justify-center gap-1.5 text-outline font-label-sm text-label-sm">
                    <Icon className="text-[15px] text-secondary">flash_on</Icon>
                    <span>Direct encrypted push to Table 14 expeditor</span>
                  </div>

                  <div className="mt-space-md text-center">
                    <Link
                      to="/"
                      className="font-body-sm text-body-sm text-outline hover:text-primary transition-colors underline underline-offset-4"
                    >
                      Cancel Order or Return to Menu
                    </Link>
                  </div>
                </div>

                <div className="p-space-md rounded-xl bg-surface-container-low flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                    <Icon className="text-[18px]">support_agent</Icon>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-label-md text-label-md text-on-surface font-semibold">
                      Require immediate server attention?
                    </div>
                    <div className="font-body-sm text-body-sm text-on-surface-variant">
                      Press call button on your physical table pedestal.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
