export function tryParseDate(date: string): Date | null {
  try {
    return new Date(date as unknown as string);
  } catch (error) {
    console.log(`[server]: error on tryParseDate(${date}) => ${error}`);
    return null;
  }
}

export function mapDateForSqlite(date: Date | null): string | null {
  if (date && !(date instanceof Date)) {
    console.log("[server]: warning Date stored as string. (blame kysely)");
    date = tryParseDate(date);
  }

  if (date) {
    const datePart = date.toISOString().split('T')[0];
    const timePart = date.toTimeString().split(' ')[0];
    return `${datePart} ${timePart}`;
  }
  return null;  
}

export function mapNowForSqlite(): string | undefined {
  return mapDateForSqlite(new Date()) ?? undefined;
}

export function tryParseNumber(str: string) : number | null {
  try {
    return parseInt(str);
  } catch (error) {
    console.log(`[server]: error on tryParseNumber(${str}) => ${error}`);
    return null;
  }
}
