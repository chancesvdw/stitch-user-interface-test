import { useState } from 'react'
import { useOrder } from '../context/OrderContext'
import { formatMoney } from '../utils/format'
import Icon from './Icon'
import QuantityStepper from './QuantityStepper'

function SizeButtons({ item, selectedIndex, onSelect, variant }) {
  if (item.sizes.length === 1) {
    return (
      <div className="mt-2 text-on-surface-variant font-label-sm text-label-sm">
        {item.sizes[0].label}
      </div>
    )
  }

  return (
    <div
      className={
        variant === 'card'
          ? 'mt-3 flex items-center gap-1.5'
          : variant === 'compact'
            ? 'mt-3 flex flex-wrap gap-1'
            : 'mt-3 flex flex-wrap gap-1.5'
      }
    >
      {item.sizes.map((size, index) => {
        const active = index === selectedIndex
        const base =
          variant === 'card'
            ? 'flex-1 py-1.5 px-2 text-center'
            : variant === 'compact'
              ? 'px-2.5 py-1'
              : 'px-3 py-1.5'
        return (
          <button
            key={size.name}
            type="button"
            onClick={() => onSelect(index)}
            className={`${base} rounded-full font-label-sm text-label-sm font-semibold transition-all ${
              active
                ? 'bg-secondary text-on-secondary'
                : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
            }`}
          >
            {size.label}
          </button>
        )
      })}
    </div>
  )
}

export default function MenuItemCard({ item, variant = 'row' }) {
  const { addItem } = useOrder()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const selectedSize = item.sizes[selectedIndex]

  const handleAdd = () => addItem(item, selectedSize, quantity)

  const heading = (
    <div className="flex items-start justify-between gap-2">
      <h3 className="font-headline-sm text-headline-sm text-on-surface">
        {item.name}
      </h3>
      <span className="font-title-md text-title-md text-primary shrink-0">
        {formatMoney(selectedSize.price)}
      </span>
    </div>
  )

  const controls = (compact = false) => (
    <div
      className={`flex items-center justify-between ${
        compact ? 'mt-space-md pt-2 border-t border-surface-container-high/60' : 'mt-4 pt-2 border-t border-surface-container-high/60'
      }`}
    >
      <QuantityStepper value={quantity} onChange={setQuantity} size={compact ? 'sm' : 'md'} />
      <button
        type="button"
        onClick={handleAdd}
        className={`rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-colors flex items-center gap-1.5 shadow-sm ${
          compact ? 'px-3 py-1.5' : 'px-4 py-2'
        }`}
      >
        <Icon className={compact ? 'text-[14px]' : 'text-[16px]'}>
          {compact ? 'add' : 'add_shopping_cart'}
        </Icon>
        <span>{compact ? 'Add' : 'Add to Order'}</span>
      </button>
    </div>
  )

  if (variant === 'row') {
    return (
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col md:flex-row gap-space-md">
        <div className="w-full md:w-48 h-44 rounded-lg overflow-hidden shrink-0 bg-surface-container">
          <img
            className="w-full h-full object-cover"
            alt={item.name}
            src={item.image}
          />
        </div>
        <div className="flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  {item.name}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  {item.description}
                </p>
              </div>
              <span className="font-title-md text-title-md text-primary shrink-0 ml-2">
                {formatMoney(selectedSize.price)}
              </span>
            </div>
            <div className="mt-3">
              <label className="font-label-sm text-label-sm text-on-surface-variant block uppercase tracking-wider mb-1.5">
                Select Size
              </label>
              <SizeButtons
                item={item}
                selectedIndex={selectedIndex}
                onSelect={setSelectedIndex}
                variant="row"
              />
            </div>
          </div>
          {controls()}
        </div>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className="flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
        <div className="relative w-full h-48 overflow-hidden bg-surface-container">
          <img
            className="w-full h-full object-cover"
            alt={item.name}
            src={item.image}
          />
          {item.badge && (
            <span className="absolute top-3 left-3 bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm uppercase px-2 py-0.5 rounded-full font-semibold">
              {item.badge}
            </span>
          )}
        </div>
        <div className="p-space-md flex flex-col flex-1 justify-between">
          <div>
            {heading}
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              {item.description}
            </p>
            <SizeButtons
              item={item}
              selectedIndex={selectedIndex}
              onSelect={setSelectedIndex}
              variant="card"
            />
          </div>
          {controls()}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between">
      <div>
        {heading}
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
          {item.description}
        </p>
        <SizeButtons
          item={item}
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
          variant="compact"
        />
      </div>
      {controls(true)}
    </div>
  )
}
