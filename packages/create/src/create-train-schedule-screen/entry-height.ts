import type { CreateScheduleEntry } from "./index";
import { CREATE_TRAIN_SCHEDULE } from "../create-metrics";

const CARD = CREATE_TRAIN_SCHEDULE.card;

/**
 * 时刻表卡片高度：题头 + （条件模式 24 + 条件行数×18；否则 4）。
 */
export function entryHeight(entry: CreateScheduleEntry): number {
  const maxRows = (entry.conditions ?? []).reduce((max, list) => Math.max(max, list.length), 0);
  return CARD.header + (entry.supportsConditions ? 24 + maxRows * 18 : 4);
}
