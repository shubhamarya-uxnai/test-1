import React from 'react';
import { Info, X } from '../icons';
import './InputField.css';

/**
 * Presentation mode, mirroring the Figma "Kiosk / Not Kiosk" toggles.
 *
 * - 'auto'  (default) — kiosk presentation activates on kiosk viewports
 *            (441–1024px), matching the token build's media queries.
 * - 'boxed' — always the Desktop/Mobile filled-box presentation.
 * - 'kiosk' — always the kiosk fieldset-outline presentation.
 */
export type InputFieldMode = 'auto' | 'boxed' | 'kiosk';

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Uppercase label above the field */
  label?: string;
  /** Helper text below the field (with info icon) */
  helperText?: string;
  /** Error state — red border + red helper text */
  error?: boolean;
  /** Inverse color scheme (dark surfaces on desktop/mobile, light on kiosk) */
  inverse?: boolean;
  /** Icon inside the field, before the text (e.g. <Calendar />) */
  leadingIcon?: React.ReactNode;
  /** Small icon before the label text */
  labelIcon?: React.ReactNode;
  /** Show the trailing clear (×) button. Default: true */
  clearable?: boolean;
  /** Called when the clear button is pressed (controlled usage) */
  onClear?: () => void;
  /** Presentation mode override. Default: 'auto' */
  mode?: InputFieldMode;
}

/** Same range as the kiosk spacing tokens (tokens.kiosk.css) */
const KIOSK_QUERY = '(min-width: 441px) and (max-width: 1024px)';

function useKioskViewport(enabled: boolean): boolean {
  // Lazy init reads matchMedia synchronously on the client so the first
  // paint is already correct (no boxed→kiosk flash on kiosk viewports)
  const [matches, setMatches] = React.useState(
    () => enabled && typeof window !== 'undefined' && window.matchMedia(KIOSK_QUERY).matches
  );

  React.useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;
    const mq = window.matchMedia(KIOSK_QUERY);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [enabled]);

  return enabled && matches;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    {
      label,
      helperText,
      error = false,
      inverse = false,
      leadingIcon,
      labelIcon,
      clearable = true,
      onClear,
      mode = 'auto',
      className,
      disabled,
      required,
      id,
      ...rest
    },
    ref
  ) {
    const autoId = React.useId();
    const inputId = id ?? `field-${autoId}`;
    const helperId = `${inputId}-helper`;

    const innerRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => innerRef.current as HTMLInputElement, []);

    const autoKiosk = useKioskViewport(mode === 'auto');
    const kiosk = mode === 'kiosk' || autoKiosk;

    const classes = [
      'field',
      kiosk && 'field-kiosk',
      error && 'field-error',
      inverse && 'field-inverse',
      disabled && 'field-disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const isControlled = rest.value !== undefined;

    const handleClear = () => {
      // Uncontrolled: clear the DOM value and notify listeners.
      // Controlled: the consumer clears state via onClear/onChange.
      if (!isControlled && innerRef.current) {
        const setter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set;
        setter?.call(innerRef.current, '');
        innerRef.current.dispatchEvent(new Event('input', { bubbles: true }));
      }
      onClear?.();
      innerRef.current?.focus();
    };

    // Merge our helper id with any consumer-supplied aria-describedby
    const describedBy =
      [helperText ? helperId : null, rest['aria-describedby']]
        .filter(Boolean)
        .join(' ') || undefined;

    // Kiosk always renders the label row — it carries the top outline line
    const hasLabelContent = Boolean(label || labelIcon || required);
    const showLabelRow = kiosk || hasLabelContent;
    const labelRowClasses =
      'field-label-row' + (hasLabelContent ? '' : ' field-label-row-empty');

    return (
      <div className={classes}>
        <div className="field-outline">
          {showLabelRow && (
            <div className={labelRowClasses}>
              {labelIcon && (
                <span className="field-label-icon" aria-hidden="true">
                  {labelIcon}
                </span>
              )}
              {label && (
                <label className="field-label" htmlFor={inputId}>
                  {label}
                </label>
              )}
              {required && (
                <span className="field-required" aria-hidden="true">
                  *
                </span>
              )}
            </div>
          )}

          <div className="field-box">
            {leadingIcon && (
              <span className="field-icon field-leading" aria-hidden="true">
                {leadingIcon}
              </span>
            )}
            <input
              ref={innerRef}
              id={inputId}
              className="field-control"
              disabled={disabled}
              required={required}
              aria-invalid={error || undefined}
              {...rest}
              aria-describedby={describedBy}
            />
            {clearable && (
              <button
                type="button"
                className="field-clear"
                aria-label="Clear input"
                onClick={handleClear}
                onMouseDown={(e) => e.preventDefault()}
                disabled={disabled}
              >
                <X />
              </button>
            )}
          </div>
        </div>

        {helperText && (
          <div className="field-helper" id={helperId}>
            <span className="field-icon field-helper-icon" aria-hidden="true">
              <Info />
            </span>
            <span>{helperText}</span>
          </div>
        )}
      </div>
    );
  }
);
