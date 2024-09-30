'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardContent from '@mui/material/CardContent'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'

// Third-party Imports
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Component Imports
import { Divider } from '@mui/material'

import DirectionalIcon from '@components/DirectionalIcon'

// Styled Component Imports
import StepperWrapper from '@core/styles/stepper'
import StepperCustomDot from '@components/stepper-dot'

type TimelineItem = {
  title: string
  date: Date | null
}

type ModuleOutlineItem = {
  weekNumber: number
  topics: string
  guestSpeakers: string
}

type ProjectPartner = {
  name: string
  role: string
}

type BudgetBreakdown = {
  description: string
  rate: string
  actualAmount: string
  numberOfUnits: number
}

type BudgetCategory = {
  title: string
  unitOfMeasure: string
  costPerUnit: string
  numberOfUnits: number
  narrative: string
  breakdowns: BudgetBreakdown[]
}

type FormDataType = {
  applicantDetail: {
    gender: string
    dob: Date | null
    postalAddress: string
  }
  exchangeInfo: {
    programName: string
    hostInstitution: string
    programCompletionDate: Date | null
  }
  employmentStatus: {
    employmentStatus: string
    organizationName: string
    designation: string
    areaOfWork: string
  }
  projectDescription: {
    projectTitle: string
    projectDuration: number
    courseStartDate: Date | null
    courseEndDate: Date | null
    proposedVenue: string
    isLetterAttached: boolean
    totalTrainingHours: number
    hoursPerWeek: number
    daysPerWeek: number
    hoursPerClass: number
    totalAudience: number
    maleAudience: number
    femaleAudience: number
  }
  executiveSummary: {
    summaryWhat: string
    summaryWhere: string
    summaryWhen: string
    summaryHow: string
    summaryWhy: string
    summaryWho: string
    summaryDirectBeneficiaries: string
    summaryInDirectBeneficiaries: string
  }
  projectJustification: {
    identifiedProblem: string
    communityNeed: string
    relevanceToStandard: string
    impactOnBeneficiaries: string
    longTermBenefits: string
    necessity: string
  }
  deliverables: string[]
  methodology: {
    moduleDesign: string
    procurement: string
    traineeRecruitment: string
    openingCeremony: string
    mediaEngagement: string
  }
  projectTimelines: TimelineItem[]
  moduleOutlines: ModuleOutlineItem[]
  mediaPlan: {
    traditionalMediaPlan: string
    socialMediaPlatforms: string
    socialMediaStrategy: string
    frequencyOfPosts: string
    targetAudience: string
    promotionalMaterials: string
    brandingAcknowledgement: string
  }
  monitoringMethods: string[]
  projectPartners: ProjectPartner[]
  budgetCategories: BudgetCategory[]

  // ... other form data types ...
}

// Vars
const steps = [
  { title: 'Applicant Details', subtitle: 'Enter your personal information' },
  { title: 'Exchange Info', subtitle: 'Provide exchange program details' },
  { title: 'Employment Status', subtitle: 'Enter your current employment information' },
  { title: 'Project Description', subtitle: 'Describe your project' },
  { title: 'Executive Summary', subtitle: 'Summarize your project' },
  { title: 'Project Justification', subtitle: 'Justify your project' },
  { title: 'Deliverables', subtitle: 'List project deliverables' },
  { title: 'Methodology', subtitle: 'Describe your project methodology' },
  { title: 'Project Timelines', subtitle: 'Set project milestones' },
  { title: 'Module Outlines', subtitle: 'Define weekly module content' },
  { title: 'Media Plan', subtitle: 'Outline your media strategy' },
  { title: 'Monitoring Methods', subtitle: 'Define project monitoring methods' },
  { title: 'Project Partners', subtitle: 'List project partners and their roles' },
  { title: 'Budget Categories', subtitle: 'Define budget categories and breakdowns' }

  // ... other steps ...
]

const StepperAlternativeLabel = () => {
  // States
  const [activeStep, setActiveStep] = useState(0)

  const [formData, setFormData] = useState<FormDataType>({
    applicantDetail: { gender: '', dob: null, postalAddress: '' },
    exchangeInfo: { programName: '', hostInstitution: '', programCompletionDate: null },
    employmentStatus: { employmentStatus: '', organizationName: '', designation: '', areaOfWork: '' },
    projectDescription: {
      projectTitle: '',
      projectDuration: 0,
      courseStartDate: null,
      courseEndDate: null,
      proposedVenue: '',
      isLetterAttached: false,
      totalTrainingHours: 0,
      hoursPerWeek: 0,
      daysPerWeek: 0,
      hoursPerClass: 0,
      totalAudience: 0,
      maleAudience: 0,
      femaleAudience: 0
    },
    executiveSummary: {
      summaryWhat: '',
      summaryWhere: '',
      summaryWhen: '',
      summaryHow: '',
      summaryWhy: '',
      summaryWho: '',
      summaryDirectBeneficiaries: '',
      summaryInDirectBeneficiaries: ''
    },
    projectJustification: {
      identifiedProblem: '',
      communityNeed: '',
      relevanceToStandard: '',
      impactOnBeneficiaries: '',
      longTermBenefits: '',
      necessity: ''
    },
    deliverables: [],
    methodology: {
      moduleDesign: '',
      procurement: '',
      traineeRecruitment: '',
      openingCeremony: '',
      mediaEngagement: ''
    },
    projectTimelines: [],
    moduleOutlines: [],
    mediaPlan: {
      traditionalMediaPlan: '',
      socialMediaPlatforms: '',
      socialMediaStrategy: '',
      frequencyOfPosts: '',
      targetAudience: '',
      promotionalMaterials: '',
      brandingAcknowledgement: ''
    },
    monitoringMethods: [],
    projectPartners: [],
    budgetCategories: []

    // ... initialize other form data fields ...
  })

  const handleReset = () => {
    setActiveStep(0)
    setFormData({
      applicantDetail: { gender: '', dob: null, postalAddress: '' },
      exchangeInfo: { programName: '', hostInstitution: '', programCompletionDate: null },
      employmentStatus: { employmentStatus: '', organizationName: '', designation: '', areaOfWork: '' },
      projectDescription: {
        projectTitle: '',
        projectDuration: 0,
        courseStartDate: null,
        courseEndDate: null,
        proposedVenue: '',
        isLetterAttached: false,
        totalTrainingHours: 0,
        hoursPerWeek: 0,
        daysPerWeek: 0,
        hoursPerClass: 0,
        totalAudience: 0,
        maleAudience: 0,
        femaleAudience: 0
      },
      executiveSummary: {
        summaryWhat: '',
        summaryWhere: '',
        summaryWhen: '',
        summaryHow: '',
        summaryWhy: '',
        summaryWho: '',
        summaryDirectBeneficiaries: '',
        summaryInDirectBeneficiaries: ''
      },
      projectJustification: {
        identifiedProblem: '',
        communityNeed: '',
        relevanceToStandard: '',
        impactOnBeneficiaries: '',
        longTermBenefits: '',
        necessity: ''
      },
      deliverables: [],
      methodology: {
        moduleDesign: '',
        procurement: '',
        traineeRecruitment: '',
        openingCeremony: '',
        mediaEngagement: ''
      },
      projectTimelines: [],
      moduleOutlines: [],
      mediaPlan: {
        traditionalMediaPlan: '',
        socialMediaPlatforms: '',
        socialMediaStrategy: '',
        frequencyOfPosts: '',
        targetAudience: '',
        promotionalMaterials: '',
        brandingAcknowledgement: ''
      },
      monitoringMethods: [],
      projectPartners: [],
      budgetCategories: []

      // ... reset other form data fields ...
    })
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)

    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted')
    }
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const renderStepContent = (activeStep: number) => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  label='Gender'
                  value={formData.applicantDetail.gender}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      applicantDetail: { ...formData.applicantDetail, gender: e.target.value as string }
                    })
                  }
                >
                  <MenuItem value='male'>Male</MenuItem>
                  <MenuItem value='female'>Female</MenuItem>
                  <MenuItem value='other'>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                selected={formData.applicantDetail.dob}
                onChange={(date: Date) =>
                  setFormData({
                    ...formData,
                    applicantDetail: { ...formData.applicantDetail, dob: date }
                  })
                }
                customInput={
                  <TextField
                    fullWidth
                    label='Date of Birth'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton edge='end'>
                            <i className='ri-calendar-line' />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label='Postal Address'
                placeholder='Enter your postal address'
                value={formData.applicantDetail.postalAddress}
                onChange={e =>
                  setFormData({
                    ...formData,
                    applicantDetail: { ...formData.applicantDetail, postalAddress: e.target.value }
                  })
                }
              />
            </Grid>
          </>
        )
      case 1:
        return (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Program Name'
                value={formData.exchangeInfo.programName}
                onChange={e =>
                  setFormData({
                    ...formData,
                    exchangeInfo: { ...formData.exchangeInfo, programName: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Host Institution'
                value={formData.exchangeInfo.hostInstitution}
                onChange={e =>
                  setFormData({
                    ...formData,
                    exchangeInfo: { ...formData.exchangeInfo, hostInstitution: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                selected={formData.exchangeInfo.programCompletionDate}
                onChange={(date: Date) =>
                  setFormData({
                    ...formData,
                    exchangeInfo: { ...formData.exchangeInfo, programCompletionDate: date }
                  })
                }
                customInput={
                  <TextField
                    fullWidth
                    label='Program Completion Date'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton edge='end'>
                            <i className='ri-calendar-line' />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                }
              />
            </Grid>
          </>
        )
      case 2:
        return (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Employment Status'
                value={formData.employmentStatus.employmentStatus}
                onChange={e =>
                  setFormData({
                    ...formData,
                    employmentStatus: { ...formData.employmentStatus, employmentStatus: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Organization Name'
                value={formData.employmentStatus.organizationName}
                onChange={e =>
                  setFormData({
                    ...formData,
                    employmentStatus: { ...formData.employmentStatus, organizationName: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Designation'
                value={formData.employmentStatus.designation}
                onChange={e =>
                  setFormData({
                    ...formData,
                    employmentStatus: { ...formData.employmentStatus, designation: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Area of Work'
                value={formData.employmentStatus.areaOfWork}
                onChange={e =>
                  setFormData({
                    ...formData,
                    employmentStatus: { ...formData.employmentStatus, areaOfWork: e.target.value }
                  })
                }
              />
            </Grid>
          </>
        )
      case 3:
        return (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Project Title'
                value={formData.projectDescription.projectTitle}
                onChange={e =>
                  setFormData({
                    ...formData,
                    projectDescription: { ...formData.projectDescription, projectTitle: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='number'
                label='Project Duration (weeks)'
                value={formData.projectDescription.projectDuration}
                onChange={e =>
                  setFormData({
                    ...formData,
                    projectDescription: { ...formData.projectDescription, projectDuration: Number(e.target.value) }
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                selected={formData.projectDescription.courseStartDate}
                onChange={(date: Date) =>
                  setFormData({
                    ...formData,
                    projectDescription: { ...formData.projectDescription, courseStartDate: date }
                  })
                }
                customInput={
                  <TextField
                    fullWidth
                    label='Course Start Date'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton edge='end'>
                            <i className='ri-calendar-line' />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                selected={formData.projectDescription.courseEndDate}
                onChange={(date: Date) =>
                  setFormData({
                    ...formData,
                    projectDescription: { ...formData.projectDescription, courseEndDate: date }
                  })
                }
                customInput={
                  <TextField
                    fullWidth
                    label='Course End Date'
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton edge='end'>
                            <i className='ri-calendar-line' />
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Proposed Venue'
                value={formData.projectDescription.proposedVenue}
                onChange={e =>
                  setFormData({
                    ...formData,
                    projectDescription: { ...formData.projectDescription, proposedVenue: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Is Letter Attached</InputLabel>
                <Select
                  label='Is Letter Attached'
                  value={formData.projectDescription.isLetterAttached ? 'yes' : 'no'}
                  onChange={e =>
                    setFormData({
                      ...formData,
                      projectDescription: { ...formData.projectDescription, isLetterAttached: e.target.value === 'yes' }
                    })
                  }
                >
                  <MenuItem value='yes'>Yes</MenuItem>
                  <MenuItem value='no'>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='number'
                label='Total Training Hours'
                value={formData.projectDescription.totalTrainingHours}
                onChange={e =>
                  setFormData({
                    ...formData,
                    projectDescription: { ...formData.projectDescription, totalTrainingHours: Number(e.target.value) }
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='number'
                label='Hours Per Week'
                value={formData.projectDescription.hoursPerWeek}
                onChange={e =>
                  setFormData({
                    ...formData,
                    projectDescription: { ...formData.projectDescription, hoursPerWeek: Number(e.target.value) }
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='number'
                label='Days Per Week'
                value={formData.projectDescription.daysPerWeek}
                onChange={e =>
                  setFormData({
                    ...formData,
                    projectDescription: { ...formData.projectDescription, daysPerWeek: Number(e.target.value) }
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='number'
                label='Hours Per Class'
                value={formData.projectDescription.hoursPerClass}
                onChange={e =>
                  setFormData({
                    ...formData,
                    projectDescription: { ...formData.projectDescription, hoursPerClass: Number(e.target.value) }
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type='number'
                label='Total Audience'
                value={formData.projectDescription.totalAudience}
                onChange={e =>
                  setFormData({
                    ...formData,
                    projectDescription: { ...formData.projectDescription, totalAudience: Number(e.target.value) }
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type='number'
                label='Male Audience'
                value={formData.projectDescription.maleAudience}
                onChange={e =>
                  setFormData({
                    ...formData,
                    projectDescription: { ...formData.projectDescription, maleAudience: Number(e.target.value) }
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type='number'
                label='Female Audience'
                value={formData.projectDescription.femaleAudience}
                onChange={e =>
                  setFormData({
                    ...formData,
                    projectDescription: { ...formData.projectDescription, femaleAudience: Number(e.target.value) }
                  })
                }
              />
            </Grid>
          </>
        )
      case 4:
        return (
          <>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label='What'
                placeholder='Summarize what the project is about'
                value={formData.executiveSummary.summaryWhat}
                onChange={e =>
                  setFormData({
                    ...formData,
                    executiveSummary: { ...formData.executiveSummary, summaryWhat: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label='Where'
                placeholder='Describe where the project will take place'
                value={formData.executiveSummary.summaryWhere}
                onChange={e =>
                  setFormData({
                    ...formData,
                    executiveSummary: { ...formData.executiveSummary, summaryWhere: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label='When'
                placeholder='Specify when the project will occur'
                value={formData.executiveSummary.summaryWhen}
                onChange={e =>
                  setFormData({
                    ...formData,
                    executiveSummary: { ...formData.executiveSummary, summaryWhen: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label='How'
                placeholder='Explain how the project will be implemented'
                value={formData.executiveSummary.summaryHow}
                onChange={e =>
                  setFormData({
                    ...formData,
                    executiveSummary: { ...formData.executiveSummary, summaryHow: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label='Why'
                placeholder='Justify why this project is important'
                value={formData.executiveSummary.summaryWhy}
                onChange={e =>
                  setFormData({
                    ...formData,
                    executiveSummary: { ...formData.executiveSummary, summaryWhy: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label='Who'
                placeholder='Describe who will be involved in the project'
                value={formData.executiveSummary.summaryWho}
                onChange={e =>
                  setFormData({
                    ...formData,
                    executiveSummary: { ...formData.executiveSummary, summaryWho: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label='Direct Beneficiaries'
                placeholder='List the direct beneficiaries of the project'
                value={formData.executiveSummary.summaryDirectBeneficiaries}
                onChange={e =>
                  setFormData({
                    ...formData,
                    executiveSummary: { ...formData.executiveSummary, summaryDirectBeneficiaries: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label='Indirect Beneficiaries'
                placeholder='List the indirect beneficiaries of the project'
                value={formData.executiveSummary.summaryInDirectBeneficiaries}
                onChange={e =>
                  setFormData({
                    ...formData,
                    executiveSummary: { ...formData.executiveSummary, summaryInDirectBeneficiaries: e.target.value }
                  })
                }
              />
            </Grid>
          </>
        )
      case 5:
        return (
          <>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label='Identified Problem'
                placeholder='Describe the problem your project addresses'
                value={formData.projectJustification.identifiedProblem}
                onChange={e =>
                  setFormData({
                    ...formData,
                    projectJustification: { ...formData.projectJustification, identifiedProblem: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label='Community Need'
                placeholder='Explain the community need for this project'
                value={formData.projectJustification.communityNeed}
                onChange={e =>
                  setFormData({
                    ...formData,
                    projectJustification: { ...formData.projectJustification, communityNeed: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label='Relevance to Standard'
                placeholder='Describe how the project is relevant to standards or guidelines'
                value={formData.projectJustification.relevanceToStandard}
                onChange={e =>
                  setFormData({
                    ...formData,
                    projectJustification: { ...formData.projectJustification, relevanceToStandard: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label='Impact on Beneficiaries'
                placeholder='Explain the expected impact on beneficiaries'
                value={formData.projectJustification.impactOnBeneficiaries}
                onChange={e =>
                  setFormData({
                    ...formData,
                    projectJustification: { ...formData.projectJustification, impactOnBeneficiaries: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label='Long Term Benefits'
                placeholder='Describe the long-term benefits of the project'
                value={formData.projectJustification.longTermBenefits}
                onChange={e =>
                  setFormData({
                    ...formData,
                    projectJustification: { ...formData.projectJustification, longTermBenefits: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label='Necessity'
                placeholder='Explain why this project is necessary'
                value={formData.projectJustification.necessity}
                onChange={e =>
                  setFormData({
                    ...formData,
                    projectJustification: { ...formData.projectJustification, necessity: e.target.value }
                  })
                }
              />
            </Grid>
          </>
        )
      case 6:
        return (
          <>
            <Grid item xs={12}>
              <Typography variant='h6' gutterBottom>
                Project Deliverables
              </Typography>
            </Grid>
            {formData.deliverables.map((deliverable, index) => (
              <Grid item xs={12} key={index} container spacing={2} alignItems='center'>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    label={`Deliverable ${index + 1}`}
                    value={deliverable}
                    onChange={e => {
                      const newDeliverables = [...formData.deliverables]

                      newDeliverables[index] = e.target.value
                      setFormData({ ...formData, deliverables: newDeliverables })
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    onClick={() => {
                      const newDeliverables = formData.deliverables.filter((_, i) => i !== index)

                      setFormData({ ...formData, deliverables: newDeliverables })
                    }}
                  >
                    <i className='ri-delete-bin-line' />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant='outlined'
                startIcon={<i className='ri-add-line' />}
                onClick={() => {
                  setFormData({
                    ...formData,
                    deliverables: [...formData.deliverables, '']
                  })
                }}
              >
                Add Deliverable
              </Button>
            </Grid>
          </>
        )
      case 7:
        return (
          <>
            <Grid item xs={12}>
              <Typography variant='h6' gutterBottom>
                Project Methodology
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label='Module Design'
                placeholder='Describe the design of your project modules'
                value={formData.methodology.moduleDesign}
                onChange={e =>
                  setFormData({
                    ...formData,
                    methodology: { ...formData.methodology, moduleDesign: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label='Procurement'
                placeholder='Explain your procurement process'
                value={formData.methodology.procurement}
                onChange={e =>
                  setFormData({
                    ...formData,
                    methodology: { ...formData.methodology, procurement: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label='Trainee Recruitment'
                placeholder='Describe how you will recruit trainees'
                value={formData.methodology.traineeRecruitment}
                onChange={e =>
                  setFormData({
                    ...formData,
                    methodology: { ...formData.methodology, traineeRecruitment: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label='Opening Ceremony'
                placeholder='Describe the opening ceremony plans'
                value={formData.methodology.openingCeremony}
                onChange={e =>
                  setFormData({
                    ...formData,
                    methodology: { ...formData.methodology, openingCeremony: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label='Media Engagement'
                placeholder='Explain your media engagement strategy'
                value={formData.methodology.mediaEngagement}
                onChange={e =>
                  setFormData({
                    ...formData,
                    methodology: { ...formData.methodology, mediaEngagement: e.target.value }
                  })
                }
              />
            </Grid>
          </>
        )
      case 8:
        return (
          <>
            <Grid item xs={12}>
              <Typography variant='h6' gutterBottom>
                Project Timelines
              </Typography>
            </Grid>
            {formData.projectTimelines.map((timeline, index) => (
              <Grid item xs={12} key={index} container spacing={2} alignItems='center'>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    label={`Timeline ${index + 1} Title`}
                    value={timeline.title}
                    onChange={e => {
                      const newTimelines = [...formData.projectTimelines]

                      newTimelines[index] = { ...newTimelines[index], title: e.target.value }
                      setFormData({ ...formData, projectTimelines: newTimelines })
                    }}
                  />
                </Grid>
                <Grid item xs={5}>
                  <DatePicker
                    selected={timeline.date}
                    onChange={(date: Date) => {
                      const newTimelines = [...formData.projectTimelines]

                      newTimelines[index] = { ...newTimelines[index], date }
                      setFormData({ ...formData, projectTimelines: newTimelines })
                    }}
                    customInput={
                      <TextField
                        fullWidth
                        label={`Timeline ${index + 1} Date`}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton edge='end'>
                                <i className='ri-calendar-line' />
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                      />
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    onClick={() => {
                      const newTimelines = formData.projectTimelines.filter((_, i) => i !== index)

                      setFormData({ ...formData, projectTimelines: newTimelines })
                    }}
                  >
                    <i className='ri-delete-bin-line' />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant='outlined'
                startIcon={<i className='ri-add-line' />}
                onClick={() => {
                  setFormData({
                    ...formData,
                    projectTimelines: [...formData.projectTimelines, { title: '', date: null }]
                  })
                }}
              >
                Add Timeline
              </Button>
            </Grid>
          </>
        )
      case 9: // Adjust this number based on your total steps
        return (
          <>
            <Grid item xs={12}>
              <Typography variant='h6' gutterBottom>
                Module Outlines
              </Typography>
            </Grid>
            {formData.moduleOutlines.map((module, index) => (
              <Grid item xs={12} key={index} container spacing={2} alignItems='center'>
                <Grid item xs={2}>
                  <TextField
                    fullWidth
                    type='number'
                    label='Week Number'
                    value={module.weekNumber}
                    onChange={e => {
                      const newModules = [...formData.moduleOutlines]

                      newModules[index] = { ...newModules[index], weekNumber: Number(e.target.value) }
                      setFormData({ ...formData, moduleOutlines: newModules })
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label='Topics'
                    value={module.topics}
                    onChange={e => {
                      const newModules = [...formData.moduleOutlines]

                      newModules[index] = { ...newModules[index], topics: e.target.value }
                      setFormData({ ...formData, moduleOutlines: newModules })
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label='Guest Speakers'
                    value={module.guestSpeakers}
                    onChange={e => {
                      const newModules = [...formData.moduleOutlines]

                      newModules[index] = { ...newModules[index], guestSpeakers: e.target.value }
                      setFormData({ ...formData, moduleOutlines: newModules })
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    onClick={() => {
                      const newModules = formData.moduleOutlines.filter((_, i) => i !== index)

                      setFormData({ ...formData, moduleOutlines: newModules })
                    }}
                  >
                    <i className='ri-delete-bin-line' />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant='outlined'
                startIcon={<i className='ri-add-line' />}
                onClick={() => {
                  setFormData({
                    ...formData,
                    moduleOutlines: [
                      ...formData.moduleOutlines,
                      { weekNumber: formData.moduleOutlines.length + 1, topics: '', guestSpeakers: '' }
                    ]
                  })
                }}
              >
                Add Module
              </Button>
            </Grid>
          </>
        )
      case 10: // Adjust this number based on your total steps
        return (
          <>
            <Grid item xs={12}>
              <Typography variant='h6' gutterBottom>
                Media Plan
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label='Traditional Media Plan'
                placeholder='Describe your traditional media plan'
                value={formData.mediaPlan.traditionalMediaPlan}
                onChange={e =>
                  setFormData({
                    ...formData,
                    mediaPlan: { ...formData.mediaPlan, traditionalMediaPlan: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label='Social Media Platforms'
                placeholder='List the social media platforms you plan to use'
                value={formData.mediaPlan.socialMediaPlatforms}
                onChange={e =>
                  setFormData({
                    ...formData,
                    mediaPlan: { ...formData.mediaPlan, socialMediaPlatforms: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label='Social Media Strategy'
                placeholder='Outline your social media strategy'
                value={formData.mediaPlan.socialMediaStrategy}
                onChange={e =>
                  setFormData({
                    ...formData,
                    mediaPlan: { ...formData.mediaPlan, socialMediaStrategy: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Frequency of Posts'
                placeholder='How often will you post on social media?'
                value={formData.mediaPlan.frequencyOfPosts}
                onChange={e =>
                  setFormData({
                    ...formData,
                    mediaPlan: { ...formData.mediaPlan, frequencyOfPosts: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label='Target Audience'
                placeholder='Describe your target audience'
                value={formData.mediaPlan.targetAudience}
                onChange={e =>
                  setFormData({
                    ...formData,
                    mediaPlan: { ...formData.mediaPlan, targetAudience: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label='Promotional Materials'
                placeholder='Describe any promotional materials you plan to use'
                value={formData.mediaPlan.promotionalMaterials}
                onChange={e =>
                  setFormData({
                    ...formData,
                    mediaPlan: { ...formData.mediaPlan, promotionalMaterials: e.target.value }
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label='Branding Acknowledgement'
                placeholder='How will you acknowledge branding in your media plan?'
                value={formData.mediaPlan.brandingAcknowledgement}
                onChange={e =>
                  setFormData({
                    ...formData,
                    mediaPlan: { ...formData.mediaPlan, brandingAcknowledgement: e.target.value }
                  })
                }
              />
            </Grid>
          </>
        )
      case 11: // Adjust this number based on your total steps
        return (
          <>
            <Grid item xs={12}>
              <Typography variant='h6' gutterBottom>
                Monitoring Methods
              </Typography>
            </Grid>
            {formData.monitoringMethods.map((method, index) => (
              <Grid item xs={12} key={index} container spacing={2} alignItems='center'>
                <Grid item xs={10}>
                  <TextField
                    fullWidth
                    label={`Monitoring Method ${index + 1}`}
                    value={method}
                    onChange={e => {
                      const newMethods = [...formData.monitoringMethods]

                      newMethods[index] = e.target.value
                      setFormData({ ...formData, monitoringMethods: newMethods })
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    onClick={() => {
                      const newMethods = formData.monitoringMethods.filter((_, i) => i !== index)

                      setFormData({ ...formData, monitoringMethods: newMethods })
                    }}
                  >
                    <i className='ri-delete-bin-line' />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant='outlined'
                startIcon={<i className='ri-add-line' />}
                onClick={() => {
                  setFormData({
                    ...formData,
                    monitoringMethods: [...formData.monitoringMethods, '']
                  })
                }}
              >
                Add Monitoring Method
              </Button>
            </Grid>
          </>
        )
      case 12: // Adjust this number based on your total steps
        return (
          <>
            <Grid item xs={12}>
              <Typography variant='h6' gutterBottom>
                Project Partners
              </Typography>
            </Grid>
            {formData.projectPartners.map((partner, index) => (
              <Grid item xs={12} key={index} container spacing={2} alignItems='center'>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    label='Partner Name'
                    value={partner.name}
                    onChange={e => {
                      const newPartners = [...formData.projectPartners]

                      newPartners[index] = { ...newPartners[index], name: e.target.value }
                      setFormData({ ...formData, projectPartners: newPartners })
                    }}
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    fullWidth
                    label='Partner Role'
                    value={partner.role}
                    onChange={e => {
                      const newPartners = [...formData.projectPartners]

                      newPartners[index] = { ...newPartners[index], role: e.target.value }
                      setFormData({ ...formData, projectPartners: newPartners })
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <IconButton
                    onClick={() => {
                      const newPartners = formData.projectPartners.filter((_, i) => i !== index)

                      setFormData({ ...formData, projectPartners: newPartners })
                    }}
                  >
                    <i className='ri-delete-bin-line' />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant='outlined'
                startIcon={<i className='ri-add-line' />}
                onClick={() => {
                  setFormData({
                    ...formData,
                    projectPartners: [...formData.projectPartners, { name: '', role: '' }]
                  })
                }}
              >
                Add Project Partner
              </Button>
            </Grid>
          </>
        )
      case 13:
        return (
          <>
            <Grid item xs={12}>
              <Typography variant='h6' gutterBottom>
                Budget Categories
              </Typography>
            </Grid>
            {formData.budgetCategories.map((category, categoryIndex) => (
              <Grid item xs={12} key={categoryIndex} container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='Category Title'
                    value={category.title}
                    onChange={e => {
                      const newCategories = [...formData.budgetCategories]

                      newCategories[categoryIndex] = { ...newCategories[categoryIndex], title: e.target.value }
                      setFormData({ ...formData, budgetCategories: newCategories })
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label='Unit of Measure'
                    value={category.unitOfMeasure}
                    onChange={e => {
                      const newCategories = [...formData.budgetCategories]

                      newCategories[categoryIndex] = { ...newCategories[categoryIndex], unitOfMeasure: e.target.value }
                      setFormData({ ...formData, budgetCategories: newCategories })
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label='Cost Per Unit'
                    value={category.costPerUnit}
                    onChange={e => {
                      const newCategories = [...formData.budgetCategories]

                      newCategories[categoryIndex] = { ...newCategories[categoryIndex], costPerUnit: e.target.value }
                      setFormData({ ...formData, budgetCategories: newCategories })
                    }}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    type='number'
                    label='Number of Units'
                    value={category.numberOfUnits}
                    onChange={e => {
                      const newCategories = [...formData.budgetCategories]

                      newCategories[categoryIndex] = {
                        ...newCategories[categoryIndex],
                        numberOfUnits: Number(e.target.value)
                      }
                      setFormData({ ...formData, budgetCategories: newCategories })
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label='Narrative'
                    value={category.narrative}
                    onChange={e => {
                      const newCategories = [...formData.budgetCategories]

                      newCategories[categoryIndex] = { ...newCategories[categoryIndex], narrative: e.target.value }
                      setFormData({ ...formData, budgetCategories: newCategories })
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='subtitle1'>Breakdowns</Typography>
                  {category.breakdowns.map((breakdown, breakdownIndex) => (
                    <Grid container spacing={2} key={breakdownIndex}>
                      <Grid item xs={3}>
                        <TextField
                          fullWidth
                          label='Description'
                          value={breakdown.description}
                          onChange={e => {
                            const newCategories = [...formData.budgetCategories]

                            newCategories[categoryIndex].breakdowns[breakdownIndex].description = e.target.value
                            setFormData({ ...formData, budgetCategories: newCategories })
                          }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          fullWidth
                          label='Rate'
                          value={breakdown.rate}
                          onChange={e => {
                            const newCategories = [...formData.budgetCategories]

                            newCategories[categoryIndex].breakdowns[breakdownIndex].rate = e.target.value
                            setFormData({ ...formData, budgetCategories: newCategories })
                          }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          fullWidth
                          label='Actual Amount'
                          value={breakdown.actualAmount}
                          onChange={e => {
                            const newCategories = [...formData.budgetCategories]

                            newCategories[categoryIndex].breakdowns[breakdownIndex].actualAmount = e.target.value
                            setFormData({ ...formData, budgetCategories: newCategories })
                          }}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          fullWidth
                          type='number'
                          label='Number of Units'
                          value={breakdown.numberOfUnits}
                          onChange={e => {
                            const newCategories = [...formData.budgetCategories]

                            newCategories[categoryIndex].breakdowns[breakdownIndex].numberOfUnits = Number(
                              e.target.value
                            )
                            setFormData({ ...formData, budgetCategories: newCategories })
                          }}
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton
                          onClick={() => {
                            const newCategories = [...formData.budgetCategories]

                            newCategories[categoryIndex].breakdowns = newCategories[categoryIndex].breakdowns.filter(
                              (_, i) => i !== breakdownIndex
                            )
                            setFormData({ ...formData, budgetCategories: newCategories })
                          }}
                        >
                          <i className='ri-delete-bin-line' />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                  <Button
                    variant='outlined'
                    startIcon={<i className='ri-add-line' />}
                    onClick={() => {
                      const newCategories = [...formData.budgetCategories]

                      newCategories[categoryIndex].breakdowns.push({
                        description: '',
                        rate: '',
                        actualAmount: '',
                        numberOfUnits: 0
                      })
                      setFormData({ ...formData, budgetCategories: newCategories })
                    }}
                  >
                    Add Breakdown
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <IconButton
                    onClick={() => {
                      const newCategories = formData.budgetCategories.filter((_, i) => i !== categoryIndex)

                      setFormData({ ...formData, budgetCategories: newCategories })
                    }}
                  >
                    <i className='ri-delete-bin-line' /> Remove Category
                  </IconButton>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant='outlined'
                startIcon={<i className='ri-add-line' />}
                onClick={() => {
                  setFormData({
                    ...formData,
                    budgetCategories: [
                      ...formData.budgetCategories,
                      {
                        title: '',
                        unitOfMeasure: '',
                        costPerUnit: '',
                        numberOfUnits: 0,
                        narrative: '',
                        breakdowns: []
                      }
                    ]
                  })
                }}
              >
                Add Budget Category
              </Button>
            </Grid>
          </>
        )

      // ... other cases ...
      default:
        return 'Unknown step'
    }
  }

  return (
    <>
      <StepperWrapper>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => {
            return (
              <Step key={label.title}>
                <StepLabel StepIconComponent={StepperCustomDot}>
                  <div className='step-label'>
                    <div>
                      <Typography className='step-title' color='text.primary'>
                        {label.title}
                      </Typography>
                      {/* <Typography className='step-subtitle' color='text.primary'>
                        {label.subtitle}
                      </Typography> */}
                    </div>
                  </div>
                </StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </StepperWrapper>
      <Card className='mt-4'>
        <CardContent>
          {activeStep === steps.length ? (
            <>
              <Typography className='mlb-2 mli-1' color='text.primary'>
                All steps are completed!
              </Typography>
              <div className='flex justify-end mt-4'>
                <Button variant='contained' onClick={handleReset}>
                  Reset
                </Button>
              </div>
            </>
          ) : (
            <>
              <form onSubmit={e => e.preventDefault()}>
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <Typography className='font-medium' color='text.primary'>
                      {steps[activeStep].title}
                    </Typography>
                    <Typography variant='body2'>{steps[activeStep].subtitle}</Typography>
                  </Grid>
                  {renderStepContent(activeStep)}
                  <Grid item xs={12} className='flex justify-between'>
                    <Button
                      variant='outlined'
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      color='secondary'
                      startIcon={
                        <DirectionalIcon ltrIconClass='ri-arrow-left-line' rtlIconClass='ri-arrow-right-line' />
                      }
                    >
                      Back
                    </Button>
                    <Button
                      variant='contained'
                      onClick={handleNext}
                      endIcon={
                        activeStep === steps.length - 1 ? (
                          <i className='ri-check-line' />
                        ) : (
                          <DirectionalIcon ltrIconClass='ri-arrow-right-line' rtlIconClass='ri-arrow-left-line' />
                        )
                      }
                    >
                      {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default StepperAlternativeLabel
