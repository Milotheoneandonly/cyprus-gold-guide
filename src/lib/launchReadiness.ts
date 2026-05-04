// Launch-readiness rules for areas (used by Data Health, sitemap, homepage).
import { AREA_LIST, type AreaMeta } from "@/lib/areas";
import type { AreaKey } from "@/data/hotels";
import { isPhotoReady, MIN_PHOTO_READY_PER_AREA, type PhotoReadyInput } from "@/lib/hotelImagePolicy";

export type AreaReadinessRow = PhotoReadyInput & {
  area: AreaKey | string;
  is_active: boolean;
};

export type AreaReadiness = {
  area: AreaMeta;
  active: number;
  photoReady: number;
  hotelReady: boolean;     // ≥ 5 active hotels
  photoReadyOk: boolean;   // ≥ 5 photo-ready hotels
  launchReady: boolean;    // both true
};

export function computeAreaReadiness(rows: AreaReadinessRow[]): AreaReadiness[] {
  return AREA_LIST.map((area) => {
    const inArea = rows.filter((r) => r.area === area.key && r.is_active);
    const active = inArea.length;
    const photoReady = inArea.filter(isPhotoReady).length;
    const hotelReady = active >= MIN_PHOTO_READY_PER_AREA;
    const photoReadyOk = photoReady >= MIN_PHOTO_READY_PER_AREA;
    return {
      area,
      active,
      photoReady,
      hotelReady,
      photoReadyOk,
      launchReady: hotelReady && photoReadyOk,
    };
  });
}

export function launchReadyAreaKeys(rows: AreaReadinessRow[]): AreaKey[] {
  return computeAreaReadiness(rows)
    .filter((r) => r.launchReady)
    .map((r) => r.area.key);
}
