export interface AcTableHeaderItem {
  type: 'addRow' | 'filter' | 'export' | 'globalFilter' | 'menu' | 'column' | 'custom' ;
  options?: {
    label: string;
    action?: () => void;
    subMenuItems?: AcTableHeaderItem[];
  };
  mediaQueries?: string[];
}
