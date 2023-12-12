<template>
  <header class="header">
    <RouterLink
      to="/"
      class="header__logo"
    >
      bebou.ai
    </RouterLink>
    <nav class="header__nav">
      <RouterLink
        to="/"
        class="header__nav__link"
      >
        Home
      </RouterLink>
      <RouterLink
        to="/recipes"
        class="header__nav__link"
      >
        Recipes
      </RouterLink>
      <RouterLink
        to="/about"
        class="header__nav__link"
      >
        About
      </RouterLink>
      <Dropdown v-if="authStore.isLogged">
        <template #toggler>
          <button class="header__nav__profile">
            <div class="header__nav__profile__icon">
              <svg
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.8872 19.5959C21.8129 19.7176 21.706 19.8186 21.5773 19.8888C21.4487 19.959 21.3027 19.9959 21.1541 19.9959H0.845333C0.696867 19.9957 0.551055 19.9587 0.422537 19.8884C0.294019 19.8182 0.187319 19.7172 0.113152 19.5956C0.0389856 19.474 -3.80877e-05 19.3361 2.78947e-08 19.1958C3.81435e-05 19.0555 0.0391366 18.9176 0.11337 18.7961C1.72432 16.1634 4.10282 14.2757 7 13.3808C5.56693 12.5744 4.55756 11.3456 3.9348 9.88307C3.31204 8.42059 3.21436 6.8053 3.65677 5.28526C4.09918 3.76522 5.05721 2.42448 6.38374 1.46894C7.71027 0.513406 9.33221 0.00415039 11 0.00415039C12.6678 0.00415039 14.2892 0.513406 15.6157 1.46894C16.9423 2.42448 17.9003 3.76522 18.3427 5.28526C18.7851 6.8053 18.6874 8.42059 18.0647 9.88307C17.4419 11.3456 16.3285 12.5744 14.8954 13.3808C17.7926 14.2757 20.2751 16.1634 21.8861 18.7961C21.9605 18.9176 21.9998 19.0555 22 19.1959C22.0002 19.3363 21.9613 19.4743 21.8872 19.5959Z"
                  fill="white"
                />
              </svg>
            </div>
            <span class="header__nav__profile__username">
              {{ authStore.profile.name }}
            </span>
          </button>
        </template>
        <DropdownList>
          <DropdownListItem>Profile</DropdownListItem>
          <DropdownListItem @click="authStore.logout">
            Log out
          </DropdownListItem>
        </DropdownList>
      </Dropdown>
      <template v-else>
        <a
          class="header__nav__link"
          @click="loginModal.open"
        >
          Login
        </a>
        <a
          class="header__nav__link"
          @click="registerModal.open"
        >
          Register
        </a>
      </template>
    </nav>
  </header>
</template>

<script setup>
import Dropdown from '@/components/lib/Dropdown.vue';
import DropdownList from '@/components/lib/DropdownList.vue';
import DropdownListItem from '@/components/lib/DropdownListItem.vue';
import Login from '@/components/Modals/Login.vue';
import Register from '@/components/Modals/Register.vue';
import { useAuthStore } from '@/stores/authStore';
import { useModal } from 'vue-final-modal';
import Modal from '@/components/lib/Modal.vue';

const authStore = useAuthStore();

const loginModal = useModal({
  component: Modal,
  attrs: {
    title: 'Welcome back!',
    onClose: () => loginModal.close(),
  },
  slots: {
    default: {
      component: Login,
      attrs: {
        onClose: () => loginModal.close(),
      },
    },
  },
});

const registerModal = useModal({
  component: Modal,
  attrs: {
    title: 'Happy to see you here!',
    onClose: () => registerModal.close(),
  },
  slots: {
    default: {
      component: Register,
      attrs: {
        onClose: () => registerModal.close(),
      },
    },
  },
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--space-8);
  margin-bottom: var(--space-4);

  &__logo {
    font-weight: 900;
    font-size: var(--text-3xl);
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: var(--space-4);

    &__link {
      font-weight: 500;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }

    &__profile {
      display: flex;
      align-items: center;
      gap: var(--space-2);

      &:hover {
        text-decoration: underline;
      }

      &__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--space-8);
        height: var(--space-8);
        background: var(--color-text);
        border-radius: 100%;
      }
    }
  }
}
</style>
