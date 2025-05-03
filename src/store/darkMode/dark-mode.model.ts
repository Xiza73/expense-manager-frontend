export interface DarkModeState {
  isDarkMode: boolean;
}

export interface DarkModeStore extends DarkModeState {
  setDarkMode: (isDarkMode: boolean) => void;
}
