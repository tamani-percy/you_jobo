import { ref, watch } from 'vue'

const isDark = ref(localStorage.getItem('theme') === 'dark')

watch(
    isDark,
    (value) => {
        const html = document.documentElement

        if (value) {
            html.setAttribute('data-theme', 'dark')
            localStorage.setItem('theme', 'dark')
        } else {
            html.setAttribute('data-theme', 'light')
            localStorage.setItem('theme', 'light')
        }
    },
    { immediate: true }
)

export function useTheme() {
    const toggleTheme = () => {
        isDark.value = !isDark.value
    }

    return {
        isDark,
        toggleTheme
    }
}