export type ButtonMode = 'EDIT' | 'DELETE' | 'ADD';

export type ButtonConfig = {
  title: ButtonMode;
  iconClass: 'fa-solid fa-pen' | 'fa-solid fa-trash' | 'fa-solid fa-plus';
  iconColor: string;
  hoverColor: string;
  onClick: () => void;
};

/**
 * Generic button configuration factory
 * Creates EDIT, DELETE, and ADD buttons with consistent styling
 */
export const createButtonConfig = <T extends Record<string, any>>(
  item: T,
  handleModal: (...args: any[]) => void,
  getEditArgs: (item: T) => any[],
  getDeleteArgs: (item: T) => any[],
  getAddArgs: () => any[],
): ButtonConfig[] => [
  {
    title: 'EDIT' as const,
    iconClass: 'fa-solid fa-pen' as const,
    iconColor: 'text-blue-600',
    hoverColor: 'hover:text-blue-800',
    onClick: () => handleModal(...getEditArgs(item)),
  },
  {
    title: 'DELETE' as const,
    iconClass: 'fa-solid fa-trash' as const,
    iconColor: 'text-red-600',
    hoverColor: 'hover:text-red-800',
    onClick: () => handleModal(...getDeleteArgs(item)),
  },
  {
    title: 'ADD' as const,
    iconClass: 'fa-solid fa-plus' as const,
    iconColor: 'text-green-600',
    hoverColor: 'hover:text-green-800',
    onClick: () => handleModal(...getAddArgs()),
  },
];
