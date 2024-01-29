import Navibar from "@/components/navbar";

const WorksLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Navibar color="violet" />
      {children}
    </>
  );
};

export default WorksLayout;
