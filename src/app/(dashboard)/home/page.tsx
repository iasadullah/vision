import Image from 'next/image'

import img from '../../../../public/images/logo/VBF- Logo.png'

export default function Page() {
  return (
    <div
      style={{
        padding: '20px',
        textAlign: 'center'
      }}
    >
      <div style={{ marginBottom: '20px' }}>
        <Image src={img} width={150} alt='VBF Logo' />
      </div>

      <div
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          margin: '10px 0'
        }}
      >
        Overview of the Organization:
      </div>

      <p
        style={{
          fontSize: '16px',
          margin: '10px 0',
          textAlign: 'left'
        }}
      >
        Established in 2016, Vision Building Future (VBF) stands as a registered non-profit organization formed by a
        group of young social workers to address and fill the existing gaps in the education system, lack of
        professional development opportunities, and gender discrimination. VBF initially started its journey with
        micro-level community projects to raise awareness and increase youth participation through volunteer activities
        in the sphere of education, culture, and life skills. Later to expand its scope of work, VBF increased its focus
        on non-formal education, pedagogical skills, professional development, and gender empowerment to facilitate
        transformational change among vulnerable communities and contribute towards the provision of basic human rights.
        VBF, with its mandate to build an equitable society with access to education and enhancement opportunities, has
        evolved since its inception into a goal-oriented organization with an emphasis on research, communication
        development, advocacy, community outreach, and capacity-building programs to empower women, youth, and
        professionals.
      </p>
    </div>
  )
}
