<template>
  <div>
    <NeoButton @click="isApplicationDialogOpen = true">
      <div class="inline-flex items-center justify-center">
        <CirclePlus :size="30"/>&nbsp;
        ADD NEW
      </div>
    </NeoButton>

    <NeoDialog
        v-model="isApplicationDialogOpen"
        title="Add Application"
        width="auto"
        height="auto"
    >
      <div class="space-y-6">
        <NeoSteps :active="currentStep">
          <NeoStep title="Basic Info" description="Title, department, type, source, status"/>
          <NeoStep title="Dates" description="Posted, applied, and deadline dates"/>
          <NeoStep title="Compensation" description="Salary and job post link"/>
          <NeoStep title="Company" description="Select existing or create a new company"/>
        </NeoSteps>

        <p class="text-sm text-gray-600">
          Fields marked <span class="text-red-500">*</span> are required.
        </p>

        <!-- STEP 1 -->
        <NeoSpace v-if="currentStep === 1" class="w-full flex flex-col">
          <div class=" flex flex-col md:grid grid-cols-2 gap-10">
            <div class="space-y-1">
              <FieldLabel label="Job Title" required/>
              <NeoInput v-model="title" placeholder="Job title"/>
            </div>

            <div class="space-y-1">
              <FieldLabel label="Department"/>
              <NeoInput v-model="department" placeholder="Department"/>
            </div>
          </div>

          <div class=" flex flex-col md:grid grid-cols-2 gap-10">
            <div class="space-y-1">
              <FieldLabel label="Job Type" required/>

              <NeoSelect
                  v-model="selectedJobType"
                  :options="JobType"
                  placeholder="Select job type"
              />
            </div>

            <div class="space-y-1">
              <FieldLabel label="Job Source" required/>
              <NeoSelect
                  v-model="selectedJobSource"
                  :options="Source"
                  placeholder="Select job source"
              />
            </div>
          </div>

          <div class=" flex flex-col md:grid grid-cols-2 gap-10">
            <div class="space-y-1">
              <FieldLabel label="Work Mode" required/>
              <NeoSelect
                  v-model="selectedWorkMode"
                  :options="WorkMode"
                  placeholder="Select work mode"
              />
            </div>

            <div class="space-y-1">
              <FieldLabel label="Application Status" required/>
              <NeoSelect
                  v-model="selectedJobStatus"
                  :options="JobApplicationStatus"
                  placeholder="Select application status"
              />
            </div>
          </div>

          <div class="space-y-1">
            <FieldLabel label="Priority" required/>

            <div class="flex gap-2">
              <NeoButton
                  :type="priority === 'LOW' ? 'info' : 'neo'"
                  @click="priority = 'LOW'"
              >
                LOW
              </NeoButton>

              <NeoButton
                  :type="priority === 'MEDIUM' ? 'warning' : 'neo'"
                  @click="priority = 'MEDIUM'"
              >
                MEDIUM
              </NeoButton>

              <NeoButton
                  :type="priority === 'HIGH' ? 'danger' : 'neo'"
                  @click="priority = 'HIGH'"
              >
                HIGH
              </NeoButton>
            </div>
          </div>
        </NeoSpace>

        <!-- STEP 2 -->
        <div v-if="currentStep === 2" class="flex gap-10 flex-wrap justify-center">
          <div>
            <BlurReveal :delay="0.2" :duration="0.75" class="mb-2">
              <h2 class="text-base text-center font-bold tracking-tighter">
                Date Posted <span class="text-red-500">*</span>
              </h2>
            </BlurReveal>
            <NeoCalendar v-model="datePosted" :first-day-of-week="1"/>
          </div>

          <div>
            <BlurReveal :delay="0.2" :duration="0.75" class="mb-2">
              <h2 class="text-base text-center font-bold tracking-tighter">
                Date Applied <span class="text-red-500">*</span>
              </h2>
            </BlurReveal>
            <NeoCalendar v-model="dateApplied" :first-day-of-week="1"/>
          </div>

          <div>
            <BlurReveal :delay="0.2" :duration="0.75" class="mb-2">
              <h2 class="text-base text-center font-bold tracking-tighter">
                Deadline <span class="text-red-500">*</span>
              </h2>
            </BlurReveal>
            <NeoCalendar v-model="deadline" :first-day-of-week="1"/>
          </div>
        </div>

        <!-- STEP 3 -->
        <NeoSpace v-if="currentStep === 3" class="w-full">
          <div class="space-y-1">
            <FieldLabel label="Salary (Min)"/>
            <NeoInput v-model="salaryMin" placeholder="Salary (Min)" type="number"/>
          </div>

          <div class="space-y-1">
            <FieldLabel label="Salary (Max)"/>
            <NeoInput v-model="salaryMax" placeholder="Salary (Max)" type="number"/>
          </div>

          <div class="space-y-1">
            <FieldLabel label="Salary Currency"/>
            <NeoSelect
                v-model="selectedCurrency"
                :options="Currencies"
                placeholder="Select currency"
            />
          </div>

          <div class="space-y-1">
            <FieldLabel label="Job Post URL"/>
            <NeoInput v-model="jobPostUrl" placeholder="Job Post URL"/>
          </div>
        </NeoSpace>

        <!-- STEP 4 -->
        <div v-if="currentStep === 4" class="space-y-4">
          <NeoCheckbox v-model="companyAlreadyExists">
            I already saved company
          </NeoCheckbox>

          <div v-if="companyAlreadyExists" class="space-y-1">
            <FieldLabel label="Company"/>
            <NeoSelect
                v-model="selectedCompanyId"
                :options="companies"
                placeholder="Select existing company"
                filterable
            />
          </div>

          <NeoSpace v-else class="w-full">
            <div class="space-y-1">
              <FieldLabel label="Company Name" required/>
              <NeoInput v-model="companyName" placeholder="Company Name"/>
            </div>

            <div class="space-y-1">
              <FieldLabel label="Company Website" required/>
              <NeoInput v-model="companyWebsite" placeholder="Company Website"/>
            </div>

            <div class="space-y-1">
              <FieldLabel label="Company Location" required/>
              <NeoInput v-model="companyLocation" placeholder="Company Location"/>
            </div>

            <div class="space-y-1">
              <FieldLabel label="Company Industry" required/>
              <NeoInput v-model="companyIndustry" placeholder="Company Industry"/>
            </div>

            <div class="space-y-1">
              <FieldLabel label="Company Description" required/>
              <NeoTextarea v-model="companyDescription" placeholder="Company Description"/>
            </div>
          </NeoSpace>
        </div>

        <!-- ACTIONS -->
        <div class="flex justify-between pt-4">
          <NeoButton @click="prevStep" :disabled="currentStep === 1">
            Previous
          </NeoButton>

          <div class="flex gap-2">
            <NeoButton
                v-if="currentStep < 4"
                @click="nextStep"
                :disabled="!canGoNext"
            >
              Next
            </NeoButton>

            <NeoButton
                v-else
                @click="submitApplication"
                :disabled="!canSubmit"
            >
              Save Application
            </NeoButton>
          </div>
        </div>
      </div>
    </NeoDialog>
  </div>
</template>

<script setup lang="ts">
import {CirclePlus} from "lucide-vue-next";
import {computed, onMounted, ref, type Ref} from 'vue'
import {
  NeoButton,
  NeoCalendar,
  NeoCheckbox,
  NeoDialog,
  NeoInput,
  NeoSelect,
  NeoSpace,
  NeoStep,
  NeoSteps,
  NeoTextarea,
  type SelectOption
} from 'neo-brutal-vue'
import {JobApplicationStatus, JobType, Source, WorkMode} from '@/api/data/JobApplicationStatuses.ts'
import BlurReveal from "@/components/ui/blur-reveal/BlurReveal.vue";
import FieldLabel from "@/components/FieldLabel.vue";
import {getAllCompanies} from "@/api/services/CompanyService.ts";
import type {JobApplicationRequest} from "@/api/interfaces/job.applications.interfaces.ts";
import {useCreateJobApplicationMutation} from "@/composables/Applications/useApplicationsMutation.ts";
import {Currencies} from "@/api/data/Currencies.ts";
import {formatLocalDate} from "@/utils/DateUtils.ts";

const createMutation = useCreateJobApplicationMutation()

const isApplicationDialogOpen = ref(false)
const currentStep = ref(1)

const companies: Ref<SelectOption[]> = ref<SelectOption[]>([])

const title: Ref<string> = ref('')
const priority: Ref<string> = ref('')
const outcomeReason: Ref<string> = ref('')
const department: Ref<string> = ref('')
const selectedCurrency: Ref<string> = ref('')
const selectedJobType: Ref<string> = ref('')
const selectedJobSource: Ref<string> = ref('')
const selectedWorkMode: Ref<string> = ref('')
const selectedJobStatus: Ref<string> = ref('')
const salaryMin = ref<number>(0)
const salaryMax = ref<number>(0)
const jobPostUrl: Ref<string> = ref('')
const datePosted = ref<Date | undefined>(undefined)
const dateApplied = ref<Date | undefined>(undefined)
const deadline = ref<Date | undefined>(undefined)

const companyAlreadyExists = ref(false)
const selectedCompanyId = ref<number>(0)

const companyName: Ref<string> = ref('')
const companyWebsite: Ref<string> = ref('')
const companyLocation: Ref<string> = ref('')
const companyDescription: Ref<string> = ref('')
const companyIndustry: Ref<string> = ref('')

const onFetchCompanies = async () => {
  try {
    const res = await getAllCompanies()

    companies.value = res.map((company: any) => ({
      label: company.name,
      value: String(company.id)
    }))
  } catch (e) {
    console.error(e)
  }
}

const isStep1Valid = computed(() => {
  return !!title.value.trim()
      && !!selectedJobType.value
      && !!selectedJobSource.value
      && !!selectedWorkMode.value
      && !!selectedJobStatus.value
      && !!priority.value
})

const isStep2Valid = computed(() => {
  return !!datePosted.value
      && !!dateApplied.value
      && !!deadline.value
})

const isStep3Valid = computed(() => true)

const isStep4Valid = computed(() => {
  if (companyAlreadyExists.value) {
    return !!selectedCompanyId.value
  }

  return !!companyName.value.trim()
      && !!companyDescription.value
      && !!companyLocation.value
      && !!companyIndustry.value
      && !!companyWebsite.value
})

const canGoNext = computed(() => {
  switch (currentStep.value) {
    case 1:
      return isStep1Valid.value
    case 2:
      return isStep2Valid.value
    case 3:
      return isStep3Valid.value
    default:
      return false
  }
})

const canSubmit = computed(() => {
  return isStep1Valid.value
      && isStep2Valid.value
      && isStep3Valid.value
      && isStep4Valid.value
})


const nextStep = () => {
  if (!canGoNext.value) return
  if (currentStep.value < 4) currentStep.value++
}

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--
}

const submitApplication = async () => {
  if (!canSubmit.value) return

  if (datePosted.value !== undefined && dateApplied.value !== undefined && deadline.value !== undefined) {

    const jobApplicationRequest: JobApplicationRequest = {
      title: title.value,
      department: department.value,
      jobType: selectedJobType.value,
      source: selectedJobSource.value,
      workMode: selectedWorkMode.value,
      status: selectedJobStatus.value,
      datePosted: formatLocalDate(datePosted.value),
      dateApplied: formatLocalDate(dateApplied.value),
      deadline: formatLocalDate(deadline.value),
      salaryMin: salaryMin.value,
      salaryMax: salaryMax.value,
      currency: selectedCurrency.value,
      priority: priority.value,
      jobPostUrl: jobPostUrl.value,
      company: {
        id: companyAlreadyExists.value ? selectedCompanyId.value : undefined,
        name: companyName.value,
        website: companyWebsite.value,
        location: companyLocation.value,
        description: companyDescription.value,
        industry: companyIndustry.value,
      },
      outcomeReason: outcomeReason.value,
    }

    await createMutation.mutateAsync(jobApplicationRequest)
    isApplicationDialogOpen.value = false
    currentStep.value = 1
  }

}

onMounted(() => {
  onFetchCompanies()
})
</script>

<style scoped>
.neo-dropdown-menu .item {
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 700;
}

.neo-dropdown-menu .item:hover {
  background: var(--neo-yellow);
}
</style>