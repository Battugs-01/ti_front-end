import { ScreeningTab } from "config";

export const screeningListFilter = (type: ScreeningTab) => {
  switch (type) {
    case ScreeningTab.all:
      return [ScreeningTab.level_1, ScreeningTab.level_2, ScreeningTab.level_3];
    case ScreeningTab.level_1:
      return [ScreeningTab.level_1];
    case ScreeningTab.level_2:
      return [ScreeningTab.level_2];
    case ScreeningTab.level_3:
      return [ScreeningTab.level_3];
  }
};
