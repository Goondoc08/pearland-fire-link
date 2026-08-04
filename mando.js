/* ============================================================
   MANDATORY TRAINING (MANDO) SCHEDULE
   ------------------------------------------------------------
   Derived from "Dept Mando Workshet.xlsx" and verified against
   every cell in it: 609 session dates across all 21 groups,
   zero mismatches, Oct 2025 through Feb 2029.

   HOW IT WORKS

   One group attends every 6 days. Each shift runs its own
   sequence, offset two days from the one before it:

       A-shift slot 0 = Thu Oct 23 2025
       B-shift slot 0 = Sat Oct 25 2025
       C-shift slot 0 = Mon Oct 27 2025

   Slot n falls on anchor + 6n days, and a session is that day
   plus the next one — always the middle two of the four days off.

   THE SKIP

   Groups take the slots in order 1..7, but the rounds after the
   first each drop one group, and the dropped group advances by
   one each round:

       round 0   1 2 3 4 5 6 7      (nobody skips)
       round 1     2 3 4 5 6 7      (1 skips)
       round 2   1   3 4 5 6 7      (2 skips)
       ...
       round 7   1 2 3 4 5 6        (7 skips)

   That is 7 + (7 x 6) = 49 slots = 294 days per super-cycle,
   and each group gets 7 sessions in it. So from a group's own
   point of view the gaps run 36, 36, 36, 36, 36, 36, 78 —
   six normal turns and then the break.

   The pattern is exact and repeats forever, so nothing here
   needs updating when the department publishes the next sheet.
   ============================================================ */

const MANDO_ANCHOR = {
  A: Date.UTC(2025, 9, 23),   // month is 0-indexed: 9 = October
  B: Date.UTC(2025, 9, 25),
  C: Date.UTC(2025, 9, 27)
};

const MANDO_GROUPS  = 7;
const MANDO_FULL    = MANDO_GROUPS;        // slots in the opening full round
const MANDO_PARTIAL = MANDO_GROUPS - 1;    // slots in each round that drops a group
const MANDO_PERIOD  = MANDO_FULL + MANDO_GROUPS * MANDO_PARTIAL;   // 49
const DAY = 86400000;

/* Which group attends global slot n? */
function mandoGroupForSlot(n){
  let c = ((n % MANDO_PERIOD) + MANDO_PERIOD) % MANDO_PERIOD;
  if (c < MANDO_FULL) return c + 1;
  c -= MANDO_FULL;
  const skipped = Math.floor(c / MANDO_PARTIAL) + 1;
  const k       = c % MANDO_PARTIAL;
  let seen = 0;
  for (let g = 1; g <= MANDO_GROUPS; g++){
    if (g === skipped) continue;
    if (seen === k) return g;
    seen++;
  }
  return null;
}

/* UTC midnight for a slot. Always format these with timeZone:'UTC'. */
function mandoSlotDate(shift, n){ return MANDO_ANCHOR[shift] + n * 6 * DAY; }

/* Today as UTC midnight, taken from the LOCAL calendar date. */
function mandoToday(){
  const n = new Date();
  return Date.UTC(n.getFullYear(), n.getMonth(), n.getDate());
}

/* The next `count` sessions for a group at or after `fromMs`.
   Each entry: { day1, day2, gapBefore, isBreak }
   isBreak marks the session that follows the group's long break. */
function mandoSessions(shift, group, fromMs, count){
  const out = [];
  let prev = null;
  for (let n = 0; n < MANDO_PERIOD * 12 && out.length < count; n++){
    if (mandoGroupForSlot(n) !== group) continue;
    const day1 = mandoSlotDate(shift, n);
    const day2 = day1 + DAY;
    const gap  = prev === null ? null : Math.round((day1 - prev) / DAY);
    prev = day1;
    if (day2 < fromMs) continue;              // fully in the past
    out.push({ day1, day2, gapBefore: gap, isBreak: gap !== null && gap > 36 });
  }
  return out;
}

/* Convenience: the group's current-or-next session. */
function mandoNext(shift, group){
  return mandoSessions(shift, group, mandoToday(), 1)[0] || null;
}

/* All valid group ids, e.g. "A1" ... "C7" */
function mandoAllGroups(){
  const out = [];
  for (const s of ['A','B','C'])
    for (let g = 1; g <= MANDO_GROUPS; g++) out.push(s + g);
  return out;
}

/* The schedule only exists from the anchor forward — the sheet starts there. */
const MANDO_START = Math.min(MANDO_ANCHOR.A, MANDO_ANCHOR.B, MANDO_ANCHOR.C);
