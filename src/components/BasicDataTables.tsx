'use client'

import React from 'react'
// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import styles from '@core/styles/table.module.css'

type Props = {
  userListData: any
}

const BasicDataTables = (props: Props) => {
  return (
    <>
      <Card>
        <CardHeader title='Applicant Detail' />
        <div className='overflow-x-auto'>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Field</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th style={{ textAlign: 'left' }}>Gender</th>
                <td>Hamza</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Postal Address</th>
                <td>23</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>DOB</th>
                <td>23 feb</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
      <Card style={{ marginTop: '20px' }}>
        <CardHeader title='Exchange Info' />
        <div className='overflow-x-auto'>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Field</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th style={{ textAlign: 'left' }}>Program Name</th>
                <td>{props.userListData?.exchangeInfo?.programName}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Host Institution</th>
                <td>{props.userListData?.exchangeInfo?.hostInstitution}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Program Completion Date</th>
                <td>{props.userListData?.exchangeInfo?.programCompletionDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
      <Card style={{ marginTop: '20px' }}>
        <CardHeader title='Employment Status' />
        <div className='overflow-x-auto'>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Field</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th style={{ textAlign: 'left' }}>Employment Status</th>
                <td>{props.userListData?.employmentStatus.employmentStatus}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Organization Name</th>
                <td>{props.userListData?.employmentStatus.organizationName}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Designation</th>
                <td>{props.userListData?.employmentStatus.designation}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Area of Work</th>
                <td>{props.userListData?.employmentStatus.areaOfWork}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
      <Card style={{ marginTop: '20px' }}>
        <CardHeader title='Project Description' />
        <div className='overflow-x-auto'>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Field</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th style={{ textAlign: 'left' }}>Project Title</th>
                <td>{props.userListData?.projectDescription.projectTitle}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Project Duration (weeks)</th>
                <td>{props.userListData?.projectDescription.projectDuration}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Course Start Date</th>
                <td>{props.userListData?.projectDescription.courseStartDate}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Course End Date</th>
                <td>{props.userListData?.projectDescription.courseEndDate}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Proposed Venue</th>
                <td>{props.userListData?.projectDescription.proposedVenue}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Letter Attached</th>
                <td>{props.userListData?.projectDescription.isLetterAttached ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Total Training Hours</th>
                <td>{props.userListData?.projectDescription.totalTrainingHours}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Hours Per Week</th>
                <td>{props.userListData?.projectDescription.hoursPerWeek}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Days Per Week</th>
                <td>{props.userListData?.projectDescription.daysPerWeek}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Hours Per Class</th>
                <td>{props.userListData?.projectDescription.hoursPerClass}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Total Audience</th>
                <td>{props.userListData?.projectDescription.totalAudience}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Male Audience</th>
                <td>{props.userListData?.projectDescription.maleAudience}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Female Audience</th>
                <td>{props.userListData?.projectDescription.femaleAudience}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
      <Card style={{ marginTop: '20px' }}>
        <CardHeader title='Executive Summary' />
        <div className='overflow-x-auto'>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Field</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th style={{ textAlign: 'left' }}>What</th>
                <td>{props.userListData?.executiveSummary.summaryWhat}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Where</th>
                <td>{props.userListData?.executiveSummary.summaryWhere}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>When</th>
                <td>{props.userListData?.executiveSummary.summaryWhen}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>How</th>
                <td>{props.userListData?.executiveSummary.summaryHow}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Why</th>
                <td>{props.userListData?.executiveSummary.summaryWhy}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Who</th>
                <td>{props.userListData?.executiveSummary.summaryWho}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Direct Beneficiaries</th>
                <td>{props.userListData?.executiveSummary.summaryDirectBeneficiaries}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Indirect Beneficiaries</th>
                <td>{props.userListData?.executiveSummary.summaryInDirectBeneficiaries}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
      <Card style={{ marginTop: '20px' }}>
        <CardHeader title='Project Justification' />
        <div className='overflow-x-auto'>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Field</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th style={{ textAlign: 'left' }}>Identified Problem</th>
                <td>{props.userListData?.projectJustification.identifiedProblem}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Community Need</th>
                <td>{props.userListData?.projectJustification.communityNeed}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Relevance to Standard</th>
                <td>{props.userListData?.projectJustification.relevanceToStandard}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Impact on Beneficiaries</th>
                <td>{props.userListData?.projectJustification.impactOnBeneficiaries}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Long-Term Benefits</th>
                <td>{props.userListData?.projectJustification.longTermBenefits}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Necessity</th>
                <td>{props.userListData?.projectJustification.necessity}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
      <Card style={{ marginTop: '20px' }}>
        <CardHeader title='Deliverables' />
        <div className='overflow-x-auto'>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>No.</th>
                <th>Deliverable</th>
              </tr>
            </thead>
            <tbody>
              {props.userListData?.deliverables.map((item: any, index: number) => (
                <tr key={index}>
                  <td style={{ textAlign: 'left' }}>{index + 1}</td>
                  <td style={{ textAlign: 'left' }}>{item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card style={{ marginTop: '20px' }}>
        <CardHeader title='Methodology' />
        <div className='overflow-x-auto'>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Execution Steps</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th style={{ textAlign: 'left' }}>Module Design</th>
                <td>{props.userListData?.methodology.moduleDesign}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Procurement</th>
                <td>{props.userListData?.methodology.procurement}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Trainee Recruitment</th>
                <td>{props.userListData?.methodology.traineeRecruitment}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Opening Ceremony</th>
                <td>{props.userListData?.methodology.openingCeremony}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Media Engagement</th>
                <td>{props.userListData?.methodology.mediaEngagement}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
      <Card style={{ marginTop: '20px' }}>
        <CardHeader title='Project Timelines' />
        <div className='overflow-x-auto'>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Activity</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {props.userListData?.projectTimelines.map((timeline: any, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td style={{ textAlign: 'left' }}>{timeline.title}</td>
                  <td>{timeline.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card style={{ marginTop: '20px' }}>
        <CardHeader title='Module Outlines' />
        <div className='overflow-x-auto'>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Week</th>
                <th>Topics</th>
                <th>Guest Speakers</th>
              </tr>
            </thead>
            <tbody>
              {props.userListData?.moduleOutlines.map((outline: any, index: number) => (
                <tr key={index}>
                  <td style={{ textAlign: 'left' }}>Week {outline.weekNumber}</td>
                  <td style={{ textAlign: 'left' }}>{outline.topics ? outline.topics : 'No topics available'}</td>
                  <td style={{ textAlign: 'left' }}>
                    {outline.guestSpeakers ? outline.guestSpeakers : 'No guest speakers'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card style={{ marginTop: '20px' }}>
        <CardHeader title='Media Plan' />
        <div className='overflow-x-auto'>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Field</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th style={{ textAlign: 'left' }}>Traditional Media Plan</th>
                <td>{props.userListData?.mediaPlan.traditionalMediaPlan}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Social Media Platforms</th>
                <td>{props.userListData?.mediaPlan.socialMediaPlatforms}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Social Media Strategy</th>
                <td>{props.userListData?.mediaPlan.socialMediaStrategy}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Frequency of Posts</th>
                <td>{props.userListData?.mediaPlan.frequencyOfPosts}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Target Audience</th>
                <td>{props.userListData?.mediaPlan.targetAudience}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Promotional Materials</th>
                <td>{props.userListData?.mediaPlan.promotionalMaterials}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left' }}>Branding Acknowledgement</th>
                <td>{props.userListData?.mediaPlan.brandingAcknowledgement}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
      <Card style={{ marginTop: '20px' }}>
        <CardHeader title='Monitoring Methods' />
        <div className='overflow-x-auto'>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>No.</th>
                <th>Monitoring Method</th>
              </tr>
            </thead>
            <tbody>
              {props.userListData?.monitoringMethods.map((method: any, index: number) => (
                <tr key={index}>
                  <td style={{ textAlign: 'left' }}>{index + 1}</td>
                  <td style={{ textAlign: 'left' }}>{method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card style={{ marginTop: '20px' }}>
        <CardHeader title='Project Partners' />
        <div className='overflow-x-auto'>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Sr.</th>
                <th>Partner Name</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {props.userListData?.projectPartners.map((partner: any, index: number) => (
                <tr key={index}>
                  <td style={{ textAlign: 'left' }}>{index + 1}</td>
                  <td style={{ textAlign: 'left' }}>{partner.name}</td>
                  <td style={{ textAlign: 'left' }}>{partner.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <Card style={{ marginTop: '20px' }}>
        <CardHeader title='Budget Categories' />
        <div className='overflow-x-auto'>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Field</th>
                <th>Detail</th>
              </tr>
            </thead>
            <tbody>
              {props.userListData?.budgetCategories.map((category: any, index: number) => (
                <React.Fragment key={index}>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Title</th>
                    <td>{category.title}</td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Unit of Measure</th>
                    <td>{category.unitOfMeasure}</td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Cost per Unit</th>
                    <td>{category.costPerUnit}</td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Number of Units</th>
                    <td>{category.numberOfUnits}</td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Narrative</th>
                    <td>{category.narrative}</td>
                  </tr>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Breakdowns</th>
                    <td>
                      <ul>
                        {category.breakdowns.map((breakdown: any, breakdownIndex: number) => (
                          <li key={breakdownIndex}>
                            <strong>Description:</strong> {breakdown.description},<strong>Rate:</strong>{' '}
                            {breakdown.rate},<strong>Actual Amount:</strong> {breakdown.actualAmount},
                            <strong>Number of Units:</strong> {breakdown.numberOfUnits}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}

export default BasicDataTables
