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
            Managed full-stack development teams utilising JavaScript, Python,
            TypeScript, and R to deliver robust web applications.
          </li>
          <li>
            Designed and implemented frontend components for live AWS hosted
            product using React.js.
          </li>
          <li>
            Oversaw front-end development using React, Next, TypeScript,
            Tailwind CSS, and shadcn design principles.
          </li>
          <li>
            Led teams in implementing CI/CD pipelines and cloud-based solutions
            on AWS, leveraging Docker and microservices architecture.
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
            Integrated a new feature into an internal product for T-Mobile, a
            market-leading player in the telecom domain, that enabled the
            tracking and generation of consolidated reports for billed customers
            using Python and JavaScript.
          </li>
          <li>
            Worked on a visualization screen to show various aspects of
            generated data insights onto the user screen in the form of charts,
            pies, and graphs using React to provide stakeholders with a clear
            understanding of the key metrics.
          </li>
          Utilized agile methodologies to ensure that the project was completed
          on time with better decision- making while maintaining a high level of
          quality and meeting all key milestones.
          <li>
            Implemented key components in React JS for Johnson & Johnson's
            healthcare domain, utilizing react routes, custom hooks, and Axios
            to showcase real-time user health data and scientist outcomes from
            the database on the web browser.
          </li>
          <li>
            Worked on a highly eﬀective screen development for a three-step
            stepper ETL data flow, utilizing React, HTML, CSS, and JavaScript to
            create intuitive screens and demonstrated a 23% increase in
            eﬃciency.
          </li>
          <li>
            Developed an end-to-end pipeline, writing, utilizing object-oriented
            Python and R programming to apply comparison between two
            heterogeneous databases with scalable, eﬃcient, and reliable
            business logic.
          </li>
          <li>
            Designing, Developing UI screens for the rich user experience
            enterprise-level microservice web application as solutions for
            monitoring data migration of two heterogenous databases using react,
            node, python and R which gains revenue for the business and is 19%
            faster performance than traditional data migration error reporting
            tools.
          </li>
          <li>
            Worked on a user behavior screen which shows login patterns using
            visualizations along with user history runs on the platform with the
            last 5 performed operations.
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
