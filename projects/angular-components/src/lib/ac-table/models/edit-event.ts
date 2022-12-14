export interface EditEvent {
  event: 'add'|'update'|'delete'|'open-update';
  row?: any;
}
