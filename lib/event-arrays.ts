function sanitizeArrayValues(values: unknown[]): string[] {
  return values
    .filter((value): value is string => typeof value === "string")
    .map((value) => value.trim())
    .filter(Boolean);
}

function tryParseJsonArray(value: string): string[] | null {
  const trimmed = value.trim();

  if (!trimmed.startsWith("[") || !trimmed.endsWith("]")) {
    return null;
  }

  try {
    const parsed = JSON.parse(trimmed);

    if (!Array.isArray(parsed)) {
      return null;
    }

    return sanitizeArrayValues(parsed);
  } catch {
    return null;
  }
}

export function normalizeStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item) => normalizeStringArray(item));
  }

  if (typeof value !== "string") {
    return [];
  }

  const parsedJsonArray = tryParseJsonArray(value);

  if (parsedJsonArray) {
    return parsedJsonArray;
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}
