<template>
  <div>
    <NeoButton variant="outline" type="neo" size="sm" @click="isEditApplicationDialogOpen = true">
      <Pencil :size=20 class=""/>
    </NeoButton>
    <NeoDialog v-model="isEditApplicationDialogOpen" title="Title" width="70%">
      <div class="space-y-6" v-if="props.jobApplication">
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
          <div class="grid grid-cols-2 gap-10">
            <div class="space-y-1">
              <FieldLabel label="Job Title" required/>
              <NeoInput v-model="title" placeholder="Job title"/>
            </div>

            <div class="space-y-1">
              <FieldLabel label="Department"/>
              <NeoInput v-model="department" placeholder="Department"/>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-10">
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

          <div class="grid grid-cols-2 gap-10">
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
                  :type="priority === 'MEDIUM' ? 'info' : 'neo'"
                  @click="priority = 'MEDIUM'"
              >
                MEDIUM
              </NeoButton>

              <NeoButton
                  :type="priority === 'HIGH' ? 'info' : 'neo'"
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
                :options="filteredCompanies"
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
              UPDATE APPLICATION
            </NeoButton>
          </div>
        </div>
      </div>

    </NeoDialog>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, type Ref, ref} from 'vue'
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
  NeoTextarea
} from 'neo-brutal-vue'
import {Pencil} from "lucide-vue-next";
import {JobApplicationStatus, JobType, Source, WorkMode} from "@/api/data/JobApplicationStatuses.ts";
import FieldLabel from "@/components/FieldLabel.vue";
import BlurReveal from "@/components/ui/blur-reveal/BlurReveal.vue";
import type {JobApplicationRequest, JobApplicationResponse} from "@/api/interfaces/job.applications.interfaces.ts";
import {useEditJobApplicationMutation} from "@/composables/Applications/useApplicationsMutation.ts";
import {useCompanies} from "@/composables/Company/useCompany.ts";
import {Currencies} from "@/api/data/Currencies.ts";
import {formatLocalDate} from "@/utils/DateUtils.ts";

const props = defineProps<{
  jobApplication: JobApplicationResponse
}>()

const isEditApplicationDialogOpen = ref(false)

const {companies, fetchCompanies} = useCompanies()
const editMutation = useEditJobApplicationMutation()

const currentStep = ref(1)

const title: Ref<string> = ref(props.jobApplication.title)
const priority: Ref<string> = ref(props.jobApplication.priority)
const outcomeReason: Ref<string> = ref(props.jobApplication.outcomeReason)
const department: Ref<string> = ref(props.jobApplication.department)
const selectedCurrency: Ref<string> = ref(props.jobApplication.currency)
const selectedJobType: Ref<string> = ref(props.jobApplication.jobType)
const selectedJobSource: Ref<string> = ref(props.jobApplication.source)
const selectedWorkMode: Ref<string> = ref(props.jobApplication.workMode)
const selectedJobStatus: Ref<string> = ref(props.jobApplication.status)
const salaryMin = ref<number>(props.jobApplication.salaryMin)
const salaryMax = ref<number>(props.jobApplication.salaryMax)
const jobPostUrl: Ref<string> = ref(props.jobApplication.jobPostUrl)
const datePosted = ref<Date | undefined>(new Date(`${props.jobApplication.datePosted}T00:00:00`))
const dateApplied = ref<Date | undefined>(new Date(`${props.jobApplication.dateApplied}T00:00:00`))
const deadline = ref<Date | undefined>(new Date(`${props.jobApplication.deadline}T00:00:00`))

const companyAlreadyExists = ref(!!props.jobApplication.company?.id)
const selectedCompanyId = ref<number>(props.jobApplication.company.id)

const companyName: Ref<string> = ref(props.jobApplication.company.name)
const companyWebsite: Ref<string> = ref(props.jobApplication.company.website)
const companyLocation: Ref<string> = ref(props.jobApplication.company.location)
const companyDescription: Ref<string> = ref(props.jobApplication.company.description)
const companyIndustry: Ref<string> = ref(props.jobApplication.company.industry)

const filteredCompanies = computed(() => {
  if (!companies.value.length) return []

  // ensure selected company is always included
  const exists = companies.value.some(
      (c) => c.value === selectedCompanyId.value
  )

  if (!exists && props.jobApplication.company) {
    return [
      {
        label: props.jobApplication.company.name,
        value: props.jobApplication.company.id,
      },
      ...companies.value,
    ]
  }

  return companies.value
})


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
      id: props.jobApplication.id,
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

    await editMutation.mutateAsync(jobApplicationRequest)
    isEditApplicationDialogOpen.value = false
    currentStep.value = 1
  }
}

onMounted(() => {
  fetchCompanies()
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