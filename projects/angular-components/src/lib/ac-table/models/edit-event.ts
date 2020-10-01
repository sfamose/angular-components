export interface EditEvent {
  event: 'add'|'update'|'delete';
  row?: unknown;
  newRow?: unknown;
}
