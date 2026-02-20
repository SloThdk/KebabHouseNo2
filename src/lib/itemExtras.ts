import { varenrToBaseId } from './varenrMap';
import extrasPerItem from '../../data/extras-per-item.json';

export type ExtraItem = { name: string; price: number };

export type ItemExtrasData = {
  included: string[];
  extras: ExtraItem[];
} | null;

const extrasData = extrasPerItem as Record<string, ItemExtrasData>;

/**
 * Get extras data for a menu item by its varenr string.
 * Varenr comes from menuData as "Varenr. 1" or "Varenr. F14" — we strip the prefix.
 */
export function getItemExtras(varenr: string): ItemExtrasData {
  // Strip "Varenr. " prefix if present
  const cleanVarenr = varenr.replace(/^Varenr\.\s*/, '').trim();
  const baseId = varenrToBaseId[cleanVarenr];
  if (!baseId) return null;
  return extrasData[baseId] || null;
}

/**
 * Check if an item has any extras (should show modal)
 */
export function hasExtras(varenr: string): boolean {
  const data = getItemExtras(varenr);
  return data !== null && (data.extras.length > 0 || data.included.length > 0);
}
