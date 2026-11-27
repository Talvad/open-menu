type WallClock = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
};

function wallClockAt(instant: Date, timeZone: string): WallClock {
  const values = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(instant)
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, Number(part.value)]),
  );
  return {
    year: values.year,
    month: values.month,
    day: values.day,
    hour: values.hour,
    minute: values.minute,
  };
}

function wallClockKey(value: WallClock) {
  return `${value.year}-${value.month}-${value.day}T${value.hour}:${value.minute}`;
}

export function utcToLocalDateTime(value: string, timeZone: string) {
  if (!value) return '';
  const wallClock = wallClockAt(new Date(value), timeZone);
  const pad = (part: number) => String(part).padStart(2, '0');
  return `${wallClock.year}-${pad(wallClock.month)}-${pad(wallClock.day)}T${pad(wallClock.hour)}:${pad(wallClock.minute)}`;
}

export function localDateTimeToUtc(value: string, timeZone: string) {
  const match =
    /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value);
  if (!match) throw new Error('Choose a valid date and time.');

  const requested: WallClock = {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
    hour: Number(match[4]),
    minute: Number(match[5]),
  };
  const targetMs = Date.UTC(
    requested.year,
    requested.month - 1,
    requested.day,
    requested.hour,
    requested.minute,
  );
  const offsets = new Set<number>();

  for (let hours = -36; hours <= 36; hours += 6) {
    const sample = new Date(targetMs + hours * 60 * 60 * 1000);
    const observed = wallClockAt(sample, timeZone);
    offsets.add(
      Date.UTC(
        observed.year,
        observed.month - 1,
        observed.day,
        observed.hour,
        observed.minute,
      ) - sample.getTime(),
    );
  }

  const candidates = [...offsets]
    .map((offset) => targetMs - offset)
    .filter(
      (candidate) =>
        wallClockKey(wallClockAt(new Date(candidate), timeZone)) ===
        wallClockKey(requested),
    )
    .sort((a, b) => a - b);

  if (!candidates.length)
    throw new Error(
      'That local time does not exist because of a daylight-saving clock change.',
    );

  return new Date(candidates[0]).toISOString();
}
