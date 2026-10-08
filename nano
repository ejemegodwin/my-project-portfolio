import { useInView } from '../hooks/useInView'

const learningGroups = [
  {
    title: 'Strong with',
    items: [
      'Python',
      'FastAPI',
      'PostgreSQL',
      'SQLAlchemy',
      'Git',
    ],
  },
  {
    title: 'Currently learning',
    items: [
      'Data Analysis',
      'Advanced SQL',
      'Backend Architecture',
      'Testing',
    ],
  },
  {
    title: 'Exploring next',
    items: [
      'Pandas',
      'NumPy',
      'Data Visualization',
      'Cloud Deployment',
    ],
  },
]

export default function LearningWall() {
  const [ref, inView] = useInView({ threshold: 0.1 })

  return (
    <section className="learning-wall section" ref={ref}>
      <div
        className={`section__inner reveal ${
          inView ? 'in-view' : ''
        }`}
      >
        <p className="section__label">
          Learning & technology
        </p>

        <div className="learning-wall__header">
          <h2 className="section__title">
            Still learning. Still building.
          </h2>

          <p className="learning-wall__intro">
            My technology stack is not fixed. These are the
            tools and areas I am working with, improving, or
            planning to explore next.
          </p>
        </div>

        <div className="learning-wall__grid">
          {learningGroups.map((group) => (
            <article
              className="learning-wall__group"
              key={group.title}
            >
              <h3>{group.title}</h3>

              <div className="learning-wall__items">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
