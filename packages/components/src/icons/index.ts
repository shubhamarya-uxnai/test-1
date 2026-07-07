/**
 * PuttShack Design System — Icons
 *
 * The Figma icon library (node 10530-18254) is the Lucide open-source icon
 * set, so we consume the official `lucide-react` package rather than
 * re-exporting 1,188 static SVGs. Same icons, same names, tree-shakeable:
 * only the icons you import end up in the app bundle.
 *
 * Usage:
 *   import { Plus, ArrowRight, Calendar } from '@puttshack/components';
 *   <Button leadingIcon={<Plus />}>Book a game</Button>
 *
 * Figma name → component name: kebab-case becomes PascalCase.
 *   "plus"            → <Plus />
 *   "alarm-check"     → <AlarmCheck />
 *   "chevron-right"   → <ChevronRight />
 *
 * Sizing is handled by the component consuming the icon (e.g. Button's
 * .btn-icon wrapper reads --spacing-icon-size-* tokens), so icons stay
 * responsive across Desktop / Kiosk / Mobile without any size prop.
 */

export * from 'lucide-react';
