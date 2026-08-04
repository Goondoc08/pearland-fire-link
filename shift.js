/* ============================================================
   SHIFT ROTATION — shared by index.html and duties.html
   3 platoons, 48/96 (2 on, 4 off) = 6-day cycle: A A B B C C
   Anchor: Tue Aug 4 2026 = A shift, day 1 of 2.

   If the department ever re-anchors the rotation, this file is
   the only thing that needs to change.
   ============================================================ */
const ANCHOR = Date.UTC(2026, 7, 4);   // months are 0-indexed: 7 = August
const CYCLE  = ['A','A','B','B','C','C'];

function shiftFor(y, m, d){
  const days = Math.round((Date.UTC(y, m, d) - ANCHOR) / 86400000);
  const i = ((days % 6) + 6) % 6;
  return { letter: CYCLE[i], dayOf: (i % 2) + 1 };
}

/* Convenience: shift info for a JS Date (defaults to today). */
function shiftForDate(dt){
  dt = dt || new Date();
  return shiftFor(dt.getFullYear(), dt.getMonth(), dt.getDate());
}
