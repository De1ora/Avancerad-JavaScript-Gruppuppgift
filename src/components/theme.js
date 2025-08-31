import { deepMerge } from "grommet/utils";
import { grommet } from "grommet/themes";


const baseTheme = {
  global: {
    font: {
      family: "Arial, sans-serif",
      size: "18px",
      height: "20px",
    },
    control: {
      font: {
        size: "18px",
        weight: 600,
      },
      padding: {
        vertical: "6px",
        horizontal: "20px",
      },
    },
  },
};

const lightColors = {
  global: {
    colors: {
      background: "#FFFFFF",
      brand: "#228BE6",
      text: "#333333",
      "userPanelBackgroundLight": "#f0f0f0",
    },
  },
};

const darkColors = {
  global: {
    colors: {
      background: "#1A1A1A",
      brand: "#228BE6",
      text: "#CCCCCC",
    "userPanelBackgroundDark": "#3D3D3D",
    },
  },
};

export const customLightTheme = deepMerge(grommet, deepMerge(baseTheme, lightColors));
export const customDarkTheme = deepMerge(grommet, deepMerge(baseTheme, darkColors));