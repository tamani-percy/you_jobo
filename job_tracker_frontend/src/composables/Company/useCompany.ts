import {type Ref, ref} from 'vue'
import {getAllCompanies} from "@/api/services/CompanyService.ts";
import type {CompanyResponse} from "@/api/interfaces/company.interfaces.ts";
import type {SelectOption} from "neo-brutal-vue";

export function useCompanies() {
    const companies:Ref<SelectOption[]> = ref<SelectOption[]>([])
    const isLoading = ref(false)

    async function fetchCompanies() {
        try {
            isLoading.value = true
            const data:CompanyResponse[] = await getAllCompanies()
            companies.value = data.map((company) => ({
                label: company.name,
                value: String(company.id),
            }))
        } finally {
            isLoading.value = false
        }
    }

    return {
        companies,
        isLoading,
        fetchCompanies,
    }
}