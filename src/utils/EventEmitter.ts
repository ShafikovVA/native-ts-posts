type Events = Record<string, unknown>;
type Listener = (data: any) => void;

export class EventEmitter<EventsData extends Events> {
  private events: Map<keyof EventsData, Set<Listener>> = new Map();

  on<Key extends keyof EventsData>(eventName: Key, callback: (data: any) => void): void {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, new Set());
    }
    this.events.get(eventName)?.add(callback);
  }

  off<Key extends keyof EventsData>(eventName: Key): void {
    this.events.delete(eventName);
  }

  emit<Key extends keyof EventsData>(eventName: Key, ...args: EventsData[Key] extends void ? [] : [EventsData[Key]]): void {
    if (!this.events.has(eventName)) {
      return;
    }
    this.events.get(eventName)?.forEach(listener => listener(args[0]));
  }
}
