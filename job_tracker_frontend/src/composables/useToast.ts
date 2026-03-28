import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface ToastOptions {
    type?: ToastType
    title?: string
    message?: string
    duration?: number
}

const visible = ref(false)
const type = ref<ToastType>('success')
const title = ref('')
const message = ref('')

let timeoutId: ReturnType<typeof setTimeout> | null = null

export function useToast() {
    const showToast = (options: ToastOptions) => {
        if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
        }

        type.value = options.type ?? 'success'
        title.value = options.title ?? ''
        message.value = options.message ?? ''
        visible.value = true

        if (options.duration !== 0) {
            timeoutId = setTimeout(() => {
                visible.value = false
            }, options.duration ?? 3000)
        }
    }

    const closeToast = () => {
        visible.value = false

        if (timeoutId) {
            clearTimeout(timeoutId)
            timeoutId = null
        }
    }

    return {
        visible,
        type,
        title,
        message,
        showToast,
        closeToast,
    }
}