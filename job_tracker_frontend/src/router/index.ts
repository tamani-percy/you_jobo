import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Dashboard',
            component: () => import('../views/DashboardView.vue'),

        },
        {
            path: '/job-applications',
            name: 'JobApplications',
            component: () => import('../views/ApplicationsView.vue'),

        },
        {
            path: '/job-applications/:id',
            name: 'JobApplication',
            component: () => import('../views/ApplicationView.vue'),

        },
        {
            path: '/interviews',
            name: 'Interviews',
            component: () => import('../views/InterviewsView.vue'),

        },
        {
            path: '/contact-persons',
            name: 'ContactPersons',
            component: () => import('../views/ContactPersonsView.vue'),

        },
        {
            path: '/notes',
            name: 'Notes',
            component: () => import('../views/NotesView.vue'),

        },
        {
            path: '/documents',
            name: 'Documents',
            component: () => import('../views/DocumentsView.vue'),

        },
    ],
})

export default router
