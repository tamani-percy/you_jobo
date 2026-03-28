<script setup lang="ts">
import {ref} from 'vue'
import {NeoButton, NeoDialog, NeoStep, NeoSteps} from "neo-brutal-vue";
import {
  Info,
  LayoutDashboard,
  TrendingUp,
  ClipboardList,
  Zap,
  Bell,
  Calendar,
  Briefcase,
  CheckCircle,
  PlusCircle,
  Mic,
  User,
  MapPin,
  Clock,
  CalendarDays,
  Layers,
  Tag,
  FileText,
  Users,
  Mail,
  Linkedin,
  Phone,
  StickyNote,
  MessageSquare,
  Brain,
  Flag,
  ListTodo,
  Pin,
  FileUp,
  FilePlus,
  Hash,
  RefreshCw,
  Rocket
} from "lucide-vue-next";

const isAppInfoDialogOpen = ref(false)
const activeTab = ref(1)
const totalSteps = 6

function goNext() {
  if (activeTab.value < totalSteps) activeTab.value++
}

function goPrev() {
  if (activeTab.value > 1) activeTab.value--
}
</script>

<template>
  <div class="tour-demo">
    <div style="display: flex; gap: 20px; align-items: center;">
      <NeoDialog v-model="isAppInfoDialogOpen" title="App Tour" width="70%">
        <NeoSteps :active="activeTab" direction="horizontal" class="mb-6">
          <NeoStep title="Dashboard"/>
          <NeoStep title="Applications"/>
          <NeoStep title="Interviews"/>
          <NeoStep title="Contacts"/>
          <NeoStep title="Notes"/>
          <NeoStep title="Documents"/>
        </NeoSteps>

        <!-- Step 1: Dashboard -->
        <div v-if="activeTab === 1" class="step-content">
          <div class="step-header">
            <LayoutDashboard class="step-hero-icon" />
            <h2 class="step-title">Dashboard Overview</h2>
          </div>
          <p class="step-desc">
            Your command center for the entire job hunt. The dashboard gives you a live snapshot of your progress at a glance.
          </p>
          <ul class="step-list">
            <li><TrendingUp class="list-icon accent-green" /><span><strong>Response Rate</strong> — See what percentage of applications have gotten replies</span></li>
            <li><ClipboardList class="list-icon accent-blue" /><span><strong>Total Applications</strong> — Track every job you've applied to</span></li>
            <li><Zap class="list-icon accent-yellow" /><span><strong>Active Applications</strong> — Monitor applications still in progress</span></li>
            <li><Bell class="list-icon accent-orange" /><span><strong>Follow-Up Needed</strong> — Never let a hot lead go cold</span></li>
            <li><Calendar class="list-icon accent-purple" /><span><strong>Upcoming Deadlines</strong> — Stay ahead of application cutoffs</span></li>
          </ul>
        </div>

        <!-- Step 2: Job Applications -->
        <div v-if="activeTab === 2" class="step-content">
          <div class="step-header">
            <Briefcase class="step-hero-icon" />
            <h2 class="step-title">Job Applications</h2>
          </div>
          <p class="step-desc">
            The core of the app. Each application captures everything about a role — required fields ensure clean data, optional fields let you go deeper.
          </p>
          <div class="step-columns">
            <div>
              <p class="field-group-label required-label">
                <CheckCircle class="label-icon" /> Required
              </p>
              <ul class="step-list compact">
                <li><Tag class="list-icon accent-green" /><span>Title, Company</span></li>
                <li><Layers class="list-icon accent-green" /><span>Job Source &amp; Status</span></li>
                <li><Briefcase class="list-icon accent-green" /><span>Job Type &amp; Work Mode</span></li>
                <li><Flag class="list-icon accent-green" /><span>Priority</span></li>
                <li><CalendarDays class="list-icon accent-green" /><span>Date Applied, Posted &amp; Deadline</span></li>
              </ul>
            </div>
            <div>
              <p class="field-group-label optional-label">
                <PlusCircle class="label-icon" /> Optional
              </p>
              <ul class="step-list compact">
                <li><Layers class="list-icon accent-blue" /><span>Department</span></li>
                <li><TrendingUp class="list-icon accent-blue" /><span>Salary (Min / Max) &amp; Currency</span></li>
                <li><FileText class="list-icon accent-blue" /><span>Job URL</span></li>
              </ul>
            </div>
          </div>
          <p class="step-note">Once created, you can attach Interviews, Contacts, Notes, and Documents to the application.</p>
        </div>

        <!-- Step 3: Interviews -->
        <div v-if="activeTab === 3" class="step-content">
          <div class="step-header">
            <Mic class="step-hero-icon" />
            <h2 class="step-title">Interviews</h2>
          </div>
          <p class="step-desc">
            Log every interview linked to a job application. Keep all the details organized so you're always prepared.
          </p>
          <ul class="step-list">
            <li><User class="list-icon accent-blue" /><span><strong>Interviewer Details</strong> — Name and contact of who's interviewing you</span></li>
            <li><MapPin class="list-icon accent-red" /><span><strong>Location or Link</strong> — In-person address or virtual meeting URL</span></li>
            <li><Clock class="list-icon accent-orange" /><span><strong>Duration</strong> — Know how long to block your calendar</span></li>
            <li><CalendarDays class="list-icon accent-purple" /><span><strong>Interview Date</strong> — Scheduled time and date</span></li>
            <li><Layers class="list-icon accent-green" /><span><strong>Interview Stage</strong> — Phone screen, technical, final round, etc.</span></li>
            <li><Tag class="list-icon accent-yellow" /><span><strong>Interview Type</strong> — Behavioral, technical, panel, and more</span></li>
            <li><FileText class="list-icon accent-blue" /><span><strong>Notes</strong> — Prep notes or post-interview reflections</span></li>
          </ul>
        </div>

        <!-- Step 4: Contact Persons -->
        <div v-if="activeTab === 4" class="step-content">
          <div class="step-header">
            <Users class="step-hero-icon" />
            <h2 class="step-title">Contact Persons</h2>
          </div>
          <p class="step-desc">
            Track everyone you connect with at a company. Each application can have multiple contacts — recruiters, hiring managers, referrals, and more.
          </p>
          <ul class="step-list">
            <li><User class="list-icon accent-blue" /><span><strong>Full Name</strong> — Who they are</span></li>
            <li><Mail class="list-icon accent-orange" /><span><strong>Email</strong> — Direct line of communication</span></li>
            <li><Linkedin class="list-icon accent-blue" /><span><strong>LinkedIn URL</strong> — For staying connected professionally</span></li>
            <li><Phone class="list-icon accent-green" /><span><strong>Phone</strong> — For quick outreach</span></li>
            <li><Tag class="list-icon accent-purple" /><span><strong>Role</strong> — Their position at the company</span></li>
            <li><FileText class="list-icon accent-yellow" /><span><strong>Notes</strong> — Context, how you met, conversation history</span></li>
          </ul>
        </div>

        <!-- Step 5: Notes -->
        <div v-if="activeTab === 5" class="step-content">
          <div class="step-header">
            <StickyNote class="step-hero-icon" />
            <h2 class="step-title">Notes</h2>
          </div>
          <p class="step-desc">
            Attach free-form notes directly to a job application. Use them to capture anything relevant about the role or your experience with the process.
          </p>
          <ul class="step-list">
            <li><MessageSquare class="list-icon accent-blue" /><span>Write down thoughts after submitting an application</span></li>
            <li><Brain class="list-icon accent-purple" /><span>Log research about the company or team</span></li>
            <li><Flag class="list-icon accent-red" /><span>Flag concerns or things to ask in interviews</span></li>
            <li><ListTodo class="list-icon accent-green" /><span>Record follow-up actions and reminders</span></li>
            <li><Pin class="list-icon accent-orange" /><span>Pin key context so nothing slips through the cracks</span></li>
          </ul>
          <p class="step-note">Notes are scoped per application — keep everything in one place.</p>
        </div>

        <!-- Step 6: Documents -->
        <div v-if="activeTab === 6" class="step-content">
          <div class="step-header">
            <FileUp class="step-hero-icon" />
            <h2 class="step-title">Documents</h2>
          </div>
          <p class="step-desc">
            Manage the files you submit with each application. Keep your resumes and cover letters versioned and organized.
          </p>
          <ul class="step-list">
            <li><FileText class="list-icon accent-blue" /><span><strong>Type</strong> — Each document is either a <em>Resume</em> or a <em>Cover Letter</em></span></li>
            <li><Hash class="list-icon accent-purple" /><span><strong>Version</strong> — Track iterations (e.g. v1, v2, tailored versions)</span></li>
            <li><RefreshCw class="list-icon accent-orange" /><span><strong>Replace</strong> — Swap out an existing document with a new version</span></li>
            <li><FilePlus class="list-icon accent-green" /><span><strong>Add New</strong> — Upload an additional document alongside existing ones</span></li>
          </ul>
          <p class="step-note">Tailor documents per application and always know exactly what you sent.</p>
        </div>

        <!-- Navigation -->
        <div class="flex justify-between mt-6" style="align-items: center;">
          <NeoButton @click="goPrev" :disabled="activeTab === 1">Previous</NeoButton>
          <span class="step-counter">{{ activeTab }} / {{ totalSteps }}</span>
          <NeoButton v-if="activeTab < totalSteps" @click="goNext">Next</NeoButton>
          <NeoButton v-else @click="isAppInfoDialogOpen = false" type="neo">
            <span style="display:flex;align-items:center;gap:6px;">
              <Rocket :size="15"/> Get Started
            </span>
          </NeoButton>
        </div>
      </NeoDialog>

      <div class="relative pulse-ring">
        <NeoButton circle @click="isAppInfoDialogOpen = true" type="neo">
          <Info/>
        </NeoButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pulse-ring::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  background: rgba(59, 130, 246, 0.3);
  animation: ripple 1.8s infinite;
}

@keyframes ripple {
  0% { transform: scale(1); opacity: 0.6; }
  100% { transform: scale(1.8); opacity: 0; }
}

.step-content {
  min-height: 260px;
  padding: 4px 0 8px;
}

.step-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.step-hero-icon {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  color: #1a1a1a;
}

.step-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0;
}

.step-desc {
  font-size: 0.875rem;
  color: #555;
  margin-bottom: 14px;
  line-height: 1.6;
}

.step-list {
  list-style: none;
  padding: 0;
  margin: 0 0 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.step-list li {
  font-size: 0.875rem;
  line-height: 1.5;
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.step-list.compact li {
  font-size: 0.82rem;
}

.list-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-top: 2px;
}

.step-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 12px;
}

.field-group-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.label-icon {
  width: 13px;
  height: 13px;
}

.required-label { color: #16a34a; }
.optional-label { color: #2563eb; }

.step-note {
  font-size: 0.8rem;
  color: #666;
  background: #f5f5f5;
  border-left: 3px solid #ccc;
  padding: 6px 10px;
  border-radius: 4px;
  margin-top: 8px;
}

.step-counter {
  font-size: 0.8rem;
  color: #888;
  font-weight: 600;
}

/* Icon accent colors */
.accent-green  { color: #16a34a; }
.accent-blue   { color: #2563eb; }
.accent-yellow { color: #ca8a04; }
.accent-orange { color: #ea580c; }
.accent-purple { color: #7c3aed; }
.accent-red    { color: #dc2626; }
</style>