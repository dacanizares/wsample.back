export function tryParseDate(date: string): Date | null {
  try {
    return new Date(date as unknown as string);
  } catch (error) {
    console.log(`[server]: error on tryParseDate(${date}) => ${error}`);
    return null;
  }
}

export function mapDateForSqlite(date: Date | string | null, keepTime?: boolean): string | null {
  if (date && !(date instanceof Date)) {
    date = tryParseDate(date);
  }
  const dateFixed = date as Date;
  if (dateFixed) {
    const datePart = dateFixed.toISOString().split('T')[0];
    const timePart = dateFixed.toTimeString().split(' ')[0];
    return keepTime ? `${datePart} ${timePart}` : datePart;
  }
  return null;  
}

export function mapNowForSqlite(): string | undefined {
  return mapDateForSqlite(new Date(), true) ?? undefined;
}

export function tryParseNumber(str: string) : number | null {
  try {
    return parseInt(str);
  } catch (error) {
    console.log(`[server]: error on tryParseNumber(${str}) => ${error}`);
    return null;
  }
}
