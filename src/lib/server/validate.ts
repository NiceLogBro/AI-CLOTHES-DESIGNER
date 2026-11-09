import "server-only";

import {
  COLLAR_TYPES,
  CUT_STYLES,
  EMBELLISHMENTS,
  FIT_TYPES,
  FONT_STYLES,
  GARMENT_TYPES,
  PATTERN_TYPES,
  POCKET_TYPES,
  SIZES,
  SLEEVE_STYLES,
  TEXT_PLACEMENTS,
  defaultDesign,
  pick,
  type DesignState,
} from "@/lib/design";
import type { ShippingAddress } from "./dropship";

type Raw = Record<string, unknown>;
const obj = (v: unknown): Raw => (v && typeof v === "object" && !Array.isArray(v) ? (v as Raw) : {});
const hex = (v: unknown, fallback: string) => (typeof v === "string" && /^#[0-9a-fA-F]{6}$/.test(v) ? v : fallback);
const num = (v: unknown, fallback: number, min: number, max: number) =>
  typeof v === "number" && Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : fallback;

/** Rebuild a trusted DesignState from untrusted client JSON. Anything invalid falls back to defaults. */
export function sanitizeDesign(input: unknown): DesignState {
  const d = defaultDesign;
  const r = obj(input);
  const colors = obj(r.colors);
  const text = obj(r.text);
  const pattern = obj(r.pattern);
  const fit = obj(r.fit);
  const pocket = pick(POCKET_TYPES, r.pocket, d.pocket);
  return {
    garmentType: pick(GARMENT_TYPES, r.garmentType, d.garmentType),
    size: pick(SIZES, r.size, d.size),
    source: pick(["scratch", "photo", "barcode", "tag"] as const, r.source, "scratch"),
    basedOn: typeof r.basedOn === "string" ? r.basedOn.slice(0, 120) : null,
    colors: {
      primary: hex(colors.primary, d.colors.primary),
      secondary: hex(colors.secondary, d.colors.secondary),
      accent: hex(colors.accent, d.colors.accent),
      useGradient: colors.useGradient === true,
    },
    text: {
      content: typeof text.content === "string" ? text.content.slice(0, 40) : "",
      fontStyle: pick(FONT_STYLES, text.fontStyle, d.text.fontStyle),
      placement: pick(TEXT_PLACEMENTS, text.placement, d.text.placement),
      color: hex(text.color, d.text.color),
      size: num(text.size, d.text.size, 1, 100),
    },
    pattern: {
      type: pick(PATTERN_TYPES, pattern.type, d.pattern.type),
      scale: num(pattern.scale, d.pattern.scale, 1, 100),
      color: hex(pattern.color, d.pattern.color),
    },
    collar: pick(COLLAR_TYPES, r.collar, d.collar),
    sleeve: pick(SLEEVE_STYLES, r.sleeve, d.sleeve),
    fit: {
      type: pick(FIT_TYPES, fit.type, d.fit.type),
      length: num(fit.length, 50, 1, 100),
      width: num(fit.width, 50, 1, 100),
    },
    cut: pick(CUT_STYLES, r.cut, d.cut),
    pocket,
    pocketCount: pocket === "No Pockets" ? 0 : Math.round(num(r.pocketCount, 1, 0, 4)),
    embellishments: Array.isArray(r.embellishments)
      ? Array.from(new Set(r.embellishments.filter((e): e is (typeof EMBELLISHMENTS)[number] => (EMBELLISHMENTS as readonly unknown[]).includes(e))))
      : [],
  };
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Returns a cleaned address or a message describing the first problem. */
export function sanitizeAddress(input: unknown): { ok: true; value: ShippingAddress } | { ok: false; error: string } {
  const r = obj(input);
  const value: ShippingAddress = {
    fullName: str(r.fullName, 100),
    email: str(r.email, 200),
    phone: str(r.phone, 30) || undefined,
    address1: str(r.address1, 150),
    address2: str(r.address2, 150) || undefined,
    city: str(r.city, 80),
    region: str(r.region, 80),
    postalCode: str(r.postalCode, 20),
    country: str(r.country, 80),
  };
  const required: (keyof ShippingAddress)[] = ["fullName", "email", "address1", "city", "region", "postalCode", "country"];
  for (const key of required) {
    if (!value[key]) return { ok: false, error: `Missing ${key}` };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value.email)) return { ok: false, error: "Invalid email" };
  return { ok: true, value };
}
