import Timeline from "@/components/primitives/timeline/timeline";

const Experience = () => {
  const items = [
    {
      id: 1,
      title: "Manager",
      company: "Deloitte UK",
      start: "Jul 2023",
      end: "Present",
      location: "Glasgow, UK",
      description: (
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
          <li>
            Managing full-stack development teams utilising React Js, Next Js,
            JavaScript, Python, TypeScript to deliver robust web applications.
          </li>
          <li>
            Leading front-end development using React, Next, TypeScript,
            Tailwind CSS, and Chakra UI, shadcn design principles.
          </li>
          <li>
            Led teams in implementing CI/CD pipelines and cloud-based solutions
            on AWS, leveraging Docker and microservices architecture.
          </li>
          <li>
            Designed and implemented various frontend components for live AWS
            hosted product using React.js.
          </li>
          <li>
            Designed and developed a comprehensive onboarding walkthrough for
            new users, significantly improving product adoption and initial user
            experience.
          </li>
          <li>
            Implemented diverse data visualisations on the product dashboard to
            effectively showcase analysed data, facilitating clearer insights
            and data-driven decision-making.
          </li>
        </ul>
      ),
    },
    {
      id: 2,
      title: "Software Engineer",
      company: "University of Glasgow",
      start: "Jun 2022",
      end: "Sept 2022",
      location: "Glasgow, UK",
      description: (
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
          <li>
            Developed an eﬃcient pipeline using Python that automated the
            detection and retrieval of new log files in the system for data
            analysis, significantly reducing manual eﬀort and increasing
            productivity.
          </li>
          <li>
            Utilized Material UI to design and develop a user-friendly dashboard
            that displayed a list of processed log files, making it easy for
            stakeholders to track and monitor progress.
          </li>
          <li>
            Implemented reusable components using JavaScript, React JS hooks,
            and file-saver to enable easy processing and downloading of the
            processed log files, ensuring that stakeholders had easy access to
            the data they needed.
          </li>
        </ul>
      ),
    },
    {
      id: 3,
      title: "Software Engineer",
      company: "Birlasoft",
      start: "Jul 2019",
      end: "Jul 2021",
      location: "Pune, India",
      description: (
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
          <li>
            Engineered a new feature for a T-Mobile internal product using
            Python and JavaScript, enabling automated tracking and generation of
            consolidated reports for billed customers, improving data
            accessibility and reporting efficiency.
          </li>
          <li>
            Designed and developed critical dashboard for Johnson & Johnson's
            healthcare platform to display real-time user health data and
            scientist outcomes, supporting critical research and patient care.
          </li>
          <li>
            Constructed a scalable and efficient end-to-end data pipeline using
            object-oriented Python and R, enabling robust comparison and
            analysis between heterogeneous databases to drive reliable business
            logic and insights.
          </li>
          <li>
            Designed and developed enterprise-level UI screens for a
            microservice web application using React, Node, Python, and R,
            providing a rich user experience for monitoring heterogeneous
            database migrations, contributing to revenue growth and achieving
            19% faster performance than traditional error reporting tools.
          </li>
          <li>
            Created a user behaviour analytics screen with visualisations of
            login patterns and user history (including the last 5 performed
            operations), providing critical insights into platform engagement.
          </li>
        </ul>
      ),
    },
  ];

  return (
    <section className="min-h-screen px-6 py-20 pt-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Experience
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A timeline of my professional roles and responsibilities.
        </p>

        <div className="max-w-3xl mx-auto">
          <Timeline items={items} />
        </div>
      </div>
    </section>
  );
};

export default Experience;
