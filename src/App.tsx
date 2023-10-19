import { useThemeContext } from "mui-layout-component";
import { Router } from "./page/router";
import { useMounted } from "./utils/hook";
import { PureLightTheme } from "./design/PureLightTheme";

export default function App() {
  const { setThemeByOptions } = useThemeContext();
  useMounted(() => {
    // 设置默认主题
    // setThemeByOptions(PureLightTheme);
    setThemeByOptions({
      palette: { mode: "dark" },
    });
  });
  return <Router />;
}
