import { Container } from "@mui/material";
import { Dashboard } from "mui-layout-component";
import { Outlet } from "react-router-dom";

import { Breakpoint, styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";

import Header from "../layout/header";
import Nav from "../layout/nav";
import { Design } from "../design/design";

export interface RouterDashboardProps {
  /**
   * 是否展示容器卡片
   * @default true
   * @type {boolean}
   * @memberof RouterDashboardProps
   */
  withContainer?: boolean;
  /**
   * Container 最大宽度,
   * @default lg
   * @type {(false | Breakpoint | undefined)}
   * @memberof RouterDashboardProps
   */
  maxWidth?: false | Breakpoint | undefined;
  /**
   * pspacing pading的t.spacing
   * @default 4
   * @type {number}
   * @memberof RouterDashboardProps
   */
  pspacing?: number;
}

export const RouterDashboard = ({
  withContainer = true,
  maxWidth = "lg",
  pspacing = 4,
}: RouterDashboardProps) => {
  return (
    <Dashboard nav={<Nav />} header={<Header />} design={<Design />}>
      {withContainer ? (
        <Container
          maxWidth={maxWidth}
          sx={(theme) => ({ p: theme.spacing(pspacing), height: "100%" })}
        >
          <Outlet />
        </Container>
      ) : (
        <Outlet />
      )}
    </Dashboard>
  );
};

export const RouterEmpty = () => <Outlet />;

// ** Types

// Styled component for Blank Layout component
const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: "100vh",

  // For V1 Blank layout pages
  "& .content-center": {
    display: "flex",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(5),
  },

  // For V2 Blank layout pages
  "& .content-right": {
    display: "flex",
    minHeight: "100vh",
    overflowX: "hidden",
    position: "relative",
  },
}));

export const BlankLayout = () => {
  return (
    <BlankLayoutWrapper className="layout-wrapper">
      <Box
        className="app-content"
        sx={{ minHeight: "100vh", overflowX: "hidden", position: "relative" }}
      >
        <Outlet />
      </Box>
    </BlankLayoutWrapper>
  );
};
