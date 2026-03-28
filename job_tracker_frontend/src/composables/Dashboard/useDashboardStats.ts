import {computed, ref, type Ref} from 'vue'
import {
    countJobApplications,
    countJobApplicationsByJobStatusActive,
    countJobApplicationsByJobStatusOffers,
    getJobApplicationsInterviewRate,
    getJobApplicationsJobStatusCount,
    getJobApplicationsOfferRate,
    getJobApplicationsResponseRate,
    getJobApplicationsSuccessRate,
    getOldestJobApplications,
} from '@/api/services/JobApplicationService.ts'
import {countAllInterviews} from '@/api/services/InterviewService.ts'
import type {JobApplicationResponse} from "@/api/interfaces/job.applications.interfaces.ts";
import {useQuery} from "@tanstack/vue-query";

const formatLabel = (key: string) => {
    return key
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
};

export function useDashboardStats() {
    const jobApplicationCount: Ref<number> = ref(0)
    const interviewsCount: Ref<number> = ref(0)
    const jobApplicationsCountByJobStatusActive: Ref<number> = ref(0)
    const jobApplicationsCountByJobStatusOffers: Ref<number> = ref(0)
    const jobApplicationsInterviewRate: Ref<number> = ref(0)
    const jobApplicationsOfferRate: Ref<number> = ref(0)
    const jobApplicationsSuccessRate: Ref<number> = ref(0)
    const jobApplicationsResponseRate: Ref<number> = ref(0)
    const jobApplicationJobStatusCount: Ref<Record<string, number>> = ref({});

    const isDashboardStatsLoading: Ref<boolean> = ref(false)

    const OldestJobApplicationsQuery = useQuery<JobApplicationResponse[], Error, JobApplicationResponse[]>({
        queryKey: ['oldest-applications'],
        //@ts-ignore
        queryFn: () => getOldestJobApplications(),
        enabled: true
    })


    const onFetchJobApplicationCount = async (): Promise<void> => {
        try {
            jobApplicationCount.value = await countJobApplications()
        } catch (err: any) {
            const backendError = err.response?.data;
            throw {
                statusCode: backendError?.statusCode || backendError?.status || 500,
                message: backendError?.message || backendError || "An unexpected error occurred",
                error: true
            };
        }
    }

    const onFetchInterviewsCount = async (): Promise<void> => {
        try {
            interviewsCount.value = await countAllInterviews()
        } catch (err: any) {
            const backendError = err.response?.data;
            throw {
                statusCode: backendError?.statusCode || backendError?.status || 500,
                message: backendError?.message || backendError || "An unexpected error occurred",
                error: true
            };
        }
    }

    const onFetchJobApplicationsCountByJobStatusActive = async (): Promise<void> => {
        try {
            jobApplicationsCountByJobStatusActive.value =
                await countJobApplicationsByJobStatusActive()
        } catch (err: any) {
            const backendError = err.response?.data;
            throw {
                statusCode: backendError?.statusCode || backendError?.status || 500,
                message: backendError?.message || backendError || "An unexpected error occurred",
                error: true
            };
        }
    }

    const onFetchJobApplicationsCountByJobStatusOffers = async (): Promise<void> => {
        try {
            jobApplicationsCountByJobStatusOffers.value =
                await countJobApplicationsByJobStatusOffers()
        } catch (err: any) {
            const backendError = err.response?.data;
            throw {
                statusCode: backendError?.statusCode || backendError?.status || 500,
                message: backendError?.message || backendError || "An unexpected error occurred",
                error: true
            };
        }
    }

    const onFetchJobApplicationsInterviewRate = async (): Promise<void> => {
        try {
            jobApplicationsInterviewRate.value = await getJobApplicationsInterviewRate()
        } catch (err: any) {
            const backendError = err.response?.data;
            throw {
                statusCode: backendError?.statusCode || backendError?.status || 500,
                message: backendError?.message || backendError || "An unexpected error occurred",
                error: true
            };
        }
    }

    const onFetchJobApplicationsOfferRate = async (): Promise<void> => {
        try {
            jobApplicationsOfferRate.value = await getJobApplicationsOfferRate()
        } catch (err: any) {
            const backendError = err.response?.data;
            throw {
                statusCode: backendError?.statusCode || backendError?.status || 500,
                message: backendError?.message || backendError || "An unexpected error occurred",
                error: true
            };
        }
    }

    const onFetchJobApplicationsSuccessRate = async (): Promise<void> => {
        try {
            jobApplicationsSuccessRate.value = await getJobApplicationsSuccessRate()
        } catch (err: any) {
            const backendError = err.response?.data;
            throw {
                statusCode: backendError?.statusCode || backendError?.status || 500,
                message: backendError?.message || backendError || "An unexpected error occurred",
                error: true
            };
        }
    }
    const onFetchJobApplicationsResponseRate = async (): Promise<void> => {
        try {
            jobApplicationsResponseRate.value = await getJobApplicationsResponseRate()
        } catch (err: any) {
            const backendError = err.response?.data;
            throw {
                statusCode: backendError?.statusCode || backendError?.status || 500,
                message: backendError?.message || backendError || "An unexpected error occurred",
                error: true
            };
        }
    }


    const onFetchJobApplicationJobStatusCount = async () => {
        try {
            const res = await getJobApplicationsJobStatusCount();
            const formatted: Record<string, number> = {};

            Object.entries(res).forEach(([key, value]) => {
                formatted[formatLabel(key)] = Number(value);
            });
            jobApplicationJobStatusCount.value = formatted;
        } catch (err: any) {
            const backendError = err.response?.data;
            throw {
                statusCode: backendError?.statusCode || backendError?.status || 500,
                message: backendError?.message || backendError || "An unexpected error occurred",
                error: true
            };
        }
    };

    const onFetchDashboardStats = async (): Promise<void> => {
        try {
            isDashboardStatsLoading.value = true

            await Promise.all([
                onFetchJobApplicationCount(),
                onFetchInterviewsCount(),
                onFetchJobApplicationsCountByJobStatusActive(),
                onFetchJobApplicationsCountByJobStatusOffers(),
                onFetchJobApplicationsInterviewRate(),
                onFetchJobApplicationsOfferRate(),
                onFetchJobApplicationsSuccessRate(),
                onFetchJobApplicationsResponseRate(),
                onFetchJobApplicationJobStatusCount()
            ])

        } finally {
            isDashboardStatsLoading.value = false
        }
    }


    return {
        oldestJobApplications: computed(() => OldestJobApplicationsQuery.data.value ?? []),
        jobApplicationCount,
        interviewsCount,
        jobApplicationsCountByJobStatusActive,
        jobApplicationsCountByJobStatusOffers,
        jobApplicationsInterviewRate,
        jobApplicationsOfferRate,
        jobApplicationsSuccessRate,
        jobApplicationsResponseRate,
        jobApplicationJobStatusCount,
        isDashboardStatsLoading,
        onFetchDashboardStats,
    }
}