export interface ComponentItem {
  id: string;
  type: string;
  name: string;
  props: Record<string, unknown>;
  children?: ComponentItem[];
}

export type PropList = { [key: string]: unknown };

export type SavedComponentType = {
  name: string;
  props: PropList;
  children?: SavedComponentType;
};

export type SavedPage = {
  name: string;
  components: SavedComponentType[];
  timestamp: Date;
  card?: {
    title: string;
    description: string;
    date: string;
    imageUrl: string;
    labels: string[];
  };
};

export interface AvailableComponent {
  type: string;
  name: string;
  icon: string;
  defaultProps: Record<string, unknown>;
  description: string;
}

export interface ModalState {
  isOpen: boolean;
  type: "prompt" | "confirm";
  title: string;
  message: string;
  inputValue: string;
  onConfirm: (value?: string) => void;
  onCancel: () => void;
}
