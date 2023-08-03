const Layout = ({
  children,
  previousSessions,
  newSessionForm,
}: {
  children: React.ReactNode;
  previousSessions: React.ReactNode;
  newSessionForm: React.ReactNode;
}) => (
  <>
    {children}
    <div className="flex flex-col md:flex-row justify-between">
      {previousSessions}
      {newSessionForm}
    </div>
  </>
);

export default Layout;
