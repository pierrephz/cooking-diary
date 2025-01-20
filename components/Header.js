import React from "react";
import { IconSearch, IconChefHat } from "@tabler/icons-react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Input,
  Button,
  Tabs,
  Tab,
} from "@heroui/react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="flex flex-row items-center gap-8 mr-4">
          <p className="font-bold text-inherit">ACME</p>
          <Tabs aria-label="Options" color="primary" variant="bordered" className="hidden sm:flex gap-3">
          <Tab
            key="Feed"
            title={
              <div className="flex items-center space-x-2">
                {/* <GalleryIcon /> */}
                <span>Feed</span>
              </div>
            }
          />
          <Tab
            key="Calendar"
            title={
              <div className="flex items-center space-x-2">
                {/* <MusicIcon /> */}
                <span>Calendar</span>
              </div>
            }
          />
        </Tabs>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Type to search..."
          size="sm"
          startContent={<IconSearch size={24} />}
          type="search"
        />
        <NavbarItem>
          <Button color="primary" variant="shadow" size="md"  endContent={<IconChefHat size={20} />} onClick={() => setIsDialogOpen(true)}>
            Post
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
