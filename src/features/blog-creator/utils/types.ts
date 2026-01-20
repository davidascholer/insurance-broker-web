
export type PropList = { [key: string]: unknown };

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
