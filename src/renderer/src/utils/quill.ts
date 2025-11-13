export function formatDelta(delta) {
  return `${JSON.stringify(delta.ops, null, 2)}`;
}
