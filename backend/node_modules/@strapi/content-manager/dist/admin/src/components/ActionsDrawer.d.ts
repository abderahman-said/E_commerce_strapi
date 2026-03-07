import * as React from 'react';
interface RootProps {
    children: React.ReactNode;
    hasContent?: boolean;
    hasSideNav?: boolean;
}
interface HeaderProps {
    children: React.ReactNode;
}
interface ContentProps {
    children: React.ReactNode;
}
declare const ActionsDrawer: {
    Root: ({ children, hasContent, hasSideNav }: RootProps) => import("react/jsx-runtime").JSX.Element;
    Overlay: () => import("react/jsx-runtime").JSX.Element | null;
    Header: ({ children }: HeaderProps) => import("react/jsx-runtime").JSX.Element;
    Content: ({ children }: ContentProps) => import("react/jsx-runtime").JSX.Element;
};
export { ActionsDrawer };
