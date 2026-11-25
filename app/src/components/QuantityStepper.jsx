import Icon from './Icon'

export default function QuantityStepper({
  value,
  onChange,
  size = 'md',
  min = 1,
}) {
  const small = size === 'sm'
  const buttonSize = small ? 'w-6 h-6' : 'w-7 h-7'
  const iconSize = small ? 'text-[14px]' : 'text-[16px]'
  const numberWidth = small ? 'px-2' : 'px-3'

  return (
    <div className="flex items-center bg-surface-container-low rounded-full p-0.5">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(min, value - 1))}
        className={`${buttonSize} rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors`}
      >
        <Icon className={iconSize}>remove</Icon>
      </button>
      <span
        className={`font-label-md text-label-md ${numberWidth} min-w-[20px] text-center`}
      >
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(value + 1)}
        className={`${buttonSize} rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors`}
      >
        <Icon className={iconSize}>add</Icon>
      </button>
    </div>
  )
}
