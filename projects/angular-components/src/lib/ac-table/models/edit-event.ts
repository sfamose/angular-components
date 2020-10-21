export interface EditEvent {
  event: 'add'|'update'|'delete';
  row?: any;
}
