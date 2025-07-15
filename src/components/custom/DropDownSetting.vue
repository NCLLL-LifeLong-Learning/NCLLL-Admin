<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <button>
        <Icon icon="radix-icons:gear" class="ml-3" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56 bg-white">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem @click="onNavigator('SETTING')">
          <Settings class="mr-2 h-4 w-4" />
          <span>Settings</span>
          <!-- <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> -->
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="onNavigator('GITHUB')">
        <Github class="mr-2 h-4 w-4" />
        <span>GitHub</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="onSignOut">
        <LogOut class="mr-2 h-4 w-4" />
        <span>Log out</span>
        <!-- <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> -->
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Github,
  LogOut,
  Settings,
} from "lucide-vue-next";
import { Icon } from "@iconify/vue";
import { removeCookie } from "@/scripts/cookie/cookie";
import { useRouter } from "vue-router";

const router = useRouter();
const onNavigator = (option: string) => {
  if (option == "SETTING") {
    router.push({ name: "Setting" });
  }else{
    window.open("https://github.com/samnangdeoun/NCLLL-Admin", "_blank");
  }
};

const onSignOut = () => {
  removeCookie("userToken");
  removeCookie("userRole");
  setTimeout(() => {
    router.push({ name: "Login" });
  }, 300);
};
</script>
