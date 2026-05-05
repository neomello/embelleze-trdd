const PREFIX = 'BELLA';

export function generateTicket(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${PREFIX}-${timestamp}-${random}`;
}

export function isValidTicket(ticket: string): boolean {
  return ticket.startsWith(PREFIX) && ticket.length > 8;
}
