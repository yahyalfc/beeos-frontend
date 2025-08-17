export function getFutureTimestamps() {
  const now = new Date();
  
  // Calculate timestamps
  const fiveMinutes = new Date(now.getTime() + (2 * 60 * 1000));
  const sevenMinutes = new Date(now.getTime() + (5 * 60 * 1000));
  const tenMinutes = new Date(now.getTime() + (7 * 60 * 1000));
  
  return {
    fiveMinutes: Math.floor(fiveMinutes.getTime() / 1000),
    sevenMinutes: Math.floor(sevenMinutes.getTime() / 1000),
    tenMinutes: Math.floor(tenMinutes.getTime() / 1000),
    // Also include readable formats for convenience
    readable: {
      fiveMinutes: fiveMinutes.toISOString(),
      sevenMinutes: sevenMinutes.toISOString(),
      tenMinutes: tenMinutes.toISOString()
    }
  };
}