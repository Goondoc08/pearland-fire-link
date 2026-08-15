/* ============================================================
   HOLIDAYS + PAY PERIODS — shared by index.html
   ------------------------------------------------------------
   Derived from "FY 27 Pay calendar.xlsx" (A-Shift tab): the
   purple-marked worked-holiday cells and the 14-day pay-period
   totals (120/120/96 repeating). Both patterns are exact and
   repeat forever, so nothing here needs updating for future
   fiscal years.

   HOLIDAYS — actual day observed by Fire (not the city's
   Mon-shifted "observed" date), per dept policy 501.1.2. The
   sheet excludes New Year's Eve even though the city policy
   lists it — fire crews don't get it.
   ============================================================ */
const PAY_DAY = 86400000;

function easterUTC(year){
  const a = year % 19, b = Math.floor(year / 100), c = year % 100;
  const d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return Date.UTC(year, month - 1, day);
}

/* nth (1-based) weekday of a UTC month; weekday: 0=Sun..6=Sat */
function nthWeekdayUTC(year, month, weekday, n){
  const firstDow = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const offset = (weekday - firstDow + 7) % 7;
  return Date.UTC(year, month, 1 + offset + (n - 1) * 7);
}

function lastWeekdayUTC(year, month, weekday){
  const lastDate = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const last = Date.UTC(year, month, lastDate);
  const back = (new Date(last).getUTCDay() - weekday + 7) % 7;
  return last - back * PAY_DAY;
}

const _holidayCache = {};
function holidaysForYear(year){
  if (_holidayCache[year]) return _holidayCache[year];
  const easter = easterUTC(year);
  const thanksgiving = nthWeekdayUTC(year, 10, 4, 4); // 4th Thursday of November
  const map = {};
  map[Date.UTC(year, 0, 1)]            = "New Year's Day";
  map[nthWeekdayUTC(year, 0, 1, 3)]    = 'Martin Luther King Jr. Day';
  map[easter - 2 * PAY_DAY]            = 'Good Friday';
  map[lastWeekdayUTC(year, 4, 1)]      = 'Memorial Day';
  map[Date.UTC(year, 6, 4)]            = 'Independence Day';
  map[nthWeekdayUTC(year, 8, 1, 1)]    = 'Labor Day';
  map[thanksgiving]                    = 'Thanksgiving Day';
  map[thanksgiving + PAY_DAY]          = 'Day After Thanksgiving';
  map[Date.UTC(year, 11, 24)]          = 'Christmas Eve';
  map[Date.UTC(year, 11, 25)]          = 'Christmas Day';
  _holidayCache[year] = map;
  return map;
}

/* Holiday name for a given UTC-midnight ms, or null. */
function holidayOnDate(ms){
  return holidaysForYear(new Date(ms).getUTCFullYear())[ms] || null;
}

/* ------------------------------------------------------------
   PAY PERIODS — 14-day cycles anchored to a confirmed period
   start from the FY27 sheet. The 14-day boundaries (dayOf/isStart/
   isEnd) are the same for every shift, but which periods run
   120hrs vs 96hrs is NOT — all three shifts share the same
   underlying 120/120/96 repeating cycle, just entered at a
   different phase (confirmed against the A/B/C-Shift tabs of the
   FY27 sheet: at the anchor period, A=120, C=120 (offset +1),
   B=96 (offset +2)). There's no shift-agnostic "hours" for a pay
   period — callers must pass the shift letter they mean.
   ------------------------------------------------------------ */
const PAY_ANCHOR = Date.UTC(2026, 8, 26);   // Sat Sep 26 2026 = period start
const PAY_HOURS_CYCLE = [120, 120, 96];
const PAY_SHIFT_PHASE = { A: 0, C: 1, B: 2 };

/* { hours, dayOf (0-13), isStart, isEnd } for a UTC-midnight ms and a
   shift letter ('A'|'B'|'C'). */
function payPeriodInfo(ms, shift){
  const diffDays = Math.round((ms - PAY_ANCHOR) / PAY_DAY);
  const idx = Math.floor(diffDays / 14);
  const dayOf = ((diffDays % 14) + 14) % 14;
  const phase = PAY_SHIFT_PHASE[shift] || 0;
  const hours = PAY_HOURS_CYCLE[(((idx + phase) % 3) + 3) % 3];
  return { hours, dayOf, isStart: dayOf === 0, isEnd: dayOf === 13 };
}
