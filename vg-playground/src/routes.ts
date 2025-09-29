// routes.ts
type LayoutFlags = { header?: boolean; sidebar?: boolean; footer?: boolean };

export const ROUTES = {
  groups: {
    demos: {
      groupLabel: "Demos",
      sections: {
        components: {
          base: "/components",
          displayLabel: "Components",
          icon: "Boxes",
          layout: {
            header: true,
            sidebar: true,
            footer: true,
          } satisfies LayoutFlags,
          screens: [
            {
              id: "cards:default",
              path: "/Cards/default",
              title: "Cards: Default Implementation",
              displayLabel: "Card Defaults",
              icon: "CreditCard",
              layout: { sidebar: true } satisfies LayoutFlags,
              load: () => import("@/pages/components/Cards/default"),
            },
          ],
        },
      },
    },
  },
} as const satisfies {
  groups: Record<
    string,
    {
      groupLabel: string;
      sections: Record<
        string,
        {
          base: `/${string}`;
          displayLabel: string;
          icon: string;
          layout?: LayoutFlags;
          screens: readonly {
            id: `${string}:${string}`;
            path: `/${string}`;
            title: string;
            displayLabel: string;
            icon: string;
            layout?: LayoutFlags;
            load: () => Promise<{ default: React.ComponentType<unknown> }>;
          }[];
        }
      >;
    }
  >;
};

type Groups = typeof ROUTES["groups"];
export type GroupId = keyof Groups;
export type SectionId = keyof Groups[keyof Groups]["sections"];
type Screen = Groups[keyof Groups]["sections"][keyof Groups[keyof Groups]["sections"]]["screens"][number];
export type ScreenId = Screen["id"];

export const allScreens: readonly Screen[] = Object.values(ROUTES.groups)
  .flatMap(g => Object.values(g.sections))
  .flatMap(s => s.screens);

export const toPath = (id: ScreenId) => allScreens.find(s => s.id === id)!.path;
export const byPath = (path: string) => allScreens.find(s => s.path === path);
