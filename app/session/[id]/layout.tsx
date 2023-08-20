const Layout = ({
  children,
  storySection,
  sessionDetails,
}: {
  children: React.ReactNode;
  sessionDetails: React.ReactNode;
  storySection: React.ReactNode;
}) => (
  <>
    {children}
    <div className="pt-5 ps-5 md:pt-10 md:ps-10">
      <div className="w-full md:w-3/4">
        {sessionDetails}
        {storySection}
      </div>
    </div>
  </>
);

export default Layout;
